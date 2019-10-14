/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const GameRunner = require('../../../src/runner/GameRunner');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);

  t.context.runner = new GameRunner(t.context.fileHandler, t.context.logger);
});

test('Create bin file should throw an Error', (t) => {
  const { runner } = t.context;

  t.throws(() => {
    runner.createBinFile('/installed/game');
  }, Error);
});
