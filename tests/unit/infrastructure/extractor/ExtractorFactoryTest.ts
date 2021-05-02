import { DirectoryExtractor } from './../../../../src/infrastructure/extractor/DirectoryExtractor';
import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { ExtractorFactoryInterface } from '../../../../src/core/extractor/ExtractorFactoryInterface';
import { CommandInterface } from '../../../../src/core/command/CommandInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { ExtractorFactory } from '../../../../src/infrastructure/extractor/ExtractorFactory';
import { FileType } from '../../../../src/core/file/FileType';
import { InnoExtractExtractor } from '../../../../src/infrastructure/extractor/InnoExtractExtractor';
import { ZipExtractor } from '../../../../src/infrastructure/extractor/ZipExtractor';
import { UnknownFileTypeError } from '../../../../src/core/error/UnkownFileTypeError';

interface Context {
  sut: ExtractorFactoryInterface;
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

  t.context.sut = new ExtractorFactory(t.context.fileHandlerStub, t.context.loggerStub, t.context.commandStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should create an InnoExtract extractor instance when the file type is exe', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.resolveFileTypeSync.returns(FileType.EXE);

  const result = sut.create('source');

  assert.instanceOf(result, InnoExtractExtractor);
});

test('should create a Zip extractor instance when the file type is a zip', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.resolveFileTypeSync.returns(FileType.ZIP);

  const result = sut.create('source');

  assert.instanceOf(result, ZipExtractor);
});

test('should create a Directory extractor instance when the file type is a directory', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.resolveFileTypeSync.returns(FileType.DIRECTORY);

  const result = sut.create('source');

  assert.instanceOf(result, DirectoryExtractor);
});

test('should create a Zip extractor instance when the file type is a GOG sh file', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.resolveFileTypeSync.returns(FileType.SH);
  fileHandlerStub.readFileHeaderSync.returns(`
  #!/bin/sh
  # 
  # This is an executable installer
  # and it has to be run like any other executable file:
  # 
  # Add executable permissions with:
  # chmod +x installer-file.sh
  # 
  # Then run it like this:
  # ./installer-file.sh
  # 
  # This script was generated using Makeself 2.2.0
  # with modifications for mojosetup and GOG.com installer.`);

  const result = sut.create('source');

  assert.instanceOf(result, ZipExtractor);
});

test('Should throw an UnknownFileTypeError when the given filetype is not supported', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.resolveFileTypeSync.returns(FileType.SH);
  fileHandlerStub.readFileHeaderSync.returns('A shell script file');

  await t.throwsAsync(async () => sut.create('source'), {
    instanceOf: UnknownFileTypeError,
  });
});
