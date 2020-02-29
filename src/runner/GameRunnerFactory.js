'use strict';

const DosBoxGameRunner = require('./DosBoxGameRunner');
const ScummVmGameRunner = require('./ScummVMGameRunner');

class GameRunnerFactory {
  constructor(
    logger,
    fileHandler,
    cli
  ) {
    this._logger = logger;
    this._fileHandler = fileHandler;
    this._cli = cli;
  }

  createScummVMGameRunner() {
    return new ScummVmGameRunner(this._fileHandler, this._logger, this._cli);
  }

  createDosBoxGameRunner() {
    return new DosBoxGameRunner(this._fileHandler, this._logger, this._cli);
  }
}

module.exports = GameRunnerFactory;
