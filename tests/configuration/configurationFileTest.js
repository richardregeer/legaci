'use strict';

const test = require('ava');

const ConfigurationFile = require('../../src/configuration/ConfigurationFile');

test.beforeEach((t) => {
  t.context.configurationFile = new Configuration('/tmp/testName', null);
});

test('Save configuration should throw an Error', (t) => {
  const { configurationFile } = t.context;

  t.throws(() => {
    configurationFile.saveConfiguration();
  }, Error);
});

test('Load configuration should throw an Error', (t) => {
  const { configurationFile } = t.context;

  t.throws(() => {
    configurationFile.loadConfiguration();
  }, Error);
});

test('Load configuration from template should throw an Error', (t) => {
  const { configurationFile } = t.context;

  t.throws(() => {
    configurationFile.loadConfigurationFromTemplate();
  }, Error);
});
