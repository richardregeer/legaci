import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import chalk from 'chalk';
import { WinstonLogger } from '../../../../src/infrastructure/observability/WinstonLogger';
import { Logger } from 'winston';

interface Context {
  sut: WinstonLogger;
  sandbox: sinon.SinonSandbox;
  loggerStub: StubbedInstance<Logger>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.loggerStub = stubInterface<Logger>();

  t.context.sut = new WinstonLogger(t.context.loggerStub, chalk, true);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('debug should log a debug message', async (t: ExecutionContext<Context>) => {
  const { sut, loggerStub } = t.context;

  sut.debug('debug');

  assert.isTrue(loggerStub.debug.called);
});

test('info should log an information message', async (t: ExecutionContext<Context>) => {
  const { sut, loggerStub } = t.context;

  sut.info('info');

  assert.isTrue(loggerStub.info.called);
});

test('warning should log a warning message', async (t: ExecutionContext<Context>) => {
  const { sut, loggerStub } = t.context;

  sut.warning('warning');

  assert.isTrue(loggerStub.warn.called);
});

test('error should log an error message with stack trace', async (t: ExecutionContext<Context>) => {
  const { sut, loggerStub } = t.context;

  sut.error('error', new Error());

  assert.isTrue(loggerStub.error.calledTwice);
});

test('error should log an error message without a stack trace', async (t: ExecutionContext<Context>) => {
  const sut = new WinstonLogger(t.context.loggerStub, chalk, true);
  const { loggerStub } = t.context;

  sut.error('error', new Error());

  assert.isTrue(loggerStub.error.calledOnce);
});
