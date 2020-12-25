import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { CommandInterface } from '../../../../src/core/command/CommandInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { ExtractorInterface } from '../../../../src/core/extractor/ExtractorInterface';
import { FileDoesNotExistsError } from '../../../../src/core/error/FileDoesNotExistsError';
import { ZipExtractor } from '../../../../src/infrastructure/extractor/ZipExtractor';

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
  t.context.fileHandlerStub.existsSync.returns(false).onSecondCall();

  t.context.sut = new ZipExtractor(t.context.fileHandlerStub, t.context.loggerStub, t.context.commandStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should use ZipExtractor to extract the given source file', async (t: ExecutionContext<Context>) => {
  const { sut, commandStub, fileHandlerStub } = t.context;

  await sut.extract('source', 'destination');

  assert.isTrue(commandStub.execute.calledOnce);
  assert.isTrue(fileHandlerStub.copyFilesSync.notCalled);
});

test('Should copy source folder name to destination root if found', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.existsSync.returns(true).onSecondCall();

  await sut.extract('source', 'destination');

  assert.isTrue(fileHandlerStub.copyFilesSync.calledOnce);
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
