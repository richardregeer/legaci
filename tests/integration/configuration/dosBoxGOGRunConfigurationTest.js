/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');
const sinon = require('sinon');

shell.silent = true;

const Logger = require('../../../src/logging/Logger');
const DosBoxRunConfiguration = require('../../../src/configuration/DosBoxGOGRunConfiguration');
const FileHandler = require('../../../src/core/file/FileHandler');

const TEST_PATH = '.test/dosBoxGOGRunConfigurationTest';

test.before((t) => {
  t.context.fileHandler = new FileHandler();
  t.context.logger = sinon.createStubInstance(Logger);

  t.context.configuration = new DosBoxRunConfiguration(
    t.context.fileHandler,
    t.context.logger,
    shell
  );
  shell.mkdir('-p', TEST_PATH);
  shell.cp('-r', 'tests/fixtures/games/Tyrian/', TEST_PATH);
});

test.after(() => {
  shell.rm('-rf', shell.pwd() + '/' + TEST_PATH);
});

test('Save Dosbox GOG run configuration should create a valid linux run configuration', (t) => {
  const { configuration, fileHandler } = t.context;
  const installPath = `${TEST_PATH}/Tyrian`;

  configuration.saveConfiguration(installPath);

  t.true(shell.test('-e', shell.pwd() + `/${installPath}/legaci-start.conf`), `DosBox GOG Run configuration file is not found on path ${installPath}`);

  const runConfiguration = fileHandler.readFileSync(shell.pwd() + `/${installPath}/legaci-start.conf`);

  t.true(runConfiguration.indexOf('mount C .test/dosBoxGOGRunConfigurationTest/Tyrian') > 0,
    'Mount is incorrect in the configuration file');
  t.true(runConfiguration.indexOf('imgmount d ".test/dosBoxGOGRunConfigurationTest/Tyrian/game.ins') > 0,
    'Imagemount is incorrect in the configuration file');
  t.is(runConfiguration.indexOf('cloud_saves'), -1,
    'Cloud saves should be removed from the configuration file');
  t.is(runConfiguration.indexOf(';33m'), -1,
    'Special menu characters should be removed from the configuration file');
});
