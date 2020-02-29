'use strict';

const FileTypes = require('../core/file/fileTypes');
const ExtractorTypes = require('./extractorTypes');
const InnoExtractExtractor = require('./InnoExtractExtractor');
const WineExtractor = require('./WineExtractor');
const ZipExtractor = require('./ZipExtractor');

class ExtractorFactory {
  constructor(logger, tempFolderPath, cli) {
    this._logger = logger;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  createByExtractorType(extractorType) {
    switch (extractorType) {
      case ExtractorTypes.INNOEXTRACT:
        return new InnoExtractExtractor(this._logger, this._tempFolderPath, this._cli);
      case ExtractorTypes.WINE:
        return new WineExtractor(this._logger, this._tempFolderPath, this._cli);
      case ExtractorTypes.UNZIP:
        return new ZipExtractor(this._logger, this._tempFolderPath, this._cli);
      default:
    }

    throw new Error('Unknown extractor type');
  }

  createByFileType(fileType) {
    switch (fileType) {
      case FileTypes.EXE:
        return this.createByExtractorType(ExtractorTypes.INNOEXTRACT);
      case FileTypes.ZIP:
        return this.createByExtractorType(ExtractorTypes.UNZIP);
      case FileTypes.SH:
      default:
    }

    throw new Error('Unknown file type');
  }
}

module.exports = ExtractorFactory;
