'use strict';

const shell = require('shelljs');

shell.config.silent = true;

class GOGGamePackage {
  static isValid(path) {
    const result = shell.find(path + '/goggame-*.info');

    if (result.length !== 1) {
      return false;
    }

    return true;
  }
}

module.exports = GOGGamePackage;
