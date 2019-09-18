'use strict';

const path = require('path');
const fs = require('fs');

const Extractor = require('./Extractor');

class WineExtractor extends Extractor {
  extract(fullFileName, fullDestination) {
    const fileName = path.basename(fullFileName);

    if (!fs.existsSync(fullFileName)) {
      throw new Error(`Unable to extract file ${fileName}, it does not exsist`);
    }

    if (!fs.existsSync(fullDestination)) {
      fs.mkdirSync(fullDestination, { recursive: true });
    }

    const tempDestination = this.getTempFolder();

    try {
      const command = `
            WINEPREFIX=${tempDestination} WINEDLLOVERRIDES=winemenubuilder.exe=d \
            wine "${fullFileName}" \
            /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game > /dev/null 2>&1`;

      this._logger.info('Extracting game file using Wine');
      this._cli.exec(command);

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
