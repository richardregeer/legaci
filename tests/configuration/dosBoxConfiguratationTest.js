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

test.skip('Save Dosbox configuration should save the configuration bases on given template', (t) => {
  const { configuration } = t.context;

  configuration.saveConfiguration();
});

test.skip('Save Dosbox configuration should rethrow exception when error is catched', (t) => {
  const { configuration } = t.context;

  configuration.saveConfiguration();
});
