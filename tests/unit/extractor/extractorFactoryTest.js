/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const fileTypes = require('../../../src/core/file/fileTypes');
const extractorTypes = require('../../../src/extractor/extractorTypes');
const ExtractorFactory = require('../../../src/extractor/ExtractorFactory');
const InnoExtractExtractor = require('../../../src/extractor/InnoExtractExtractor');
const ZipExtractor = require('../../../src/extractor/ZipExtractor');
const WineExtractor = require('../../../src/extractor/WineExtractor');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.cli = sinon.stub({});

  t.context.factory = new ExtractorFactory(t.context.logger, '/tmp', t.context.cli);
});

test('Create extractor by exe filetype should return a new InnoExtract extractor instance', (t) => {
  const { factory } = t.context;

  const result = factory.createByFileType(fileTypes.EXE);

  t.true(result instanceof InnoExtractExtractor);
});

test('Create extractor by InnoExtract extractor type should return an Innoextract instance', (t) => {
  const { factory } = t.context;

  const result = factory.createByExtractorType(extractorTypes.INNOEXTRACT);

  t.true(result instanceof InnoExtractExtractor);
});

test('Create extractor by zip filetype should a new ZipExtractor instance', (t) => {
  const { factory } = t.context;

  const result = factory.createByFileType(fileTypes.ZIP);

  t.true(result instanceof ZipExtractor);
});

test('Create extractor by ZipExtractor type should return a ZipExtractor instance', (t) => {
  const { factory } = t.context;

  const result = factory.createByExtractorType(extractorTypes.UNZIP);

  t.true(result instanceof ZipExtractor);
});

test('Create extractor by sh filetype should throw an error', (t) => {
  const { factory } = t.context;

  t.throws(() => {
    factory.createByFileType(fileTypes.SH);
  }, Error);
});

test('Create extractor by WineExtractor type should return a WineExtractor instance', (t) => {
  const { factory } = t.context;

  const result = factory.createByExtractorType(extractorTypes.WINE);

  t.true(result instanceof WineExtractor);
});

test('Create extractor by an unknown type should throw an error', (t) => {
  const { factory } = t.context;

  t.throws(() => {
    factory.createByExtractorType(extractorTypes.UNKNOWN);
  }, Error);
});
