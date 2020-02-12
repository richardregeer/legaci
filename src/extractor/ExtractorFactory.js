'use strict';

const FileTypes = require('../core/file/fileTypes');
const InnoExtractExtractor = require('./InnoExtractExtractor');

class ExtractorFactory {
  constructor(logger, tempFolderPath, cli) {
    this._logger = logger;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  createExtractor(fileType) {
    switch (fileType) {
      case FileTypes.EXE:
        return new InnoExtractExtractor(this._logger, this._tempFolderPath, this._cli);
      default:
    }

    throw new Error('Unknown file type');
  }
}

module.exports = ExtractorFactory;
