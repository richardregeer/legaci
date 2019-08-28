'use strict';

const test = require('ava');
const shell = require('shelljs');

const GOGGamePackage = require('../../../src/game/package/GOGGamePackage');

test.before(() => {
  shell.mkdir('-p', '.test/gog-installation');
  shell.mkdir('-p', '.test/not-gog-installation');
  shell.touch('.test/gog-installation/goggame-43465483.info');
});

test.after(() => {
  shell.rm('-rf', '.test/gog-installation');
  shell.rm('-rf', '.test/not-gog-installation');
});

test('IsValid should return false when given file is not a GOG installation file', (t) => {
  const result = GOGGamePackage.isValid('.test/not-gog-installation');

  t.false(result);
});

test('IsValid should return true when given file is a GOG installation file', (t) => {
  const result = GOGGamePackage.isValid('.test/gog-installation');

  t.true(result);
});
