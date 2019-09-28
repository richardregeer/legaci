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
  const result = GOGDosBoxGamePackage.isValid('tests/fixtures/games/Tyrian', shell);

  t.true(result);
});
