'use strict';

class GOGDosBoxGamePackage {
  static isValid(path, cli) {
    const resultUpper = cli.find(path + '/DOSBOX/');
    const resultLower = cli.find(path + '/dosbox/');
    const resultCamelCase = cli.find(path + '/Dosbox/');

    const found = resultUpper.length + resultLower.length + resultCamelCase.length;

    if (found === 0) {
      return false;
    }

    return true;
  }
}

module.exports = GOGDosBoxGamePackage;
