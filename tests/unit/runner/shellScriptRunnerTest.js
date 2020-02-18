/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../src/logging/Logger');
const ShellScriptRunner = require('../../../src/runner/ShellScriptRunner');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.cli = sinon.stub({
    exec() {},
    test() {},
    chmod() {},
    config: {
      silince: false
    }
  });

  t.context.cli.test.returns(true);

  t.context.runner = new ShellScriptRunner(t.context.logger, t.context.cli);
});

test('Run the shell script file should throw an Error when the given game path does not exist', (t) => {
  const { runner, cli } = t.context;

  cli.test.returns(false);

  t.throws(() => {
    runner.run('/game.sh');
  }, Error);
});

test('Run the shell script file should rethrow a Error when running the shell script file fails', (t) => {
  const { runner, cli } = t.context;

  cli.exec.throws(new Error());

  t.throws(() => {
    runner.run('/game.sh');
  }, Error);
});

test('Run the shell script file should executable the script', (t) => {
  const { runner, cli } = t.context;

  runner.run('/installed/game');

  t.true(cli.exec.called);
  t.true(cli.chmod.called);
});
