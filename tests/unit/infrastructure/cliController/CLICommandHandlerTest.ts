import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { CLICommandFactory } from '../../../../src/infrastructure/cliController/CLICommandFactory';
import { InstallGameController } from '../../../../src/infrastructure/cliController/InstallGameController';
import { CLICommandHandler } from '../../../../src/infrastructure/cliController/CLICommandHandler';

interface Context {
  sut: CLICommandHandler;
  sandbox: sinon.SinonSandbox;
  cliCommandFactory: StubbedInstance<CLICommandFactory>;
  loggerStub: StubbedInstance<LoggerInterface>;
  installGameController: StubbedInstance<InstallGameController>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.cliCommandFactory = stubInterface<CLICommandFactory>();
  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.installGameController = stubInterface<InstallGameController>();

  t.context.cliCommandFactory.createInstallController.returns(t.context.installGameController);

  t.context.sut = new CLICommandHandler(t.context.cliCommandFactory, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('handleCLICommand should execute the given install command', async (t: ExecutionContext<Context>) => {
  const { sut, installGameController } = t.context;

  await sut.handleCLICommand('file', 'destination', 'gameId');

  assert.isTrue(installGameController.handleInstallCommand.calledOnce);
});
