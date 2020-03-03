/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const FileHandler = require('../../../../src/core/file/FileHandler');
const ConfigurationFactory = require('../../../../src/configuration/ConfigurationFactory');
const TemplateFactory = require('../../../../src/core/file/TemplateFactory');
const Template = require('../../../../src/core/file/Template');
const ScummVMGameRunner = require('../../../../src/runner/ScummVMGameRunner');
const ScummVMInstaller = require('../../../../src/game/installer/ScummVmInstaller');

test.beforeEach((t) => {
  t.context.fileHandler = sinon.createStubInstance(FileHandler);
  t.context.configurationFactory = sinon.createStubInstance(ConfigurationFactory);
  t.context.templateFactory = sinon.createStubInstance(TemplateFactory);
  t.context.template = sinon.createStubInstance(Template);
  t.context.templateFactory.createTemplate.returns(t.context.template);

  t.context.gameRunner = sinon.createStubInstance(ScummVMGameRunner);

  t.context.cli = sinon.stub({
    cat() {},
    grep() {},
    find() {}
  });
  t.context.cli.cat.returns(t.context.cli);
  t.context.cli.grep.returns('gameid=test');
  t.context.cli.find.returns(['some/path/test.ini']);

  t.context.gameInstaller = new ScummVMInstaller(
    t.context.configurationFactory,
    t.context.fileHandler,
    t.context.templateFactory,
    t.context.gameRunner,
    t.context.cli
  );
});

test('Install should throw an error when node ScummVM gameid is found', (t) => {
  const { gameInstaller, cli } = t.context;

  cli.cat.returns(cli);
  cli.grep.returns('');

  t.throws(() => {
    gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');
  }, Error, 'Missing gameid from GOG ScummVM installation.');
});

test('Install should throw an error when no ScummVM ini file is found', (t) => {
  const { gameInstaller, cli } = t.context;

  cli.find.returns([]);

  t.throws(() => {
    gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');
  }, Error, 'Missing configuration ini file from ScummVM GOG installation.');
});

test('GOG ScummVM installer should install ScummVM configuration files.', (t) => {
  const {
    gameInstaller,
    gameRunner
  } = t.context;

  gameInstaller.install('/tmp/test-game.exe', '/tmp/test-game');

  t.true(gameRunner.createBinFile.calledOnce);
});
