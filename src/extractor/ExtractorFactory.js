'use strict';

const extractorTypes = require('./extractorTypes');
const WineExtractor = require('./WineExtractor');

class ExtractorFactory {
  constructor(loggingEvents, tempFolderPath, cli) {
    this._loggingEvents = loggingEvents;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  createExtractor(type) {
    switch (type) {
      case extractorTypes.WINE:
        return new WineExtractor(this._loggingEvents, this._tempFolderPath, this._cli);
      default:
        throw new Error(`Unable to create a extractor for type ${type}`);
    }
  }
}

module.exports = ExtractorFactory;
