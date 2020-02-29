'use strict';

class DosBoxInstaller {
  constructor(
    configurationFactory,
    fileHandler,
    templateFactory,
    gameRunner
  ) {
    this._fileHandler = fileHandler;
    this._configurationFactory = configurationFactory;
    this._templateFactory = templateFactory;
    this._gameRunner = gameRunner;
  }

  install(fullDestination) {
    // Create or change the required configurations
    const dosBoxconfiguration = this._configurationFactory.createDosBoxConfiguration();
    dosBoxconfiguration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');

    const dosBoxRunConfiguration = this._configurationFactory.createGOGDosBoxRunConfiguration();
    dosBoxRunConfiguration.saveConfiguration(fullDestination);

    // Create game bin file
    const binTemplate = this._templateFactory.createTemplate('./etc/bin/dosbox.bin.template.sh');
    this._gameRunner.createBinFile(fullDestination, binTemplate);
  }
}

module.exports = DosBoxInstaller;
