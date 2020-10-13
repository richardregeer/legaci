'use strict';

class GOGScummVMGamePackage {
  static isValid(path, cli) {
    const resultUpper = cli.find(path + '/SCUMMVM/');
    const resultLower = cli.find(path + '/scummvm/');
    const resultCamelCase = cli.find(path + '/ScummVm/');

    const found = resultUpper.length + resultLower.length + resultCamelCase.length;

    if (found === 0) {
      return false;
    }

    return true;
  }
}

module.exports = GOGScummVMGamePackage;
