'use strict';

const chalk = require('chalk');

class Logger {
  constructor(logger) {
    this._logger = logger;
  }

  debug(message) {
    this._logger.debug(message);
  }

  info(message) {
    this._logger.info(message);
  }

  warning(message) {
    this._logger.warn(chalk.yellow(message));
  }

  error(message) {
    this._logger.error(chalk.red(message));
  }
}

module.exports = Logger;
