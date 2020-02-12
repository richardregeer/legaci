/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const Extractor = require('../../../src/extractor/InnoExtractExtractor');
const ExtractorFactory = require('../../../src/extractor/ExtractorFactory');
const FileTypeResolver = require('../../../src/core/file/FileTypeResolver');
const fileTypes = require('../../../src/core/file/fileTypes');
const GameExtractor = require('../../../src/game/GameExtractor');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);

  t.context.fileTypeResolver = sinon.createStubInstance(FileTypeResolver);
  t.context.fileTypeResolver.getFileType.returns(fileTypes.EXE);

  t.context.extractorFactory = sinon.createStubInstance(ExtractorFactory);
  t.context.extractor = sinon.createStubInstance(Extractor);
  t.context.extractorFactory.createExtractor
    .returns(t.context.extractor);

  t.context.gameExtractor = new GameExtractor(
    t.context.extractorFactory,
    t.context.fileTypeResolver,
    t.context.logger
  );
});

test('Extract should extract the given file with the extractor that match the file type.', (t) => {
  const {
    fileTypeResolver,
    extractorFactory,
    gameExtractor,
    extractor
  } = t.context;

  gameExtractor.extract('/tmp/test-game.exe', '/tmp/test-game');

  t.true(fileTypeResolver.getFileType.calledOnce);
  t.true(extractorFactory.createExtractor.calledOnce);
  t.true(extractor.extract.calledOnce);
});
