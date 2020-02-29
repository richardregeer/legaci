/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const DosBoxGameRunner = require('../../../src/runner/DosBoxGameRunner');
const ScummVMGameRunner = require('../../../src/runner/ScummVMGameRunner');
const GameRunnerFactory = require('../../../src/runner/GameRunnerFactory');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.cli = sinon.stub({});

  t.context.factory = new GameRunnerFactory(t.context.logger, t.context.fileHandler, t.context.cli);
});

test('Create ScummVMGameRunner should return a new ScummVMGameRunner instance', (t) => {
  const { factory } = t.context;

  const result = factory.createScummVMGameRunner();

  t.true(result instanceof ScummVMGameRunner);
});

test('Create DosBoxGameRunner should return a new DosBoxGameRunner instance', (t) => {
  const { factory } = t.context;

  const result = factory.createDosBoxGameRunner();

  t.true(result instanceof DosBoxGameRunner);
});
