import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import { GameResolverService } from '../../../../src/core/resolver/GameResolverService';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { InstallGameUseCase } from '../../../../src/core/useCase/InstallGameUseCase';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { ExtractorFactoryInterface } from '../../../../src/core/extractor/ExtractorFactoryInterface';
import { GameRunnerSetupFactoryInterface } from '../../../../src/core/installer/GameRunnerSetupFactoryInterface';
import { GameFilesInstallerInterface } from '../../../../src/core/installer/GameFilesInstallerInterface';
import { ExtractorInterface } from '../../../../src/core/extractor/ExtractorInterface';
import { GameRunnerSetupInterface } from '../../../../src/core/installer/GameRunnerSetupInterface';
import { Game } from '../../../../src/core/entity/Game';

interface Context {
  sut: InstallGameUseCase;
  sandbox: sinon.SinonSandbox;
  gameRunnerSetupFactoryStub: StubbedInstance<GameRunnerSetupFactoryInterface>;
  extractorFactoryStub: StubbedInstance<ExtractorFactoryInterface>;
  gameFilesInstallerStub: StubbedInstance<GameFilesInstallerInterface>;
  gameResolverServiceStub: StubbedInstance<GameResolverService>;
  loggerStub: StubbedInstance<LoggerInterface>;
  extractorStub: StubbedInstance<ExtractorInterface>;
  gameRunnerStub: StubbedInstance<GameRunnerSetupInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.gameRunnerSetupFactoryStub = stubInterface<GameRunnerSetupFactoryInterface>();
  t.context.extractorFactoryStub = stubInterface<ExtractorFactoryInterface>();
  t.context.gameFilesInstallerStub = stubInterface<GameFilesInstallerInterface>();
  t.context.gameResolverServiceStub = stubInterface<GameResolverService>();
  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.extractorStub = stubInterface<ExtractorInterface>();
  t.context.gameRunnerStub = stubInterface<GameRunnerSetupInterface>();

  t.context.extractorFactoryStub.create.returns(t.context.extractorStub);
  t.context.gameRunnerSetupFactoryStub.create.returns(t.context.gameRunnerStub);
  t.context.gameRunnerStub.install.resolves(new Game('test', 'path', 'binPath', new GameConfiguration('test')));

  t.context.sut = new InstallGameUseCase(
    t.context.gameRunnerSetupFactoryStub,
    t.context.loggerStub,
    t.context.extractorFactoryStub,
    t.context.gameFilesInstallerStub,
    t.context.gameResolverServiceStub
  );
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('game file should be extracted and installed to the given destination', async (t: ExecutionContext<Context>) => {
  const { sut, extractorStub, gameResolverServiceStub, gameRunnerStub, gameFilesInstallerStub } = t.context;

  const result = await sut.installGame('source', 'destination');

  assert.isTrue(extractorStub.extract.calledOnce);
  assert.isTrue(gameResolverServiceStub.determineSourceType.calledOnce);
  assert.isTrue(gameResolverServiceStub.resolveGameConfiguration.calledOnce);
  assert.isTrue(gameRunnerStub.install.calledOnce);
  assert.isTrue(gameFilesInstallerStub.install.calledOnce);

  assert.equal(result.name, 'test');
});
