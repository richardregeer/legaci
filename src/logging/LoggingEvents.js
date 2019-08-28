'use strict';

class LoggingEvents {
  constructor(logger) {
    this._logger = logger;
  }

  saveConfiguratonSuccesful(type, path) {
    this._logger.info(`${type} configuration file is stored in directory ${path}`);
  }

  saveConfiguratonFailed(type, path, error) {
    this._logger.info(`Unable to store ${type} configuration file in directory ${path}. Error: ${error}`);
  }

  extractFileSuccesful(type, path) {
    // TODo this._logger.info(`${type} configuration file is stored in directory ${path}`);
  }

  extractFileFailed(type, path, error) {
    // TODO this._logger.info(`Unable to store ${type} configuration file in directory ${path}. Error: ${error}`);
  }
}

module.exports = LoggingEvents;
