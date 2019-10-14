/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const FileHandler = require('../../../src/core/file/FileHandler');
const DosBoxGameRunner = require('../../../src/runner/DosBoxGameRunner');
const Template = require('../../../src/core/file/Template');

test.beforeEach((t) => {
  t.context.template = sinon.createStubInstance(Template);
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.cli = sinon.stub({
    test() {},
    chmod() {}
  });

  t.context.cli.test.returns(true);
  t.context.template.load.returns('template-body-test');

  t.context.runner = new DosBoxGameRunner(t.context.fileHandler, t.context.logger, t.context.cli);
});

test('Create bin file should throw an Error when the given game path does not exist', (t) => {
  const { runner, cli } = t.context;

  cli.test.returns(false);

  t.throws(() => {
    runner.createBinFile('/installed/game');
  }, Error);
});

test('Create bin file should rethrow a Error when creating the bin file fails', (t) => {
  const { runner, template } = t.context;

  template.load.throws(new Error());

  t.throws(() => {
    runner.createBinFile('/installed/game', template);
  }, Error);
});

test('Create bin file should create a new executable bin file to run the dosbox game', (t) => {
  const { runner, template, cli } = t.context;

  runner.createBinFile('/installed/game', template);

  t.true(template.load.called);
  t.true(template.save.called);
  t.true(cli.chmod.called);
});
