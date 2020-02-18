'use strict';

const path = require('path');

const fileTypes = require('./fileTypes');

class FileTypeResolver {
  constructor(cli) {
    this._cli = cli;
  }

  getFileType(filePath) {
    const extName = path.extname(filePath);

    switch (extName.toLowerCase()) {
      case '.zip': return fileTypes.ZIP;
      case '.sh':
        if (this._isGogShellScript(filePath)) {
          return fileTypes.ZIP;
        }

        return fileTypes.SH;
      case '.exe': return fileTypes.EXE;
      case '.dmg': return fileTypes.DMG;
      default:
    }

    throw new Error('Unknown file type');
  }

  _isGogShellScript(filePath) {
    const result = this._cli.head({ '-n': 30 }, filePath).grep('GOG.com').toString().trim();

    return result !== '';
  }
}

module.exports = FileTypeResolver;
