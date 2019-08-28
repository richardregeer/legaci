'use strict';

class Configuration {
  constructor(fileHandler, loggingEvents) {
    this._fileHandler = fileHandler;
    this._loggingEvents = loggingEvents;
  }

  loadConfiguration(fullFileName) {
    const config = this._fileHandler.readFileSync(fullFileName);

    // TODO Add Logging

    return config;
  }

  saveConfiguration(fullFileName, configuration) {
    // TODO Add Logging
    this.fileHandler.writeFileSync(fullFileName, configuration);
  }
}

module.exports = Configuration;
