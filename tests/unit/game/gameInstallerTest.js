/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const GameInstaller = require('../../../src/game/GameInstaller');
const Logger = require('../../../src/logging/Logger');
const InstallerFactory = require('../../../src/game/installer/InstallerFactory');
const DosboxInstaller = require('../../../src/game/installer/DosBoxInstaller');
const PackageTypeResolver = require('../../../src/game/package/PackageTypeResolver');
const ganePackageTypes = require('../../../src/game/package/gamePackageTypes');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);

  t.context.dosBoxInstaller = sinon.createStubInstance(DosboxInstaller);

  t.context.installerFactory = sinon.createStubInstance(InstallerFactory);
  t.context.installerFactory.createByPackageType
    .returns(t.context.dosBoxInstaller);

  t.context.packageTypeResolver = sinon.createStubInstance(PackageTypeResolver);
  t.context.packageTypeResolver.getPackageType.returns(ganePackageTypes.GOG_DOSBOX);

  t.context.gameInstaller = new GameInstaller(
    t.context.logger,
    t.context.installerFactory,
    t.context.packageTypeResolver
  );
});

test('Game installer should install the game in the correct location.', (t) => {
  const { dosBoxInstaller, gameInstaller } = t.context;

  gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');

  t.true(dosBoxInstaller.install.calledOnce);
});
