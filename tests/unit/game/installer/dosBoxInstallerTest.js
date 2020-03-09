/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const FileHandler = require('../../../../src/core/file/FileHandler');
const ConfigurationFactory = require('../../../../src/configuration/ConfigurationFactory');
const DosBoxConfiguration = require('../../../../src/configuration/DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('../../../../src/configuration/DosBoxGOGRunConfiguration');
const DosBoxInstaller = require('../../../../src/game/installer/DosBoxInstaller');
const TemplateFactory = require('../../../../src/core/file/TemplateFactory');
const Template = require('../../../../src/core/file/Template');
const DosBoxGameRunner = require('../../../../src/runner/DosBoxGameRunner');

test.beforeEach((t) => {
  t.context.cli = sinon.stub({
    find() {}
  });
  t.context.cli.find.returns([]);

  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.dosBoxConfiguration = sinon.createStubInstance(DosBoxConfiguration);
  t.context.dosBoxGOGRunConfiguration = sinon.createStubInstance(DosBoxGOGRunConfiguration);

  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.configurationFactory.createDosBoxConfiguration
    .returns(t.context.dosBoxConfiguration);

  t.context.configurationFactory.createGOGDosBoxRunConfiguration
    .returns(t.context.dosBoxGOGRunConfiguration);

  t.context.templateFactory = sinon.createStubInstance(TemplateFactory);
  t.context.template = sinon.createStubInstance(Template);
  t.context.templateFactory.createTemplate.returns(t.context.template);

  t.context.gameRunner = sinon.createStubInstance(DosBoxGameRunner);

  t.context.dosBoxinstaller = new DosBoxInstaller(
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.templateFactory,
    t.context.gameRunner,
    t.context.cli
  );
});

test('GOG DosBox installer should install the correct DosBox configuration files.', (t) => {
  const {
    dosBoxGOGRunConfiguration,
    dosBoxConfiguration,
    dosBoxinstaller,
    gameRunner
  } = t.context;

  dosBoxinstaller.install('/tmp/test-game');

  t.true(dosBoxConfiguration.saveConfiguration.calledOnce);
  t.true(dosBoxGOGRunConfiguration.saveConfiguration.calledOnce);
  t.true(gameRunner.createBinFile.calledOnce);
});

test('GOG DosBox installer should copy the existing DosBox configuration file if available.', (t) => {
  const {
    dosBoxGOGRunConfiguration,
    dosBoxConfiguration,
    dosBoxinstaller,
    gameRunner,
    cli
  } = t.context;

  cli.find.returns(['/tmp/configuration.conf']);

  dosBoxinstaller.install('/tmp/test-game');

  t.true(dosBoxConfiguration.saveConfiguration.notCalled);
  t.true(dosBoxGOGRunConfiguration.saveConfiguration.calledOnce);
  t.true(gameRunner.createBinFile.calledOnce);
});
