exports.authorizedHomePage = async (req, res, next) => {
  let message = this.getMessages(req)
  res.render('authorized/authorized', {
    page: "authorizedHome",
    message: message.message,
    isError: message.isError,
    MY_VALUE: "My first value",
    MY_SECOND_VALUE: "My second value"
  })
}

exports.loginPage = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.redirect("/authorized/")
  }
  else {
    let message = this.getMessages(req)
    res.render('authorized/login', {
      page: "login",
      errorMessage: message.message,
    })
  }
}

exports.writeForm = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  //Blank strings should be null
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === "") {
      req.body[key] = null
    }
  })

  try {
    if (req.files && Object.keys(req.files).length !== 0) {
      if (req.files.MY_FILE !== undefined) {
        //Handle the file
        req.files.MY_FILE.mv(`${appRoot}/server/public/images/MY_FILE.png`)
      }
    }

    if (Object.keys(req.body).length > 0) {
      req.flash("success", "A value was provided!")
      console.log("value provided by: " + ip)
    }

    else {
      req.flash("error", "No value was provided")
      console.log("No value provided by: " + ip)
    }

    return res.redirect("/authorized")

  }
  catch {
    console.log("file operation failed by: " + ip)
    req.flash("error", "File operation failed.")
    return res.redirect("/authorized")
  }
}

//Utils
exports.getMessages = (req) => {
  let message = null
  let isError = null

  let success = req.flash("success")
  let error = req.flash("error")

  if (error.length > 0) {
    message = error[0]
    isError = true
  }
  else if (success.length > 0) {
    message = success[0]
    isError = false
  }

  return {
    message,
    isError
  }
}