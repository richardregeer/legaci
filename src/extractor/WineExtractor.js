'use strict';

const path = require('path');

const Extractor = require('./Extractor');

class WineExtractor extends Extractor {
  extract(fullFileName, fullDestination) {
    const fileName = path.basename(fullFileName);

    if (!this._cli.test('-e', fullFileName)) {
      throw new Error(`Unable to extract file ${fileName}, it does not exsist`);
    }

    if (!this._cli.test('-e', fullDestination)) {
      this._cli.mkdir('-p', fullDestination);
    }

    const tempDestination = this.getTempFolder();

    try {
      const command = `sudo WINEPREFIX=${tempDestination} WINEDLLOVERRIDES=winemenubuilder.exe=d \
            wine "${fullFileName}" \
            /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game`;

      this._logger.info('Extracting game file using Wine');
      this._cli.config.silent = false;
      this._cli.exec(command, { shell: '/bin/bash' });

      this._cli.mv(`${tempDestination}/drive_c/game/*`, fullDestination);
      this._logger.info(`Finished extracting game file to path ${fullDestination}`);
    } catch (error) {
      this._logger.error(`Unable to extract game file ${fullFileName}`);

      throw error;
    } finally {
      this._cli.rm('-rf', tempDestination);
      this._logger.info('Finished cleaning up Wine bottle');
    }
  }
}

module.exports = WineExtractor;
