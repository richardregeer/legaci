'use strict';

class Template {
  constructor(fullTemplateFileName, fileHandler, logger) {
    this._fileHandler = fileHandler;
    this._logger = logger;
    this._fullTemplateFileName = fullTemplateFileName;
    this.template = '';
  }

  load() {
    try {
      this.template = this._fileHandler.readFileSync(this._fullTemplateFileName);

      return this.template;
    } catch (error) {
      this._logger.error(`Unable to load template file ${this._fullTemplateFileName}`);

      throw error;
    }
  }

  save(destinationPath) {
    try {
      this._fileHandler.writeFileSync(destinationPath, this.template);
    } catch (error) {
      this._logger.error('Unable to save template file');

      throw error;
    }
  }

  replaceVariable(name, value) {
    this.template = this.template.replace(`{{${name}}}`, value);
    return this.template;
  }
}

module.exports = Template;
