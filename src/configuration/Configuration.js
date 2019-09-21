'use strict';

class Configuration {
  constructor(fileHandler, logger) {
    this._fileHandler = fileHandler;
    this._logger = logger;
  }

  loadConfiguration(fullFileName) {
    const config = this._fileHandler.readFileSync(fullFileName);
    this._logger.info(`Configuration file loaded from path ${fullFileName}`);

    return config;
  }

  saveConfiguration(fullFileName, configuration) {
    this._fileHandler.writeFileSync(fullFileName, configuration);
    this._logger.info(`Configuration file saved to path ${fullFileName}`);
  }
}

module.exports = Configuration;
