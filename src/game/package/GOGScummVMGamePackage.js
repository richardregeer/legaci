'use strict';

class GOGScummVMGamePackage {
  static isValid(path, cli) {
    const result = cli.find(path + '/scummvm/');

    if (result.length === 0) {
      return false;
    }

    return true;
  }
}

module.exports = GOGScummVMGamePackage;
