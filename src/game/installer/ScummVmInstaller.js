'use strict';

const path = require('path');

class ScummVMInstaller {
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
    const configFilePath = this._getConfigIniFilePath(fullDestination);
    const gameId = this._getScummVMGameId(configFilePath);

    const binTemplate = this._templateFactory.createTemplate('./etc/bin/scummvm.bin.template.sh');
    const baseConfigFilePath = path.basename(configFilePath);
    this._gameRunner.createBinFile(fullDestination, binTemplate, { gameId, configFilePath: baseConfigFilePath });
  }

  _getConfigIniFilePath(fullDestination) {
    let result = this._cli.find(`${fullDestination}/*.ini`);

    if (result.length === 0) {
      result = this._cli.find(`${fullDestination}/__support/app/*.ini`);
    }

    if (result.length === 0) {
      throw new Error('Missing configuration ini file from ScummVM GOG installation.');
    }

    return result[0];
  }

  _getScummVMGameId(configIniFilePath) {
    const result = this._cli.cat(configIniFilePath)
      .grep('gameid=')
      .toString()
      .trim()
      .replace('gameid=', '');

    if (result === '') {
      throw new Error('Missing gameid from GOG ScummVM installation.');
    }

    return result;
  }
}

module.exports = ScummVMInstaller;
