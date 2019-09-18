'use strict';

const shell = require('shelljs');
const fs = require('fs');

const Configuration = require('./Configuration');

class DosBoxRunConfiguration extends Configuration {
  saveConfiguration(configurationPath) {
    // Try to find the GOG startup configuration
    const result = shell.find(`${configurationPath}/*_single.conf`);

    if (result.length === 0) {
      throw new Error('No GOG Dosbox run configuration found');
    }

    // Cleanup and make it runable under Linux
    const startupConfig = this._fileHandler.readFileSync(result[0]).toString().split('\r\n');
    const newStartupConfig = [];

    try {
      startupConfig.forEach((line) => {
        let newLine = null;

        // First try to replace lines if needed
        newLine = this._replaceMountPath(line, configurationPath)
          || this._replaceImageMountPath(line, configurationPath)
          || line;

        // Check if the line needs to be added to the configuration
        if (this._removeApplicationMenu(line)
        || this._removeCloudSaves(line)) {
          newLine = null;
        }

        if (newLine !== null) {
          // Push only ASCII characters to new config.
          newStartupConfig.push(newLine.replace(/[^ -~]+/g, ''));
        }
      });
    } catch (error) {
      this._logger.error('Unable to save DosBox run configuration file');

      throw error;
    }

    this._fileHandler.writeFileSync(`${configurationPath}/legaci-start.conf`, newStartupConfig.join('\n'));
    this._logger.info('DosBox run configuration file saved succesfully');
  }

  _replaceMountPath(line, destination) {
    if (line.toLowerCase().indexOf('mount c ".."') > -1) {
      return line.replace('".."', destination);
    }

    return null;
  }

  _removeCloudSaves(line) {
    if (line.toLowerCase().indexOf('cloud_saves') > -1) {
      return true;
    }

    return false;
  }

  _replaceImageMountPath(line, destination) {
    if (line.toLowerCase().indexOf('imgmount') > -1) {
      const newLine = this._correctFilenameCase(line, destination);
      return newLine.replace('..\\', `${destination}/`);
    }

    return null;
  }

  _removeApplicationMenu(line) {
    if ((line.toLowerCase().indexOf('[1;') > -1)
        || (line.toLowerCase().indexOf('[0m') > -1)) {
      return true;
    }

    return false;
  }

  _correctFilenameCase(line, destination) {
    const start = line.indexOf('\\');
    const end = line.indexOf('"', start);
    const fileName = line.substring(start + 1, end);

    if (fs.existsSync(destination + `/${fileName}`)) {
      return line;
    }

    let correctedFileName = fileName.toLowerCase();
    if (fs.existsSync(destination + `/${correctedFileName}`)) {
      return line.replace(fileName, correctedFileName);
    }

    correctedFileName = fileName.toUpperCase();
    if (fs.existsSync(destination + `/${correctedFileName}`)) {
      return line.replace(fileName, correctedFileName);
    }

    return line;
  }
}

module.exports = DosBoxRunConfiguration;
