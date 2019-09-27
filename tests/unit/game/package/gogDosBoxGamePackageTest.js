/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const GOGDosBoxGamePackage = require('../../../../src/game/package/GOGDosBoxGamePackage');

test.beforeEach((t) => {
  t.context.cli = sinon.stub({
    find() {}
  });
});

test('IsValid should return false when given file is not a GOG DosBox installation file', (t) => {
  const { cli } = t.context;

  cli.find.returns([]);

  const result = GOGDosBoxGamePackage.isValid('.test/not-gog-installation', cli);

  t.false(result);
});

test('IsValid should return true when given file is a GOG DosBox installation file', (t) => {
  const { cli } = t.context;

  cli.find.returns(['Found']);

  const result = GOGDosBoxGamePackage.isValid('.test/gog-dosbox-installation', cli);

  t.true(result);
});
