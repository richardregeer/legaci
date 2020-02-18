/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const GOGDosBoxGamePackage = require('../../../../src/game/package/GOGDosBoxGamePackage');

test('IsValid should return false when given file is not a GOG DosBox installation file', (t) => {
  const result = GOGDosBoxGamePackage.isValid('tests/games/notValidGOGDosBox', shell);

  t.false(result);
});

test('IsValid should return true when given file is a GOG DosBox installation file', (t) => {
  t.true(GOGDosBoxGamePackage.isValid('tests/fixtures/games/Tyrian', shell), 'tests/fixtures/games/Tyrian is not a valid gog dosbox installation file');
  t.true(GOGDosBoxGamePackage.isValid('tests/fixtures/games/Biomenance', shell), 'tests/fixtures/games/Biomenance is not a valid gog dosbox installation file');
});
