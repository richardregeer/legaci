/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const ScummVMGamePackage = require('../../../../src/game/package/GOGScummVMGamePackage');

test('IsValid should return false when given file is not a GOG ScummVM installation file', (t) => {
  const result = ScummVMGamePackage.isValid('tests/games/notValidGOG', shell);

  t.false(result);
});

test('IsValid should return true when given file is a GOG ScummVM installation file', (t) => {
  t.true(ScummVMGamePackage.isValid('tests/fixtures/games/Larry3', shell), 'Not a valid gog scummvm installation file');
  t.true(ScummVMGamePackage.isValid('tests/fixtures/games/Larry2', shell), 'Not a valid gog scummvm installation file');
});
