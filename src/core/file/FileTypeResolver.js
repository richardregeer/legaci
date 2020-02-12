'use strict';

const fileTypes = require('./fileTypes');

class FileTypeResolver {
  constructor(path) {
    this._path = path;
  }

  getFileType(filePath) {
    const extName = this._path.extname(filePath);

    switch (extName.toLowerCase()) {
      case '.zip': return fileTypes.ZIP;
      case '.sh': return fileTypes.SH;
      case '.exe': return fileTypes.EXE;
      case '.dmg': return fileTypes.DMG;
      default:
    }

    throw new Error('Unknown file type');
  }
}

module.exports = FileTypeResolver;
