import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { GameFilesInstallerInterface } from '../../../../src/core/installer/GameFilesInstallerInterface';
import { GameFilesInstaller } from '../../../../src/infrastructure/installer/GameFilesInstaller';
import { GameFile } from '../../../../src/core/entity/GameFile';

interface Context {
  sut: GameFilesInstallerInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
  loggerStub: StubbedInstance<LoggerInterface>;
  gameConfigStub: StubbedInstance<GameConfiguration>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.gameConfigStub = stubInterface<GameConfiguration>();
  t.context.gameConfigStub.gameFiles = [new GameFile('test', 'location')];

  t.context.sut = new GameFilesInstaller(t.context.fileHandlerStub, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Install should install all the game files from the legaci configuration', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;

  await sut.install(gameConfigStub, 'destination');

  assert.isTrue(fileHandlerStub.copySync.called);
});

test('Install should not install files if no files in the legaci configuration', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, fileHandlerStub } = t.context;
  t.context.gameConfigStub.gameFiles = [];

  await sut.install(gameConfigStub, 'destination');

  assert.isFalse(fileHandlerStub.copySync.calledOnce);
});
