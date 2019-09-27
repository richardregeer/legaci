/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const GOGGamePackage = require('../../../../src/game/package/GOGGamePackage');

test.beforeEach((t) => {
  t.context.cli = sinon.stub({
    find() {}
  });
});

test('IsValid should return false when given file is not a GOG installation file', (t) => {
  const { cli } = t.context;

  cli.find.returns([]);

  const result = GOGGamePackage.isValid('.test/not-gog-installation', cli);

  t.false(result);
});

test('IsValid should return true when given file is a GOG installation file', (t) => {
  const { cli } = t.context;

  cli.find.returns(['DosBoxFile']);

  const result = GOGGamePackage.isValid('.test/gog-installation', cli);

  t.true(result);
});
