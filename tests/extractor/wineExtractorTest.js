/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const logger = require('../../src/logging/Logger');
const WineExtractor = require('../../src/extractor/WineExtractor');

test.beforeEach((t) => {
  sinon.reset();
  t.context.logger = sinon.createStubInstance(logger);
  t.context.cli = sinon.stub({
    mv() {},
    rm() {},
    exec() {},
    test() {},
    mkdir() {}
  });

  t.context.extractor = new WineExtractor(t.context.logger, '.test/tmp', t.context.cli);
});

test('Extract should throw an Error if the file to extract does not exist', (t) => {
  const { extractor, cli } = t.context;

  cli.test.returns(false);

  t.throws(() => {
    extractor.extract('/source.exe', '/destination');
  }, Error);
});

test('Extract should create the destination directory if it does not exist', (t) => {
  const { extractor, cli } = t.context;

  cli.test.onFirstCall().returns(true);
  cli.test.onSecondCall().returns(false);
  const expectedDestination = '.test/destination';

  extractor.extract('.test/install.exe', expectedDestination);

  t.is(cli.mkdir.firstCall.lastArg, '.test/destination');
});

test('Extract should move extracted files to given destination', (t) => {
  const { extractor, cli } = t.context;

  t.context.cli.test.returns(true);

  extractor.extract('.test/install.exe', '.test/destination');

  t.true(cli.exec.called);
  t.true(cli.mv.called);
});

test('Extract should cleanup temp directory after files are extracted', (t) => {
  const { extractor, cli } = t.context;

  t.context.cli.test.returns(true);

  extractor.extract('.test/install.exe', '.test/destination');

  t.true(cli.rm.called);
});
