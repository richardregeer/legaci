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
    const gameId = this._getScummVMGameId(fullDestination);

    const configFilePath = this._getConfigIniFilePath(fullDestination);
    const binTemplate = this._templateFactory.createTemplate('./etc/bin/scummvm.bin.template.sh');
    this._gameRunner.createBinFile(fullDestination, binTemplate, { gameId, configFilePath });
  }

  _getConfigIniFilePath(fullDestination) {
    const result = this._cli.find(`${fullDestination}/__support/app/*.ini`);

    if (result.length === 0) {
      throw new Error('Missing configuration ini file from ScummVM GOG installation.');
    }

    return path.basename(result[0]);
  }

  _getScummVMGameId(fullDestination) {
    const result = this._cli.cat(`${fullDestination}/__support/app/*.ini`)
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
