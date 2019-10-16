const express = require('express')
const router = express.Router()
const authorizedController = require('../controllers/authorized')
const isAuth = require("../middleware/isAuth")

router.get('/', isAuth, authorizedController.authorizedHomePage)
router.get('/login', authorizedController.loginPage)
router.post('/writeForm', isAuth, authorizedController.writeForm)

module.exports = router