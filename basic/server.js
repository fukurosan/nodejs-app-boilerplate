'use strict';

const express = require('express')
const appRoot = require('app-root-path')
const bodyParser = require('body-parser')
const env = require('./config/env')
const routes = require('./routes/routes')

const app = express()

//Init view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Init basic middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Enable static file sharing for server public folder
app.use(express.static(`${appRoot}/public`));

//Set up routes
app.use('/', routes)

//Start server
app.listen(env.EXPRESS_PORT, () => {
  console.log("Server Listening on Port: " + env.EXPRESS_PORT)
})