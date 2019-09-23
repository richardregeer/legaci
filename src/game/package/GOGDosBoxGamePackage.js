'use strict';

class GOGDosBoxGamePackage {
  static isValid(path, cli) {
    const result = cli.find(path + '/DOSBOX/');

    if (result.length === 0) {
      return false;
    }

    return true;
  }
}

module.exports = GOGDosBoxGamePackage;
