"use strict"

const appRoot = require("app-root-path")

const env = {

  //Express
  EXPRESS_RATE_LIMIT_TIME: process.env.EXPRESS_RATE_LIMIT_TIME || 15 * 60 * 1000, //15 min
  EXPRESS_RATE_LIMIT_REQUESTS: process.env.EXPRESS_RATE_LIMIT_REQUESTS || 100,
  EXPRESS_PORT: process.env.PORT || 8080,

  //Logging (Winston)
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || "debug",
  LOGGING_FILE_PATH: process.env.LOGGING_FILE_PATH || `${appRoot}/server/logs/server.log`,
  LOGGING_FILE_MAX_SIZE: process.env.LOGGING_FILE_MAX_SIZE || 5242880, //5mb
  LOGGING_FILE_MAX_NUMBER: process.env.LOGGING_FILE_MAX_NUMBER || 20,

  //Sessions
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || "SUPER_SECRET_SESSION_KEY",
  SESSION_EXPIRATION_TIME: process.env.SESSION_EXPIRATION_TIME || 600000, //10 min

  //Authorized Routes
  AUTHORIZED_PASSWORD: process.env.AUTHORIZED_PASSWORD || "$2y$12$3ct7foDobIbL9bzpwuwaMOD.7zGp/lLrlPplNewlOu61K3ZsNNqZ." //password

}

module.exports = env