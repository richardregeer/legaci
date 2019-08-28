'use strict';

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const Configuration = require('./Configuration');
const configType = require('./configurationTypes').DOSBOX_RUN_CONFIGURATION;

class DosBoxRunConfiguration extends Configuration {
  saveConfiguration(fullFileName) {
    // Try to find the GOG startup configuration
    const result = shell.find(`${fullFileName}/*_single.conf`);
    const destination = path.dirname(fullFileName);

    if (result.length === 0) {
      throw new Error('No GOG Dosbox run configuration found');
    }

    // Cleanup and make it runable under Linux
    const startupConfig = this._fileHandler.readFileSync(result[0]).toString().split('\r\n');
    const newStartupConfig = [];

    try {
      startupConfig.forEach((line) => {
        let newLine = null;

        newLine = this._replaceMountPath(line, destination);
        newLine = this._replaceImageMountPath(line, destination);
        newLine = this._replaceApplicationMenu(line);
        newLine = this._replaceCloudSaves(line);

        if (newLine !== null) {
          // Push only ASCII characters to new config.
          newStartupConfig.push(newLine.replace(/[^ -~]+/g, ''));
        }
      });
    } catch (error) {
      // TODO Add some logging
      throw error;
    }

    // TODO Add some logging
    this.fileHandler.writeFileSync(`${destination}/legaci-start.conf`, newStartupConfig.join('\n'));
  }

  _replaceMountPath(line, destination) {
    if (line.toLowerCase().indexOf('mount c ".."') > -1) {
      return line.replace('".."', destination);
    }

    return line;
  }

  _replaceCloudSaves(line) {
    if (line.toLowerCase().indexOf('cloud_saves') > -1) {
      return null;
    }

    return line;
  }

  _replaceImageMountPath(line, destination) {
    if (line.toLowerCase().indexOf('imgmount') > -1) {
      const newLine = this._correctFilenameCase(line, destination);
      return newLine.replace('..\\', `${destination}/`);
    }

    return line;
  }

  _replaceApplicationMenu(line) {
    if ((line.toLowerCase().indexOf('[1;') > -1)
        || (line.toLowerCase().indexOf('[0m') > -1)) {
      return null;
    }

    return line;
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
