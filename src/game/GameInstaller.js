'use strict';

const shell = require('shelljs');
const extractorTypes = require('../extractor/extractorTypes');
const configurationTypes = require('../configuration/configurationTypes');

class GameInstaller {
  constructor(extractorFactory, configurationFactory, fileHandler, loggingEvents, packageValidator) {
    this._fileHandler = fileHandler;
    this._loggingEvents = loggingEvents;
    this._extractorFactory = extractorFactory;
    this._configurationFactory = configurationFactory;
    this._packageValidator = packageValidator;
  }

  install(fullFileName, fullDestination) {
    // TODO Add logging
    const extractor = this._extractorFactory.createExtractor(extractorTypes.WINE);
    extractor.extract(fullFileName, fullDestination);

    let configuration = this.configurationFactory.createConfiguration(configurationTypes.DOSBOX_CONFIGURATION);
    configuration.saveConfiguration(fullDestination);

    configuration = this.configurationFactory.createConfiguration(configurationTypes.DOSBOX_RUN_CONFIGURATION);
    configuration.saveConfiguration(fullDestination);
  }
}

module.exports = GameInstaller;
