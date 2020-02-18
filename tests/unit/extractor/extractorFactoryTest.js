/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const fileTypes = require('../../../src/core/file/fileTypes');
const ExtractorFactory = require('../../../src/extractor/ExtractorFactory');
const InnoExtractExtractor = require('../../../src/extractor/InnoExtractExtractor');
const ZipExtractor = require('../../../src/extractor/ZipExtractor');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.cli = sinon.stub({});

  t.context.factory = new ExtractorFactory(t.context.logger, '/tmp', t.context.cli);
});

test('Create extractor should return a new InnoExtract extractor instance when file type is EXE', (t) => {
  const { factory } = t.context;

  const result = factory.createExtractor(fileTypes.EXE);

  t.true(result instanceof InnoExtractExtractor);
});

test('Create extractor should return a new Zip extractor instance when file type is ZIP', (t) => {
  const { factory } = t.context;

  const result = factory.createExtractor(fileTypes.ZIP);

  t.true(result instanceof ZipExtractor);
});
