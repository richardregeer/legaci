import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { InstallGameUseCase } from '../../../../src/core/useCase/InstallGameUseCase';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { CLICommandFactory } from '../../../../src/infrastructure/cliController/CLICommandFactory';
import { InstallGameController } from '../../../../src/infrastructure/cliController/InstallGameController';

interface Context {
  sut: CLICommandFactory;
  sandbox: sinon.SinonSandbox;
  installGameUseCase: StubbedInstance<InstallGameUseCase>;
  loggerStub: StubbedInstance<LoggerInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.installGameUseCase = stubInterface<InstallGameUseCase>();
  t.context.loggerStub = stubInterface<LoggerInterface>();

  t.context.sut = new CLICommandFactory(t.context.installGameUseCase, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('create new install controller instance', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.createInstallController();

  assert.instanceOf(result, InstallGameController);
});
