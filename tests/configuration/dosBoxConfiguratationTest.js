'use strict';

const test = require('ava');
const sinon = require('sinon');

const LoggingEvents = require('../../src/logging/LoggingEvents');
const FileHandler = require('../../src/core/file/FileHandler');
const DosBoxConfiguration = require('../../src/configuration/DosBoxConfiguration');

test.beforeEach((t) => {
  t.context.loggingEvents = sinon.createStubInstance(LoggingEvents);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configuration = new DosBoxConfiguration(t.context.fileHandler, t.context.loggingEvents);
});

test.skip('Save Dosbox configuration should save the configuration bases on given template', (t) => {
  const { configuration } = t.context;

  configuration.saveConfiguration(fullFileName, templatePath);
});

test.skip('Save Dosbox configuration should rethrow exception when error is catched', (t) => {
  const { configuration } = t.context;

  configuration.saveConfiguration(fullFileName, templatePath);
});
