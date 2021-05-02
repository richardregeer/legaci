import { DirectoryExtractor } from './../../../../src/infrastructure/extractor/DirectoryExtractor';
import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { CommandInterface } from '../../../../src/core/command/CommandInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
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

  t.context.fileHandlerStub.resolveFileName.returns('testName');
  t.context.fileHandlerStub.existsSync.returns(true);

  t.context.sut = new DirectoryExtractor(t.context.fileHandlerStub, t.context.loggerStub, t.context.commandStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should copy the directory to the given source directory', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  await sut.extract('source', 'destination');

  assert.isTrue(fileHandlerStub.copyFilesSync.called);
});

test('Should re-throw the error when coppying the directory failed', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub, loggerStub } = t.context;

  fileHandlerStub.copyFilesSync.throws(new Error('test'));

  await t.throwsAsync(async () => sut.extract('source', 'destination'), {
    instanceOf: Error,
  });

  assert.isTrue(loggerStub.error.called);
});

test('Should throw an FileDoesNotExistsError when the given source directory does not exist', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.existsSync.returns(false);

  await t.throwsAsync(async () => sut.extract('source', 'destination'), {
    instanceOf: FileDoesNotExistsError,
  });
});
