module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    return res.redirect('/authorized/login');
  }
  next();
}
