'use strict';

const gamePackageTypes = require('./gamePackageTypes');
const GOGGamePackage = require('./GOGGamePackage');
const GOGDosBoxGamePackage = require('./GOGDosBoxGamePackage');

class PackageTypeResolver {
  constructor(cli) {
    this._cli = cli;
    this._cli.config.silent = true;
  }

  getPackageType(extractedPath) {
    if (GOGGamePackage.isValid(extractedPath, this._cli)) {
      if (GOGDosBoxGamePackage.isValid(extractedPath, this._cli)) {
        return gamePackageTypes.GOG_DOSBOX;
      }
    }

    throw new Error('Unsupported game package');
  }
}

module.exports = PackageTypeResolver;
