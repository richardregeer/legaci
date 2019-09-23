/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../src/logging/Logger');
const FileHandler = require('../../src/core/file/FileHandler');
const configurationTypes = require('../../src/configuration/configurationTypes');
const ConfigurationFactory = require('../../src/configuration/ConfigurationFactory');
const DosBoxConfiguration = require('../../src/configuration/DosBoxConfiguration');
const DosBoxGOGRunConfiguration = require('../../src/configuration/DosBoxGOGRunConfiguration');
const ExtractorFactory = require('../../src/extractor/ExtractorFactory');
const Extractor = require('../../src/extractor/WineExtractor');
const PackageTypeResolver = require('../../src/game/package/PackageTypeResolver');
const gamePackageTypes = require('../../src/game/package/gamePackageTypes');
const GameInstaller = require('../../src/game/GameInstaller');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.dosBoxConfiguration = sinon.createStubInstance(DosBoxConfiguration);
  t.context.dosBoxGOGRunConfiguration = sinon.createStubInstance(DosBoxGOGRunConfiguration);

  t.context.packageTypeResolver = sinon.createStubInstance(PackageTypeResolver);
  t.context.packageTypeResolver.getPackageType.returns(gamePackageTypes.GOG_DOSBOX);

  t.context.extractorFactory = sinon.createStubInstance(ExtractorFactory);
  t.context.extractor = sinon.createStubInstance(Extractor);
  t.context.extractorFactory.createExtractor.returns(t.context.extractor);

  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.configurationFactory.createConfiguration
    .withArgs(configurationTypes.DOSBOX_CONFIGURATION)
    .returns(t.context.dosBoxConfiguration);

  t.context.configurationFactory.createConfiguration
    .withArgs(configurationTypes.DOSBOX_RUN_CONFIGURATION)
    .returns(t.context.dosBoxGOGRunConfiguration);

  t.context.gameInstaller = new GameInstaller(
    t.context.extractorFactory,
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.logger,
    t.context.packageTypeResolver
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
    extractor
  } = t.context;

  gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');

  t.true(extractor.extract.calledOnce);
  t.true(dosBoxConfiguration.saveConfiguration.calledOnce);
  t.true(dosBoxGOGRunConfiguration.saveConfiguration.calledOnce);
});
