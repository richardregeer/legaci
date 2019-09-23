'use strict';

class GOGGamePackage {
  static isValid(path, cli) {
    const result = cli.find(path + '/goggame-*.info');

    if (result.length !== 1) {
      return false;
    }

    return true;
  }
}

module.exports = GOGGamePackage;
