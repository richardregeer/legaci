/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');
const sinon = require('sinon');

shell.silent = true;

const Logger = require('../../../src/logging/Logger');
const ScummVMGameRunner = require('../../../src/runner/ScummVMGameRunner');
const FileHandler = require('../../../src/core/file/FileHandler');
const Template = require('../../../src/core/file/Template');

const TEST_PATH = '.test/scummVMGameRunnerTest';

test.before((t) => {
  t.context.fileHandler = new FileHandler();
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.template = new Template(
    'etc/bin/scummvm.bin.template.sh',
    t.context.fileHandler,
    t.context.logger
  );

  t.context.runner = new ScummVMGameRunner(
    t.context.fileHandler,
    t.context.logger,
    shell
  );
  shell.mkdir('-p', TEST_PATH);
});

test.after(() => {
  shell.rm('-rf', shell.pwd() + '/' + TEST_PATH);
});

test('Create bin file for should create a executable shell file', (t) => {
  const { runner, fileHandler, template } = t.context;

  runner.createBinFile(TEST_PATH, template);

  t.true(shell.test('-e', shell.pwd() + `/${TEST_PATH}/legaci-run.sh`), `ScummVM bin file is is not found on path ${TEST_PATH}`);

  const binFile = fileHandler.readFileSync(shell.pwd() + `/${TEST_PATH}/legaci-run.sh`);

  t.true(binFile.indexOf('/legaci-run.sh') > 0, 'ScummVM run configuration is not found');
});
