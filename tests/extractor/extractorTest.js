/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const logger = require('../../src/logging/Logger');
const Extractor = require('../../src/extractor/Extractor');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);
  t.context.cli = sinon.stub({
    test() {},
    mkdir() {}
  });

  t.context.extractor = new Extractor(t.context.logger, '/test', t.context.cli);
});

test('Extract should throw an Error', (t) => {
  const { extractor } = t.context;

  t.throws(() => {
    extractor.extract('/source.exe', '/destination');
  }, Error);
});

test('GetTempFolder should return a writable directory', (t) => {
  const { extractor, cli } = t.context;

  cli.test.returns(false);

  const result = extractor.getTempFolder();

  t.is(cli.mkdir.firstCall.lastArg, result);
  t.not(result, undefined);
});
