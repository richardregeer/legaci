'use strict';

const test = require('ava');
const shell = require('shelljs');

const GOGDosBoxGamePackage = require('../../../src/game/package/GOGDosBoxGamePackage');

test.before(() => {
  shell.mkdir('-p', '.test/gog-dosbox-installation/DOSBOX');
  shell.mkdir('-p', '.test/not-gog-installation');
});

test.after(() => {
  shell.rm('-rf', '.test/gog-dosbox-installation');
  shell.rm('-rf', '.test/not-gog-installation');
});

test('IsValid should return false when given file is not a GOG DosBox installation file', (t) => {
  const result = GOGDosBoxGamePackage.isValid('.test/not-gog-installation');

  t.false(result);
});

test('IsValid should return true when given file is a GOG DosBox installation file', (t) => {
  const result = GOGDosBoxGamePackage.isValid('.test/gog-dosbox-installation');

  t.true(result);
});
