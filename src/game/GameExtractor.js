'use strict';

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

  extract(fullFileName, fullDestination) {
    this._logger.info(`Start extracting game ${fullFileName}`);

    const fileType = this._fileTypeResolver.getFileType(fullFileName);
    const extractor = this._extractorFactory.createExtractor(fileType);

    extractor.extract(fullFileName, fullDestination);

    this._logger.info('Finished extracting game');
  }
}

module.exports = GameExtractor;
