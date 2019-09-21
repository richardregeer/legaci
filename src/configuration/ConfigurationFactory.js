'use strict';

const configurationTypes = require('./configurationTypes');
const DosBoxConfiguration = require('./DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('./DosBoxGOGRunConfiguration');

class ConfigurationFactory {
  constructor(fileHandler, logger, cli) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._cli = cli;
  }

  createConfiguration(type) {
    switch (type) {
      case configurationTypes.DOSBOX_CONFIGURATION:
        return new DosBoxConfiguration(this._fileHandler, this._logger);
      case configurationTypes.DOSBOX_RUN_CONFIGURATION:
        return new DosBoxGOGRunConfiguration(this._fileHandler, this._logger, this._cli);
      default:
        throw new Error(`Unable to create a configuration for type ${type}`);
    }
  }
}

module.exports = ConfigurationFactory;
