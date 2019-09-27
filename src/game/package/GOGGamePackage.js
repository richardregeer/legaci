'use strict';

class GOGGamePackage {
  static isValid(path, cli) {
    const result = cli.find(path + '/goggame-*.info');

    if (result.length > 0) {
      return true;
    }

    return false;
  }
}

module.exports = GOGGamePackage;
