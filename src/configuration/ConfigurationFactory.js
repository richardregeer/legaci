'use strict';

const DosBoxConfiguration = require('./DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('./DosBoxGOGRunConfiguration');

class ConfigurationFactory {
  constructor(fileHandler, logger, cli) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._cli = cli;
  }

  createDosBoxConfiguration() {
    return new DosBoxConfiguration(this._fileHandler, this._logger);
  }

  createGOGDosBoxRunConfiguration() {
    return new DosBoxGOGRunConfiguration(this._fileHandler, this._logger, this._cli);
  }
}

module.exports = ConfigurationFactory;
