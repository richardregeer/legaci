import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { InstallGameController } from '../../../../src/infrastructure/cliController/InstallGameController';
import { InstallGameUseCase } from '../../../../src/core/useCase/InstallGameUseCase';
import { Game } from '../../../../src/core/entity/Game';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { GameConfigurationNotFoundError } from '../../../../src/core/error/GameConfigurationNotFoundError';
import { UnsupportedApplicationRunnerError } from '../../../../src/core/error/UnsupportedApplicationRunnerError';
import { FileDoesNotExistsError } from '../../../../src/core/error/FileDoesNotExistsError';
import { UnknownFileTypeError } from '../../../../src/core/error/UnkownFileTypeError';

interface Context {
  sut: InstallGameController;
  sandbox: sinon.SinonSandbox;
  loggerStub: StubbedInstance<LoggerInterface>;
  installGameUseCaseStub: StubbedInstance<InstallGameUseCase>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.installGameUseCaseStub = stubInterface<InstallGameUseCase>();

  const game = new Game('test', 'installPath', 'binPath', new GameConfiguration('test'));
  t.context.installGameUseCaseStub.installGame.resolves(game);

  t.context.sut = new InstallGameController(t.context.installGameUseCaseStub, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should return the install game when installed successfully', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.strictEqual(result.name, 'test');
});

test('Should return null when installation failed', async (t: ExecutionContext<Context>) => {
  const { sut, installGameUseCaseStub } = t.context;

  installGameUseCaseStub.installGame.throws(new Error('some'));

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.isNull(result);
});

test('Should catch GameConfigurationNotFoundError add logging and return null', async (t: ExecutionContext<Context>) => {
  const { sut, installGameUseCaseStub, loggerStub } = t.context;

  installGameUseCaseStub.installGame.throws(new GameConfigurationNotFoundError('error'));

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.isTrue(loggerStub.error.called);
  assert.isNull(result);
});

test('Should catch UnsupportedApplicationRunnerError add logging and return null', async (t: ExecutionContext<Context>) => {
  const { sut, installGameUseCaseStub, loggerStub } = t.context;

  installGameUseCaseStub.installGame.throws(new UnsupportedApplicationRunnerError('error'));

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.isTrue(loggerStub.error.called);
  assert.isNull(result);
});

test('Should catch FileDoesNotExistsError add logging and return null', async (t: ExecutionContext<Context>) => {
  const { sut, installGameUseCaseStub, loggerStub } = t.context;

  installGameUseCaseStub.installGame.throws(new FileDoesNotExistsError('error'));

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.isTrue(loggerStub.error.called);
  assert.isNull(result);
});

test('Should catch UnknownFileTypeError add logging and return null', async (t: ExecutionContext<Context>) => {
  const { sut, installGameUseCaseStub, loggerStub } = t.context;

  installGameUseCaseStub.installGame.throws(new UnknownFileTypeError('error'));

  const result = await sut.handleInstallCommand('file', 'destination', 'gameId');

  assert.isTrue(loggerStub.error.called);
  assert.isNull(result);
});
