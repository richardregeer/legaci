'use strict';

class GameRunner {
  constructor(fileHandler, logger) {
    this._fileHandler = fileHandler;
    this._logger = logger;
  }

  createBinFile() {
    throw new Error('Please extend createBinFile');
  }
}

module.exports = GameRunner;
