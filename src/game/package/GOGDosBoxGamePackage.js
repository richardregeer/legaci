'use strict';

const shell = require('shelljs');

shell.config.silent = true;

class GOGDosBoxGamePackage {
  static isValid(path) {
    const result = shell.find(path + '/DOSBOX/');

    if (result.length === 0) {
      return false;
    }

    return true;
  }
}

module.exports = GOGDosBoxGamePackage;
