/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

const GOGGamePackage = require('../../../../src/game/package/GOGGamePackage');

test('IsValid should return false when given file is not a GOG installation file', (t) => {
  const result = GOGGamePackage.isValid('tests/unknown', shell);

  t.false(result);
});

test('IsValid should return true when given file is a GOG installation file', (t) => {
  const result = GOGGamePackage.isValid('tests/fixtures/games/Tyrian', shell);

  t.true(result);
});
