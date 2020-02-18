'use strict';

const path = require('path');

class ShellScriptRunner {
  constructor(logger, cli) {
    this._logger = logger;
    this._cli = cli;
  }

  run(fullFileName) {
    const fileName = path.basename(fullFileName);

    if (!this._cli.test('-e', fullFileName)) {
      throw new Error(`Unable to run file ${fileName}, it does not exsist`);
    }

    try {
      // Make sure the script can be executed
      this._cli.chmod('+x', fullFileName);

      const command = `"${fullFileName}"`;
      this._cli.config.silent = false;

      this._logger.info('Running the shell script');
      this._cli.exec(command);

      this._cli.config.silent = true;

      this._logger.info('Finished running the shell script');
    } catch (error) {
      this._logger.error(`Unable to run the shell script file ${fullFileName}`);

      throw error;
    }
  }
}

module.exports = ShellScriptRunner;
