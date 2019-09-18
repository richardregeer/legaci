'use strict';

const fs = require('fs');

class Extractor {
  constructor(logger, tempFolderPath, cli) {
    this._logger = logger;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  extract(fullFileName, fullDestination) {
    throw new Error('Please extend extract');
  }

  getTempFolder() {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `${this._tempFolderPath}/${randomFolder}`;

    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }

    return tempFolder;
  }
}

module.exports = Extractor;
