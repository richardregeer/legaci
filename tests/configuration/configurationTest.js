/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');

const Configuration = require('../../src/configuration/Configuration');

test.beforeEach((t) => {
  t.context.configurationFile = new Configuration('/tmp/testName', null);
});

test('Save configuration should throw an Error', (t) => {
  const { configuration } = t.context;

  t.throws(() => {
    configuration.saveConfiguration();
  }, Error);
});

test('Load configuration should throw an Error', (t) => {
  const { configuration } = t.context;

  t.throws(() => {
    configuration.loadConfiguration();
  }, Error);
});

test('Load configuration from template should throw an Error', (t) => {
  const { configuration } = t.context;

  t.throws(() => {
    configuration.loadConfigurationFromTemplate();
  }, Error);
});
