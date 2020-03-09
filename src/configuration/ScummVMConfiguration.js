'use strict';

const Configuration = require('./Configuration');

class ScummVMConfiguration extends Configuration {
  saveConfiguration(configurationPath, templatePath) {
    try {
      const configuration = this._fileHandler.readFileSync(templatePath);

      const configurationName = `${configurationPath}/legaci.ini`;

      this._fileHandler.writeFileSync(configurationName, configuration);
      this._logger.info('ScummVM configuration file saved succesfully');

      return configurationName;
    } catch (error) {
      this._logger.error('Unable to save ScummVM configuration file');

      throw error;
    }
  }
}

module.exports = ScummVMConfiguration;
