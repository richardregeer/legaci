'use strict';

const fs = require('fs');

class FileHandler {
  writeFileSync(fileName, path, contents) {
    const fullPath = this._getFullPath(fileName, path);

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(fullPath, contents);
  }

  copyFileSync(fileName, source, destination) {
    const fullSourcePath = this._getFullPath(fileName, source);
    const fullDestinationPath = this._getFullPath(fileName, destination);

    if (!fs.existsSync(fullSourcePath)) {
      throw new Error(`Unable to copy file ${fileName} from ${source}, it does not exists`);
    }

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    fs.copyFileSync(fullSourcePath, fullDestinationPath);
  }

  readFileSync(fileName, path) {
    const fullPath = this._getFullPath(fileName, path);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`File ${fileName} does not exsists`);
    }

    return fs.readFileSync(this._getFullPath(fileName, path)).toString();
  }

  _getFullPath(fileName, path) {
    return `${path.trim('/')}/${fileName}`;
  }
}

module.exports = FileHandler;
