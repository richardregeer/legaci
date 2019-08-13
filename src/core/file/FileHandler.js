'use strict';

const fs = require('fs');

class FileHandler {
  writeFileSync(fileName, path, contents) {
    if (!fs.existsSync(path)) {
      // TODO create directory
    }

    fs.writeFileSync(this._getFullPath(fileName, path), contents);
  }

  copyFileSync(fileName, source, destination) {
    const fullSourcePath = this._getFullPath(fileName, source);
    const fullDestinationPath = this._getFullPath(fileName, destination);

    if (!fs.existsSync(fullSourcePath)) {
      throw new Error(`Unable to copy file ${fullSourcePath}, does not exsists`);
    }

    if (!fs.existsSync(destination)) {
      // TODO create directory
    }

    fs.copyFileSync(fullSourcePath, fullDestinationPath);
  }

  readFileSync(fileName, path) {
    const fullPath = this._getFullPath(fileName, path);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`File ${fullPath} does not exsists`);
    }

    return fs.readFileSync(this._getFullPath(fileName, path)).toString();
  }

  _getFullPath(fileName, path) {
    return `${path.trim('/')}/${fileName}`;
  }
}

module.exports = FileHandler;
