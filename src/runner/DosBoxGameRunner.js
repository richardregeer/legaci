'use strict';

const GameRunner = require('../../src/runner/GameRunner');

class DosBoxGameRunner extends GameRunner {
  createBinFile(gamePath, template, variables = []) {
    if (!this._cli.test('-e', gamePath)) {
      throw new Error(`Unable to create bin file, ${gamePath} does not exists`);
    }

    try {
      template.load();
      const binPath = `${gamePath}/legaci-run.sh`;

      template.replaceVariable('CONF_PATH', variables.configFilePath || `${gamePath}/legaci.conf`);
      template.replaceVariable('RUN_CONF_PATH', `${gamePath}/legaci-start.conf`);

      // Save bin file and make it executablereplaceVariable
      template.save(binPath);
      this._cli.chmod('+x', binPath);

      this._logger.info('Game bin file is created succesfully');
    } catch (error) {
      this._logger.error('Unable to create game bin file');

      throw error;
    }
  }
}

module.exports = DosBoxGameRunner;
