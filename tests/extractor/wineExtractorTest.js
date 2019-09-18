/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');
const fs = require('fs');

const logger = require('../../src/logging/Logger');
const WineExtractor = require('../../src/extractor/WineExtractor');

test.beforeEach((t) => {
  sinon.reset();
  t.context.logger = sinon.createStubInstance(logger);
  t.context.cli = sinon.stub({
    mv() {},
    rm() {},
    exec() {}
  });

  t.context.extractor = new WineExtractor(t.context.logger, '.test/tmp', t.context.cli);
});

test.before(() => {
  shell.mkdir('-p', '.test/wine-extractor');
  shell.touch('.test/wine-extractor/install.exe');
});

test.after(() => {
  shell.rm('-rf', '.test/tmp');
  shell.rm('-rf', '.test/wine-extractor');
});

test('Extract should throw an Error if the file to extract does not exist', (t) => {
  const { extractor } = t.context;

  t.throws(() => {
    extractor.extract('/source.exe', '/destination');
  }, Error);
});

test('Extract should create the destination directory if it does not exist', (t) => {
  const { extractor } = t.context;

  extractor.extract('.test/wine-extractor/install.exe', '.test/wine-extractor/destination');

  t.true(fs.existsSync('.test/wine-extractor/destination'));
});

test('Extract should move extracted files to given destination', (t) => {
  const { extractor, cli } = t.context;

  extractor.extract('.test/wine-extractor/install.exe', '.test/wine-extractor/destination');

  t.true(cli.exec.called);
  t.true(cli.mv.called);
});

test('Extract should cleanup temp directory after files are extracted', (t) => {
  const { extractor, cli } = t.context;

  extractor.extract('.test/wine-extractor/install.exe', '.test/wine-extractor/destination');

  t.true(cli.rm.called);
});
