import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { TemplateInterface } from '../../../../src/core/file/TemplateInterface';
import { ScummVMInstaller } from '../../../../src/infrastructure/installer/ScummVMInstaller';
import { GameRunnerSetupInterface } from '../../../../src/core/installer/GameRunnerSetupInterface';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { Runner } from '../../../../src/core/entity/Runner';
import { ApplicationRunner } from '../../../../src/core/entity/ApplicationRunner';
import { Game } from '../../../../src/core/entity/Game';

interface Context {
  sut: GameRunnerSetupInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
  templateStub: StubbedInstance<TemplateInterface>;
  loggerStub: StubbedInstance<LoggerInterface>;
  gameConfigStub: StubbedInstance<GameConfiguration>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.templateStub = stubInterface<TemplateInterface>();
  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.gameConfigStub = stubInterface<GameConfiguration>();

  const runner = new Runner(ApplicationRunner.SCUMMVM, '1', '/test/path/source', 'test/path/config', 'test/path/bin', 'game');
  t.context.gameConfigStub.findByApplicationRunner.returns(runner);
  t.context.templateStub.load.returns('test_content');
  t.context.templateStub.replaceVariable.returns('test_content');
  t.context.gameConfigStub.name = 'game';

  t.context.sut = new ScummVMInstaller(t.context.templateStub, t.context.fileHandlerStub, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Install should install the given game', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub } = t.context;
  const expectedGame = new Game('game', 'destination', 'destination/legaci-run.sh', gameConfigStub);

  const result = await sut.install(gameConfigStub, 'destination');

  assert.deepEqual(result, expectedGame);
});

test('GenerateConfiguration should copy the ScummVM to the installation destination', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, loggerStub, fileHandlerStub } = t.context;
  const expectedPath = 'destination/scummvm.legaci.ini';

  await sut.generateConfiguration(gameConfigStub, 'destination');

  assert.isTrue(loggerStub.warning.notCalled);
  assert.isTrue(fileHandlerStub.copySync.calledOnceWith('test/path/config', expectedPath));
});

test('GenerateConfiguration should warn when the default configuration is copied', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, loggerStub } = t.context;

  const runner = new Runner(ApplicationRunner.SCUMMVM, '1', '/test/path/source', 'test/path/config.template.', 'test/path/bin', 'game');
  gameConfigStub.findByApplicationRunner.returns(runner);

  await sut.generateConfiguration(gameConfigStub, 'destination');

  assert.isTrue(loggerStub.warning.calledOnce);
});

test('GenerateRunner should generate an executable file to launch the game', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, loggerStub, templateStub, fileHandlerStub } = t.context;
  const expectedDestination = 'destination/legaci-run.sh';

  const result = await sut.generateRunner(gameConfigStub, 'destination');

  assert.strictEqual(result, expectedDestination);
  assert.isTrue(loggerStub.warning.notCalled);
  assert.isTrue(templateStub.replaceVariable.calledOnceWith('SCUMMVM_GAME_ID', 'game', 'test_content'));
  assert.isTrue(templateStub.save.calledOnceWith(expectedDestination, 'test_content'));
  assert.isTrue(fileHandlerStub.makeFileExecutabeSync.calledOnceWith(expectedDestination));
});

test('GenerateRunner should warn when a default executable file to launch the game is used ', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, loggerStub } = t.context;

  const runner = new Runner(ApplicationRunner.SCUMMVM, '1', '/test/path/source', 'test/path/config', 'test/path/bin.template.', 'game');
  gameConfigStub.findByApplicationRunner.returns(runner);

  await sut.generateRunner(gameConfigStub, 'destination');

  assert.isTrue(loggerStub.warning.calledOnce);
});
