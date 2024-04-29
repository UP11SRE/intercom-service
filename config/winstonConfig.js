// winston.config.js
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
require('dotenv').config();




const logger = createLogger({
  // level: 'error', // Set desired logging level (e.g., 'error', 'warn', 'debug')
  // format: winston.format.combine(
  //   winston.format.timestamp(),
  //   winston.format.json() // For structured logs
  // ),
  transports: [
    new LokiTransport({
      host: process.env.WINSTON_HOST
    })
  ]
});

module.exports = logger;
