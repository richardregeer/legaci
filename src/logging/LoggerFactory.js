'use strict';

const { createLogger, transports, format } = require('winston');

const { printf } = format;

const Logger = require('./Logger');

class LoggerFactory {
  createLogger() {
    const customFormat = printf(({ message }) => {
      return `${message}`;
    });

    const winstonLogger = createLogger({
      level: 'info',
      format: customFormat,
      transports: [
        new transports.Console()
      ]
    });

    return new Logger(winstonLogger);
  }
}

module.exports = LoggerFactory;
