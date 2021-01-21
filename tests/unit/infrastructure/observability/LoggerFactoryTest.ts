import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon from 'ts-sinon';
import chalk from 'chalk';
import { LoggerFactory } from '../../../../src/infrastructure/observability/LoggerFactory';
import { WinstonLogger } from '../../../../src/infrastructure/observability/WinstonLogger';

interface Context {
  sut: LoggerFactory;
  sandbox: sinon.SinonSandbox;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.sut = new LoggerFactory(chalk);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('createLogger should create a new WinstonLogger instance', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.createLogger();

  assert.instanceOf(result, WinstonLogger);
});
