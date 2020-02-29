/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const ConfigurationFactory = require('../../../src/configuration/ConfigurationFactory');
const DosBoxConfiguration = require('../../../src/configuration/DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('../../../src/configuration/DosBoxGOGRunConfiguration');
const PackageTypeResolver = require('../../../src/game/package/PackageTypeResolver');
const gamePackageTypes = require('../../../src/game/package/gamePackageTypes');
const GameInstaller = require('../../../src/game/GameInstaller');
const TemplateFactory = require('../../../src/core/file/TemplateFactory');
const Template = require('../../../src/core/file/Template');
const DosBoxGameRunner = require('../../../src/runner/DosBoxGameRunner');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.dosBoxConfiguration = sinon.createStubInstance(DosBoxConfiguration);
  t.context.dosBoxGOGRunConfiguration = sinon.createStubInstance(DosBoxGOGRunConfiguration);

  t.context.packageTypeResolver = sinon.createStubInstance(PackageTypeResolver);
  t.context.packageTypeResolver.getPackageType.returns(gamePackageTypes.GOG_DOSBOX);

  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.configurationFactory.createDosBoxConfiguration
    .returns(t.context.dosBoxConfiguration);

  t.context.configurationFactory.createGOGDosBoxRunConfiguration
    .returns(t.context.dosBoxGOGRunConfiguration);

  t.context.templateFactory = sinon.createStubInstance(TemplateFactory);
  t.context.template = sinon.createStubInstance(Template);
  t.context.templateFactory.createTemplate.returns(t.context.template);

  t.context.gameRunner = sinon.createStubInstance(DosBoxGameRunner);

  t.context.gameInstaller = new GameInstaller(
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.logger,
    t.context.packageTypeResolver,
    t.context.templateFactory,
    t.context.gameRunner
  );
});

test('Install should throw an error when package is not a GOG Dosbox game', (t) => {
  const { gameInstaller, packageTypeResolver } = t.context;

  packageTypeResolver.getPackageType.returns('Unknown');

  t.throws(() => {
    gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');
  }, Error, 'Only GOG Dosbox games are supported');
});

test('GOG DosBox Windows installer should extract create DosBox configuration files.', (t) => {
  const {
    dosBoxGOGRunConfiguration,
    dosBoxConfiguration,
    gameInstaller,
    gameRunner
  } = t.context;

  gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');

  t.true(dosBoxConfiguration.saveConfiguration.calledOnce);
  t.true(dosBoxGOGRunConfiguration.saveConfiguration.calledOnce);
  t.true(gameRunner.createBinFile.calledOnce);
});
