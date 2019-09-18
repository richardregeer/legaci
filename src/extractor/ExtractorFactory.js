'use strict';

const extractorTypes = require('./extractorTypes');
const WineExtractor = require('./WineExtractor');

class ExtractorFactory {
  constructor(logger, tempFolderPath, cli) {
    this._logger = logger;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  createExtractor(type) {
    switch (type) {
      case extractorTypes.WINE:
        return new WineExtractor(this._logger, this._tempFolderPath, this._cli);
      default:
        throw new Error(`Unable to create an extractor for type ${type}`);
    }
  }
}

module.exports = ExtractorFactory;
