'use strict';

const Template = require('./Template');

class TemplateFactory {
  constructor(fileHandler, logger) {
    this._fileHandler = fileHandler;
    this._logger = logger;
  }

  createTemplate(fullTemplateFileName) {
    return new Template(fullTemplateFileName, this._fileHandler, this._logger);
  }
}

module.exports = TemplateFactory;
