/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');

const logger = require('../../../src/logging/Logger');
const DosBoxConfiguration = require('../../../src/configuration/DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('../../../src/configuration/DosBoxGOGRunConfiguration');

const ConfigurationFactory = require('../../../src/configuration/ConfigurationFactory');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);

  t.context.factory = new ConfigurationFactory('/tmp/testName', t.context.logger, shell);
});

test('Create a DosBox configuration should return a new DosBox configuration instance', (t) => {
  const { factory } = t.context;

  const result = factory.createDosBoxConfiguration();

  t.true(result instanceof DosBoxConfiguration);
});

test('Create a DosBox GOG run configuration should return a new DosBox GOG run configuration instance', (t) => {
  const { factory } = t.context;

  const result = factory.createGOGDosBoxRunConfiguration();

  t.true(result instanceof DosBoxGOGRunConfiguration);
});
