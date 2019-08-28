'use strict';

const configurationTypes = require('./configurationTypes');
const DosBoxConfiguration = require('./DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('./DosBoxGOGRunConfiguration');

class ConfigurationFactory {
  constructor(fileHandler, loggingEvents) {
    this._fileHandler = fileHandler;
    this._loggingEvents = loggingEvents;
  }

  createConfiguration(type) {
    switch (type) {
      case configurationTypes.DOSBOX_CONFIGURATION:
        return new DosBoxConfiguration(this._fileHandler, this._loggingEvents);
      case configurationTypes.DOSBOX_RUN_CONFIGURATION:
        return new DosBoxGOGRunConfiguration(this._fileHandler, this._loggingEvents);
      default:
        throw new Error(`Unable to create a configuration for type ${type}`);
    }
  }
}

module.exports = ConfigurationFactory;
