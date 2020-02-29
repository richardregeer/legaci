'use strict';

const chalk = require('chalk');

class GameInstaller {
  constructor(
    logger,
    installerFactory,
    packageTypeResolver
  ) {
    this._logger = logger;
    this._installerFactory = installerFactory;
    this._packageTypeResolver = packageTypeResolver;
  }

  install(fullFileName, fullDestination) {
    this._logger.info(`Start installing game ${fullFileName}`);
    const packageType = this._packageTypeResolver.getPackageType(fullDestination);

    const installer = this._installerFactory.createByPackageType(packageType);
    installer.install(fullDestination);

    this._logger.info(chalk.green('Finished installing game') + ` ${fullFileName} to ` + chalk.yellow(fullDestination));
    this._logger.info(chalk.yellow(`Run ${fullDestination}/legaci-run.sh`) + ' to start the game');
  }
}

module.exports = GameInstaller;
