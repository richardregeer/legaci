'use strict';

const configurationTypes = require('./configurationTypes');
const DosBoxConfiguration = require('./DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('./DosBoxGOGRunConfiguration');

class ConfigurationFactory {
  constructor(fileHandler, logger) {
    this._fileHandler = fileHandler;
    this._logger = logger;
  }

  createConfiguration(type) {
    switch (type) {
      case configurationTypes.DOSBOX_CONFIGURATION:
        return new DosBoxConfiguration(this._fileHandler, this._logger);
      case configurationTypes.DOSBOX_RUN_CONFIGURATION:
        return new DosBoxGOGRunConfiguration(this._fileHandler, this._logger);
      default:
        throw new Error(`Unable to create a configuration for type ${type}`);
    }
  }
}

module.exports = ConfigurationFactory;
