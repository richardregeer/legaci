'use strict';

const chalk = require('chalk');
const gamePackageTypes = require('./package/gamePackageTypes');

class GameInstaller {
  constructor(
    extractor,
    configurationFactory,
    fileHandler,
    logger,
    packageTypeResolver,
    templateFactory,
    gameRunner
  ) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._extractor = extractor;
    this._configurationFactory = configurationFactory;
    this._packageTypeResolver = packageTypeResolver;
    this._templateFactory = templateFactory;
    this._gameRunner = gameRunner;
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
    const dosBoxconfiguration = this._configurationFactory.createDosBoxConfiguration();
    dosBoxconfiguration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');

    const dosBoxRunConfiguration = this._configurationFactory.createGOGDosBoxRunConfiguration();
    dosBoxRunConfiguration.saveConfiguration(fullDestination);

    // Create game bin file
    const binTemplate = this._templateFactory.createTemplate('./etc/bin/dosbox.bin.template.sh');
    this._gameRunner.createBinFile(fullDestination, binTemplate);

    this._logger.info(chalk.green('Finished installing game') + ` ${fullFileName} to ` + chalk.yellow(fullDestination));
    this._logger.info(chalk.yellow(`Run ${fullDestination}/legaci-run.sh`) + ' to start to game in DosBox');
  }
}

module.exports = GameInstaller;
