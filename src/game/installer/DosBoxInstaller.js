'use strict';

class DosBoxInstaller {
  constructor(
    configurationFactory,
    fileHandler,
    templateFactory,
    gameRunner,
    cli
  ) {
    this._fileHandler = fileHandler;
    this._configurationFactory = configurationFactory;
    this._templateFactory = templateFactory;
    this._gameRunner = gameRunner;
    this._cli = cli;
  }

  install(fullDestination) {
    const configFilePath = this._getConfigFilePath(fullDestination);
    if (configFilePath === null) {
      const dosBoxconfiguration = this._configurationFactory.createDosBoxConfiguration();
      dosBoxconfiguration.saveConfiguration(fullDestination, './etc/dosbox/dosbox.template.conf');
    }

    const dosBoxRunConfiguration = this._configurationFactory.createGOGDosBoxRunConfiguration();
    dosBoxRunConfiguration.saveConfiguration(fullDestination);

    // Create game bin file
    const binTemplate = this._templateFactory.createTemplate('./etc/bin/dosbox.bin.template.sh');
    this._gameRunner.createBinFile(fullDestination, binTemplate, { configFilePath });
  }

  _getConfigFilePath(fullDestination) {
    const result = this._cli.find(`${fullDestination}/*.conf`);

    if (result.length === 0) {
      return null;
    }

    // Pick the first one without _single
    for (let i = 0; i < result.length; i++) {
      // console.log(result[i]);
      if (!(result[i].toLowerCase().indexOf('_single') > -1)) {
        return result[i];
      }
    }

    return result[0];
  }
}

module.exports = DosBoxInstaller;
