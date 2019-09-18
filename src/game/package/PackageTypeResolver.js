'use strict';

const gamePackageTypes = require('./gamePackageTypes');
const GOGGamePackage = require('./GOGGamePackage');
const GOGDosBoxGamePackage = require('./GOGDosBoxGamePackage');

class PackageTypeResolver {
  getPackageType(extractedPath) {
    if (GOGGamePackage.isValid(extractedPath)) {
      if (GOGDosBoxGamePackage.isValid(extractedPath)) {
        return gamePackageTypes.GOG_DOSBOX;
      }
    }

    throw new Error('Unsupported game package');
  }
}

module.exports = PackageTypeResolver;
