/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const InstallerFactory = require('../../../../src/game/installer/InstallerFactory');
const Logger = require('../../../../src/logging/Logger');
const FileHandler = require('../../../../src/core/file/FileHandler');
const ConfigurationFactory = require('../../../../src/configuration/ConfigurationFactory');
const TemplateFactory = require('../../../../src/core/file/TemplateFactory');
const GameRunnerFactory = require('../../../../src/runner/GameRunnerFactory');
const packageTypes = require('../../../../src/game/package/gamePackageTypes');
const DosBoxInstaller = require('../../../../src/game/installer/DosBoxInstaller');
const ScummVMInstaller = require('../../../../src/game/installer/ScummVmInstaller');


test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.templateFactory = sinon.createStubInstance(TemplateFactory);
  t.context.gameRunner = sinon.createStubInstance(GameRunnerFactory);
  t.context.cli = sinon.stub({});

  t.context.factory = new InstallerFactory(
    t.context.logger,
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.templateFactory,
    t.context.gameRunner,
    t.context.cli
  );
});

test('CreateByPackageType should throw an Error if package type does not exist', (t) => {
  const { factory } = t.context;

  t.throws(() => {
    factory.createByPackageType('Unknown');
  }, Error);
});

test('CreateByPackageType should return a new DosBoxInstaller instance when package type is GOG _DOSBOX', (t) => {
  const { factory } = t.context;

  const result = factory.createByPackageType(packageTypes.GOG_DOSBOX);

  t.true(result instanceof DosBoxInstaller);
});

test('CreateByPackageType should return a new ScummVMInstaller instance when package type is GOG_SCUMMVM', (t) => {
  const { factory } = t.context;

  const result = factory.createByPackageType(packageTypes.GOG_SCUMMVM);

  t.true(result instanceof ScummVMInstaller);
});
