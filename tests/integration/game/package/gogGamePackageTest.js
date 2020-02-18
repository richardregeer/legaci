/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const GOGGamePackage = require('../../../../src/game/package/GOGGamePackage');

test('IsValid should return false when given file is not a GOG installation file', (t) => {
  const result = GOGGamePackage.isValid('tests/games/notValidGOGDosBox', shell);

  t.false(result);
});

test('IsValid should return true when given file is a GOG installation file', (t) => {
  t.true(GOGGamePackage.isValid('tests/fixtures/games/Tyrian', shell), 'tests/fixtures/games/Tyrian is not a valid gog installation file');
  t.true(GOGGamePackage.isValid('tests/fixtures/games/Biomenance', shell), 'tests/fixtures/games/Biomenance is not a valid gog installation file');
});
