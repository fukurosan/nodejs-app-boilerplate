exports.homePage = async (req, res, next) => {
  res.render('home', {
    page: "home"
  })
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