exports.homePage = async (req, res, next) => {
  res.render('home', {
    page: "home"
  })
}