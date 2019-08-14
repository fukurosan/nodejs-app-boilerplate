const express = require('express')
const router = express.Router()
const openController = require('../controllers/open')

router.get('/', openController.homePage)

module.exports = router