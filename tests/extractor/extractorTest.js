/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');
const fs = require('fs');

const logger = require('../../src/logging/Logger');
const Extractor = require('../../src/extractor/Extractor');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);

  t.context.extractor = new Extractor(t.context.logger, '.test/extractor', shell);
});

test.after(() => {
  shell.rm('-rf', '.test/extractor');
});

test('Extract should throw an Error', (t) => {
  const { extractor } = t.context;

  t.throws(() => {
    extractor.extract('/source.exe', '/destination');
  }, Error);
});

test('GetTempFolder should return a writable directory', (t) => {
  const { extractor } = t.context;

  const result = extractor.getTempFolder();

  t.true(fs.existsSync(result));
});

test('GetTempFolder should create the parent directories if it not exist', (t) => {
  const extractor = new Extractor(t.context.logger, '.test/extractor/parent/tmp', shell);

  const result = extractor.getTempFolder();

  t.true(fs.existsSync(result));
});
