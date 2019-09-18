/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');

const extractorTypes = require('../../src/extractor/extractorTypes');
const logger = require('../../src/logging/Logger');
const WineExtractor = require('../../src/extractor/WineExtractor');

const ExtractorFactory = require('../../src/extractor/ExtractorFactory');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);

  t.context.factory = new ExtractorFactory(t.context.logger, '/tmp/testName', shell);
});

test('Create a Wine extractor should return a new Wine extractor instance', (t) => {
  const { factory } = t.context;

  const result = factory.createExtractor(extractorTypes.WINE);

  t.true(result instanceof WineExtractor);
});

test('Create a extractor of an unsupported type should throw an error', (t) => {
  const { factory } = t.context;

  t.throws(() => {
    factory.createExtractor('unknown');
  }, Error);
});
