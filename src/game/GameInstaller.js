'use strict';

const extractorTypes = require('../extractor/extractorTypes');
const configurationTypes = require('../configuration/configurationTypes');
const gamePackageTypes = require('./package/gamePackageTypes');

class GameInstaller {
  constructor(extractorFactory, configurationFactory, fileHandler, loggingEvents, packageTypeResolver) {
    this._fileHandler = fileHandler;
    this._loggingEvents = loggingEvents;
    this._extractorFactory = extractorFactory;
    this._configurationFactory = configurationFactory;
    this._packageTypeResolver = packageTypeResolver;
  }

  install(fullFileName, fullDestination) {
    // TODO Add logging
    const extractor = this._extractorFactory.createExtractor(extractorTypes.WINE);
    extractor.extract(fullFileName, fullDestination);

    const packageType = this._packageTypeResolver.getPackageType(fullDestination);

    // Validate game package type
    if (packageType !== gamePackageTypes.GOG_DOSBOX) {
      throw new Error('Only GOG Dosbox games are supported');
    }

    // Create or change the required configurations
    let configuration = this._configurationFactory.createConfiguration(configurationTypes.DOSBOX_CONFIGURATION);
    configuration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');

    configuration = this._configurationFactory.createConfiguration(configurationTypes.DOSBOX_RUN_CONFIGURATION);
    configuration.saveConfiguration(fullDestination);
  }
}

module.exports = GameInstaller;
