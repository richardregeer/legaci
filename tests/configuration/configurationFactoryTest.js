/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const configurationTypes = require('../../src/configuration/configurationTypes');
const logger = require('../../src/logging/Logger');
const DosBoxConfiguration = require('../../src/configuration/DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('../../src/configuration/DosBoxGOGRunConfiguration');

const ConfigurationFactory = require('../../src/configuration//ConfigurationFactory');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);

  t.context.factory = new ConfigurationFactory('/tmp/testName', t.context.logger);
});

test('Create a DosBox configuration should return a new DosBox configuration instance', (t) => {
  const { factory } = t.context;

  const result = factory.createConfiguration(configurationTypes.DOSBOX_CONFIGURATION);

  t.true(result instanceof DosBoxConfiguration);
});

test('Create a DosBox GOG run configuration should return a new DosBox GOG run configuration instance', (t) => {
  const { factory } = t.context;

  const result = factory.createConfiguration(configurationTypes.DOSBOX_RUN_CONFIGURATION);

  t.true(result instanceof DosBoxGOGRunConfiguration);
});

test('Create a configuration of an unsupported type should throw an error', (t) => {
  const { factory } = t.context;

  t.throws(() => {
    factory.createConfiguration('unknown');
  }, Error);
});
