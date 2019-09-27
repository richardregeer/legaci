/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const Configuration = require('../../../src/configuration/Configuration');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configuration = new Configuration(t.context.fileHandler, t.context.logger);
});

test('Save configuration should save the configuration', (t) => {
  const { configuration, fileHandler } = t.context;

  configuration.saveConfiguration('/test', 'config');

  t.is(fileHandler.writeFileSync.callCount, 1);
});

test('Load configuration should load the configuration', (t) => {
  const { configuration, fileHandler } = t.context;

  configuration.loadConfiguration('/test', 'config');

  t.is(fileHandler.readFileSync.callCount, 1);
});
