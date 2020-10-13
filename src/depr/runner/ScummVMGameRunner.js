'use strict';

const GameRunner = require('./GameRunner');

class ScummVMGameRunner extends GameRunner {
  createBinFile(gamePath, template, variables = []) {
    if (!this._cli.test('-e', gamePath)) {
      throw new Error(`Unable to create bin file, ${gamePath} does not exists`);
    }

    try {
      template.load();
      const binPath = `${gamePath}/legaci-run.sh`;

      // Replace template variables
      template.replaceVariable('GAME_PATH', `${gamePath}`);
      template.replaceVariable('CONF_PATH', `${gamePath}/__support/app/${variables.configFilePath}`);
      template.replaceVariable('SCUMMVM_GAME_ID', variables.gameId);

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

module.exports = ScummVMGameRunner;
