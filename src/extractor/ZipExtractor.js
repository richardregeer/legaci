'use strict';

const path = require('path');

const Extractor = require('./Extractor');

class ZipExtractor extends Extractor {
  extract(fullFileName, fullDestination) {
    const fileName = path.basename(fullFileName);

    // TODO Refactor this to the base clase
    if (!this._cli.test('-e', fullFileName)) {
      throw new Error(`Unable to extract file ${fileName}, it does not exsist`);
    }

    // TODO Refactor this to the base clase
    if (!this._cli.test('-e', fullDestination)) {
      this._cli.mkdir('-p', fullDestination);
    }

    const tempDestination = this.getTempFolder();

    try {
      const command = `unzip "${fullFileName}" -d ${tempDestination}`;
      this._cli.config.silent = false;

      this._logger.info('Extracting game file using unzip');
      this._cli.exec(command);

      this._cli.config.silent = true;

      // Move extracted game files to correct destination
      this._cli.mv(`${tempDestination}/data/noarch/*`, fullDestination);

      this._logger.info(`Finished extracting game file to path ${fullDestination}`);
    } catch (error) {
      this._logger.error(`Unable to extract game file ${fullFileName}`);

      throw error;
    } finally {
      this._cli.rm('-rf', tempDestination);
      this._logger.info('Finished cleaning up unused extracted files');
    }
  }
}

module.exports = ZipExtractor;
