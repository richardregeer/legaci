'use strict';

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

    // Validate game package type

    // If not GOG then installer is not supported now and exit

    let configuration = this._configurationFactory.createConfiguration(configurationTypes.DOSBOX_CONFIGURATION);
    configuration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');

    configuration = this._configurationFactory.createConfiguration(configurationTypes.DOSBOX_RUN_CONFIGURATION);
    configuration.saveConfiguration(fullDestination);

    // TODO cleanup after install
  }
}

module.exports = GameInstaller;
