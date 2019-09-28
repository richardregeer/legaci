/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const PackageTypeResolver = require('../../../../src/game/package/PackageTypeResolver');
const gamePackageTypes = require('../../../../src/game/package/gamePackageTypes');

test.beforeEach((t) => {
  t.context.packageTypeResolver = new PackageTypeResolver(shell);
});

test('getPackageType should throw an error if not an valid GOG DosBox package', (t) => {
  const { packageTypeResolver } = t.context;

  t.throws(() => {
    packageTypeResolver.getPackageType('tests/games/notValidGOGDosBox');
  }, Error);
});

test('getPackageType should return a valid GOG DosBox package', (t) => {
  const { packageTypeResolver } = t.context;

  const result = packageTypeResolver.getPackageType('tests/fixtures/games/Tyrian');

  t.is(result, gamePackageTypes.GOG_DOSBOX);
});
