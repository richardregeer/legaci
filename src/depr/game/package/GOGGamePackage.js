'use strict';

class GOGGamePackage {
  static isValid(path, cli) {
    const resultInfoFile = cli.find(path + '/goggame-*.info');
    const resultShLibFile = cli.find(path + '/support/gog_com.shlib');

    if (resultInfoFile.length > 0
        || resultShLibFile.length > 0) {
      return true;
    }

    return false;
  }
}

module.exports = GOGGamePackage;
