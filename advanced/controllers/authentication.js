const bcrypt = require('bcryptjs')
const env = require('../config/env')

exports.login = async (req, res, next) => {
  try {

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const password = req.body.password

    if (password === undefined) {
      req.flash('error', 'Login input does not match the criteria') //Email or password was not passed
      console.log("Incorrect password was input by: " + ip)
      return res.redirect('/authorized/login');
    }

    const isEqual = await bcrypt.compare(password, env.AUTHORIZED_PASSWORD)

    if (!isEqual) {
      req.flash('error', 'Incorrect password') //Password is incorrect
      console.log("Incorrect password was input by: " + ip)
      return res.redirect('/authorized/login');
    }

    req.session.isLoggedIn = true;
    await req.session.save()

    console.log("Authorized user logged in from: " + ip)
    res.redirect('/authorized/');
  }

  catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }

}

exports.logout = async (req, res, next) => {
  await req.session.destroy()
  res.redirect('/');
}