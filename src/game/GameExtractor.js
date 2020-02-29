'use strict';

const extractorTypes = require('../extractor/extractorTypes');

class GameExtractor {
  constructor(
    extractorFactory,
    fileTypeResolver,
    logger
  ) {
    this._extractorFactory = extractorFactory;
    this._fileTypeResolver = fileTypeResolver;
    this._logger = logger;
  }

  extract(fullFileName, fullDestination, forceExtractorType = extractorTypes.UNKNOWN) {
    this._logger.info(`Start extracting game ${fullFileName}`);

    let extractor = null;
    if (forceExtractorType === extractorTypes.UNKNOWN) {
      const fileType = this._fileTypeResolver.getFileType(fullFileName);
      extractor = this._extractorFactory.createByFileType(fileType);
    } else {
      extractor = this._extractorFactory.createByExtractorType(forceExtractorType);
    }

    extractor.extract(fullFileName, fullDestination);

    this._logger.info('Finished extracting game');
  }
}

module.exports = GameExtractor;
