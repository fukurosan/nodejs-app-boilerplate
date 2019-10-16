const winston = require("winston");

//Some basic settings
const LOG_LEVEL = "debug"
const LOG_FILE = "./logs/log.log"
const MAX_FILE_SIZE_BYTES = 52428800 //5mb
const MAX_NUMBER_OF_FILES = 100

const options = {
  file: {
    level: LOG_LEVEL,
    filename: LOG_FILE,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`
      })
    ),
    maxsize: MAX_FILE_SIZE_BYTES,
    maxFiles: MAX_NUMBER_OF_FILES
  },
  console: {
    level: LOG_LEVEL,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`
      })
    )
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});

console.log = (...args) => logger.info.call(logger, ...args)
console.info = (...args) => logger.info.call(logger, ...args)
console.warn = (...args) => logger.warn.call(logger, ...args)
console.error = (...args) => logger.error.call(logger, ...args)
console.debug = (...args) => logger.debug.call(logger, ...args)

module.exports = logger