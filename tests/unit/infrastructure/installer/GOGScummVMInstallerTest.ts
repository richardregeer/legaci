import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { TemplateInterface } from '../../../../src/core/file/TemplateInterface';
import { GameRunnerSetupInterface } from '../../../../src/core/installer/GameRunnerSetupInterface';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { Runner } from '../../../../src/core/entity/Runner';
import { ApplicationRunner } from '../../../../src/core/entity/ApplicationRunner';
import { Game } from '../../../../src/core/entity/Game';
import { GOGScummVMInstaller } from '../../../../src/infrastructure/installer/GOGScummVMInstaller';

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
  t.context.gameConfigStub.name = 'game';
  t.context.gameConfigStub.id = 'id';
  t.context.fileHandlerStub.findFilesSync.returns([]);

  t.context.sut = new GOGScummVMInstaller(t.context.templateStub, t.context.fileHandlerStub, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Install should install the given game', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;
  const expectedGame = new Game('game', 'destination', 'destination/legaci-run.sh', gameConfigStub);

  const result = await sut.install(gameConfigStub, 'destination');

  assert.isTrue(fileHandlerStub.copyFilesSync.firstCall.calledWith('destination/app/*'));
  assert.isTrue(fileHandlerStub.removeFilesSync.calledOnce);

  assert.deepEqual(result, expectedGame);
});

test('GenerateConfiguration should continue with default ScummVM configuration when no GOG configuration available', async (t: ExecutionContext<
  Context
>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;
  const expectedPath = 'destination/scummvm.legaci.ini';
  gameConfigStub.id = undefined;

  await sut.generateConfiguration(gameConfigStub, 'destination');

  assert.isFalse(fileHandlerStub.copySync.calledOnceWith('gog/config', expectedPath));
});

test('GenerateConfiguration should continue with default ScummVM configuration when legaci game configuration is available', async (t: ExecutionContext<
  Context
>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;
  const expectedPath = 'destination/scummvm.legaci.ini';

  await sut.generateConfiguration(gameConfigStub, 'destination');

  assert.isFalse(fileHandlerStub.copySync.calledOnceWith('gog/config', expectedPath));
});

test('GenerateConfiguration should copy GOG configuration when found', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;
  const expectedPath = 'destination/scummvm.legaci.ini';
  gameConfigStub.id = undefined;

  t.context.fileHandlerStub.findFilesSync.returns(['gog/config']);

  await sut.generateConfiguration(gameConfigStub, 'destination');

  assert.isTrue(fileHandlerStub.copySync.calledOnceWith('gog/config', expectedPath));
});
