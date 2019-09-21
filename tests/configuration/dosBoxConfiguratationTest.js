/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const logger = require('../../src/logging/Logger');
const FileHandler = require('../../src/core/file/FileHandler');
const DosBoxConfiguration = require('../../src/configuration/DosBoxConfiguration');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configuration = new DosBoxConfiguration(t.context.fileHandler, t.context.logger);
});

test('Save Dosbox configuration should save the configuration bases on given template', (t) => {
  const { configuration, fileHandler } = t.context;
  const templatePath = '/template/path';
  const expectedConfigurationPath = '/test/legaci.conf';

  configuration.saveConfiguration('/test', templatePath);

  t.true(fileHandler.readFileSync.calledWith(templatePath), `Not called with ${templatePath}`);
  t.true(fileHandler.writeFileSync.calledWith(expectedConfigurationPath), `Not called with ${expectedConfigurationPath}`);
});

test('Save Dosbox configuration should rethrow exception when error is catched', (t) => {
  const { configuration, fileHandler } = t.context;

  fileHandler.readFileSync.throws(new Error());

  t.throws(() => {
    configuration.saveConfiguration('/test', 'template');
  }, Error);
});
