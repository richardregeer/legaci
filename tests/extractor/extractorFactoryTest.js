'use strict';

const test = require('ava');
const sinon = require('sinon');
const shell = require('shelljs');

const extractorTypes = require('../../src/extractor/extractorTypes');
const LoggingEvents = require('../../src/logging/LoggingEvents');
const WineExtractor = require('../../src/extractor/WineExtractor');

const ExtractorFactory = require('../../src/extractor/ExtractorFactory');

test.beforeEach((t) => {
  t.context.loggingEvents = sinon.createStubInstance(LoggingEvents);

  t.context.factory = new ExtractorFactory(t.context.loggingEvents, '/tmp/testName', shell);
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
