'use strict';

const Configuration = require('./Configuration');
const configType = require('./configurationTypes').DOSBOX_CONFIGURATION;

class DosBoxConfiguration extends Configuration {
  saveConfiguration(fullFileName, templatePath) {
    try {
      const configuration = this._fileHandler.readFileSync(templatePath);
      this.fileHandler.writeFileSync(fullFileName, configuration);

      this._loggingEvents.saveConfiguratonSuccesful(configType, fullFileName);
    } catch (error) {
      this._loggingEvents.saveConfiguratonFailes(configType, fullFileName, error);
      throw error;
    }
  }
}

module.exports = DosBoxConfiguration;
