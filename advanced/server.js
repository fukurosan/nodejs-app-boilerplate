"use strict";

const express = require("express")
const appRoot = require("app-root-path")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const rateLimit = require("express-rate-limit")
const session = require("express-session")
const csrf = require("csurf")
const flash = require("connect-flash")
require("./config/winston") //Winston will hook the console functions
const env = require("./config/env")
const routes = require("./routes/routes")
const authorizedRoutes = require("./routes/authorizedRoutes")
const authenticationRoutes = require("./routes/authenticationRoutes")

const app = express()

//Init view engine
app.set("view engine", "ejs")
app.set("views", "views")

//Init basic middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(
  session({
    secret: env.SESSION_SECRET_KEY,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: env.SESSION_EXPIRATION_TIME }
  })
)
app.use(flash())

//Init rate limiter
app.enable("trust proxy")
const limiter = rateLimit({
  windowsMs: env.EXPRESS_RATE_LIMIT_TIME,
  max: env.EXPRESS_RATE_LIMIT_REQUESTS
})

//Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

//Enable static file sharing for server public folder
app.use(express.static(`${appRoot}/public`));

//Set up routes
app.use("/", routes)
app.use(csrf())
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
})
app.use("/authentication", [limiter, authenticationRoutes])
app.use("/authorized", [limiter, authorizedRoutes])

//Reroute everything else to 404
app.get("*", (req, res) => {
  res.render("404")
})

//On error
app.use((error, req, res, next) => {
  console.log(error.message)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

//Start server
app.listen(env.EXPRESS_PORT, () => {
  console.log("Server Listening on Port: " + env.EXPRESS_PORT)
})