'use strict';

const path = require('path');

const Configuration = require('./Configuration');
const configType = require('./configurationTypes').DOSBOX_CONFIGURATION;

class DosBoxConfiguration extends Configuration {
  saveConfiguration(configurationPath, templatePath) {
    try {
      const destination = path.dirname(configurationPath);
      const configuration = this._fileHandler.readFileSync(templatePath);
      this._fileHandler.writeFileSync(`${configurationPath}/legaci.conf`, configuration);

      // this._loggingEvents.saveConfiguratonSuccesful(configType, fullFileName);
    } catch (error) {
      // this._loggingEvents.saveConfiguratonFailes(configType, fullFileName, error);
      throw error;
    }
  }
}

module.exports = DosBoxConfiguration;
