'use strict';

const packageTypes = require('../package/gamePackageTypes');
const DosBoxInstaller = require('./DosBoxInstaller');
const ScummVmInstaller = require('./ScummVmInstaller');

class InstallerFactory {
  constructor(
    configurationFactory,
    fileHandler,
    templateFactory,
    gameRunnerFactory,
    cli
  ) {
    this._configurationFactory = configurationFactory;
    this._fileHandler = fileHandler;
    this._templateFactory = templateFactory;
    this._gameRunnerFactory = gameRunnerFactory;
    this._cli = cli;
  }

  createByPackageType(packageType) {
    switch (packageType) {
      case packageTypes.GOG_DOSBOX:
        return new DosBoxInstaller(
          this._configurationFactory,
          this._fileHandler,
          this._templateFactory,
          this._gameRunnerFactory.createDosBoxGameRunner()
        );
      case packageTypes.GOG_SCUMMVM:
        return new ScummVmInstaller(
          this._configurationFactory,
          this._fileHandler,
          this._templateFactory,
          this._gameRunnerFactory.createScummVMGameRunner(),
          this._cli
        );
      default:
    }

    throw new Error('Unknown package type');
  }
}

module.exports = InstallerFactory;
