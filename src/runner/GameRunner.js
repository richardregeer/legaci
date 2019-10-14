'use strict';

class GameRunner {
  constructor(fileHandler, logger, cli) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._cli = cli;
  }

  createBinFile() {
    throw new Error('Please extend createBinFile');
  }
}

module.exports = GameRunner;
