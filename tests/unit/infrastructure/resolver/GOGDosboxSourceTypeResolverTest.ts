import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { SourceTypeResolverInterface } from '../../../../src/core/resolver/SourceTypeResolverInterface';
import { GOGDosboxSourceTypeResolver } from '../../../../src/infrastructure/resolver/GOGDosboxSourceTypeResolver';
import { SourceType } from '../../../../src/core/entity/SourceType';

interface Context {
  sut: SourceTypeResolverInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.fileHandlerStub.existsSync.returns(true);

  t.context.sut = new GOGDosboxSourceTypeResolver(t.context.fileHandlerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('getSourceType should return GOG Dosbox', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.getSourceType();

  assert.equal(result, SourceType.GOG_DOSBOX);
});

test('isSourceType should return true when source is a GOG Dosbox package', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.findFilesSync.returns(['1', '2']);

  const result = sut.isSourceType('source');

  assert.isTrue(result);
});

test('isSourceType should return false when source is a not a GOG Dosbox package', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.findFilesSync.returns([]);

  const result = sut.isSourceType('source');

  assert.isFalse(result);
});
