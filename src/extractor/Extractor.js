'use strict';

class Extractor {
  constructor(logger, tempFolderPath, cli) {
    this._logger = logger;
    this._tempFolderPath = tempFolderPath;
    this._cli = cli;
  }

  extract() {
    throw new Error('Please extend extract');
  }

  validatePaths(fullFileName, fullDestination) {

  }

  getTempFolder() {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `${this._tempFolderPath}/${randomFolder}`;

    if (!this._cli.test('-e', tempFolder)) {
      this._cli.mkdir('-p', tempFolder);
    }

    return tempFolder;
  }
}

module.exports = Extractor;
