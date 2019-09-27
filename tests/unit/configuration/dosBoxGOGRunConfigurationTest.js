/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');

const logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const DosBoxGOGRunConfiguration = require('../../../src/configuration/DosBoxGOGRunConfiguration');

const runConfigFixture = shell.cat(shell.pwd() + '/tests/fixtures/configuration/GOGRunConfiguration.conf').toString();

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.cli = sinon.stub({
    find() {},
    test() {}
  });

  t.context.cli.find.returns([runConfigFixture]);
  t.context.fileHandler.readFileSync.returns(runConfigFixture);

  t.context.configuration = new DosBoxGOGRunConfiguration(
    t.context.fileHandler,
    t.context.logger,
    t.context.cli
  );
});

test('Save configuration should throw an error when there is no single.conf run configuration file found', (t) => {
  const { configuration } = t.context;

  t.context.cli.find.returns([]);

  t.throws(() => {
    configuration.saveConfiguration('/test');
  }, Error);
});

test('Save configuration should replace mount path in configuration file', (t) => {
  const { configuration, fileHandler } = t.context;

  configuration.saveConfiguration('/test');

  t.true(fileHandler.writeFileSync.firstCall.args[1].indexOf('mount C /test') > 0,
    'Mount is not replaced in configuration');
});

test('Save configuration should replace image mount path in configuration file', (t) => {
  const { configuration, fileHandler, cli } = t.context;

  cli.test.returns(true);

  configuration.saveConfiguration('/test');

  t.true(fileHandler.writeFileSync.firstCall.args[1].indexOf('imgmount d "/test/game.ins"') > 0,
    'Image mount is not replaced in configuration');
});

test('Save configuration should remove the application menu from the configuration file', (t) => {
  const { configuration, fileHandler } = t.context;

  configuration.saveConfiguration('/test');

  t.true(fileHandler.writeFileSync.firstCall.args[1].indexOf(';33m') === -1,
    'GOG menu should be removed');
});

test('Save configuration should remove the cloud saves from the configuration file', (t) => {
  const { configuration, fileHandler } = t.context;

  configuration.saveConfiguration('/test');

  t.true(fileHandler.writeFileSync.firstCall.args[1].indexOf('cloud_saves') === -1,
    'GOG cloud_saves should be removed');
});
