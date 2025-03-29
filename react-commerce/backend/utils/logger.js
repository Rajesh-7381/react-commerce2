const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Ensure log directory exists
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure winston for general logging (info, error, etc.)
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      level: 'info',
      maxsize: 10 * 1024 * 1024, 
      maxFiles: '14d',
      tailable: true,
    }),
  ],
});

// Configure Morgan to log HTTP requests into separate files (daily logs)
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
const morganMiddleware = morgan('combined', { stream: accessLogStream });

module.exports = { logger, morganMiddleware };
