'use strict';

const configurationTypes = require('../configuration/configurationTypes');
const gamePackageTypes = require('./package/gamePackageTypes');

class GameInstaller {
  constructor(
    extractor,
    configurationFactory,
    fileHandler,
    logger,
    packageTypeResolver
  ) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._extractor = extractor;
    this._configurationFactory = configurationFactory;
    this._packageTypeResolver = packageTypeResolver;
  }

  install(fullFileName, fullDestination) {
    this._logger.info(`Start installing game ${fullFileName}`);
    this._extractor.extract(fullFileName, fullDestination);

    const packageType = this._packageTypeResolver.getPackageType(fullDestination);

    // Validate game package type
    if (packageType !== gamePackageTypes.GOG_DOSBOX) {
      throw new Error('Only GOG Dosbox games are supported');
    }

    // Create or change the required configurations
    let configuration = this._configurationFactory.createConfiguration(
      configurationTypes.DOSBOX_CONFIGURATION
    );
    configuration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');

    configuration = this._configurationFactory.createConfiguration(
      configurationTypes.DOSBOX_RUN_CONFIGURATION
    );
    configuration.saveConfiguration(fullDestination);

    this._logger.info(`Finished installing game ${fullFileName} to ${fullDestination}`);
  }
}

module.exports = GameInstaller;
