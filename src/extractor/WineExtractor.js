'use strict';

const path = require('path');
const fs = require('fs');

const Extractor = require('./Extractor');

class WineExtractor extends Extractor {
  extract(fullFileName, fullDestination) {
    const fileName = path.basename(fullFileName);

    if (!fs.existsSync(fullFileName)) {
      throw new Error(`File ${fileName} does not exsist`);
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

      // TODO Add some logging
      this._cli.exec(command);

      this._cli.mv(`${tempDestination}/drive_c/game/*`, fullDestination);
      // / TODO add some logging
    } catch (error) {
      // / TODO add some logging
      throw error;
    } finally {
      // / TODO add some logging
      this._cli.rm('-rf', tempDestination);
    }
  }
}

module.exports = WineExtractor;
