/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');
const sinon = require('sinon');

shell.silent = true;

const Logger = require('../../../src/logging/Logger');
const DosBoxConfiguration = require('../../../src/configuration/DosBoxConfiguration');
const FileHandler = require('../../../src/core/file/FileHandler');

const TEST_PATH = '.test/dosBoxConfigurationTest';

test.before((t) => {
  const fileHandler = new FileHandler();
  t.context.logger = sinon.createStubInstance(Logger);

  t.context.configuration = new DosBoxConfiguration(fileHandler, t.context.logger);
  shell.mkdir('-p', TEST_PATH);
});

test.after(() => {
  shell.rm('-rf', shell.pwd() + '/' + TEST_PATH);
});

test('Save Dosbox configuration should save the configuration bases on given template', (t) => {
  const { configuration } = t.context;
  const expectedConfigurationPath = './etc/dosbox/dosbox.template.conf';

  configuration.saveConfiguration(TEST_PATH, expectedConfigurationPath);

  t.true(shell.test('-e', shell.pwd() + '/' + TEST_PATH + '/legaci.conf'), `DosBox configuration file is not found on path ${expectedConfigurationPath}`);
});
