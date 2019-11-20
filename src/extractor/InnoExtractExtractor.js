'use strict';

const path = require('path');

const Extractor = require('./Extractor');

class InnoExtractExtractor extends Extractor {
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
      const command = `innoextract "${fullFileName}" -g -d ${tempDestination}`;
      this._cli.config.silent = false;

      this._logger.info('Extracting game file using Innoextract');
      this._cli.exec(command);

      this._cli.config.silent = true;

      // Move extracted game files to correct destination
      // TODO sometime extracted data is in app folder. Not always the case
      this._cli.mv(`${tempDestination}/__support/app/*.conf`, fullDestination);
      this._cli.mv(`${tempDestination}/*`, fullDestination);

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

module.exports = InnoExtractExtractor;
