import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { CommandInterface } from '../../../../src/core/command/CommandInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { InnoExtractExtractor } from '../../../../src/infrastructure/extractor/InnoExtractExtractor';
import { ExtractorInterface } from '../../../../src/core/extractor/ExtractorInterface';
import { FileDoesNotExistsError } from '../../../../src/core/error/FileDoesNotExistsError';

interface Context {
  sut: ExtractorInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
  commandStub: StubbedInstance<CommandInterface>;
  loggerStub: StubbedInstance<LoggerInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.commandStub = stubInterface<CommandInterface>();
  t.context.loggerStub = stubInterface<LoggerInterface>();

  t.context.fileHandlerStub.existsSync.returns(true);

  t.context.sut = new InnoExtractExtractor(t.context.fileHandlerStub, t.context.loggerStub, t.context.commandStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should use InnoExtract to extract the given source file', async (t: ExecutionContext<Context>) => {
  const { sut, commandStub } = t.context;

  await sut.extract('source', 'destination');

  assert.isTrue(commandStub.execute.calledOnce);
});

test('Should re-throw the error when extracting the file failed', async (t: ExecutionContext<Context>) => {
  const { sut, commandStub, loggerStub } = t.context;

  commandStub.execute.throws(new Error('test'));

  await t.throwsAsync(async () => sut.extract('source', 'destination'), {
    instanceOf: Error,
  });

  assert.isTrue(loggerStub.error.calledOnce);
});

test('Should throw an FileDoesNotExistsError when the given source file does not exist', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.existsSync.returns(false);

  await t.throwsAsync(async () => sut.extract('source', 'destination'), {
    instanceOf: FileDoesNotExistsError,
  });
});
