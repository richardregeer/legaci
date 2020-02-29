'use strict';

const Configuration = require('./Configuration');

class ScummVMConfiguration extends Configuration {
  saveConfiguration(configurationPath, templatePath) {
    try {
      const configuration = this._fileHandler.readFileSync(templatePath);
      this._fileHandler.writeFileSync(`${configurationPath}/legaci.conf`, configuration);
      this._logger.info('ScummVM configuration file saved succesfully');
    } catch (error) {
      this._logger.error('Unable to save ScummVM configuration file');

      throw error;
    }
  }
}

module.exports = ScummVMConfiguration;
