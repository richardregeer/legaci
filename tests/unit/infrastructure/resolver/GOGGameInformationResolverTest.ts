import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { GOGGameInformationResolver } from '../../../../src/infrastructure/resolver/GOGGameInformationResolver';

interface Context {
  sut: GOGGameInformationResolver;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.fileHandlerStub.existsSync.returns(true);

  t.context.sut = new GOGGameInformationResolver(t.context.fileHandlerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('getGameName should return GOG gameId', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.findFilesSync.returns(['test']);
  fileHandlerStub.readSync.returns('{"name": "Test"}');

  const result = sut.getGameName('destination');

  assert.equal(result, 'Test');
});

test('getGameName should return undefined when no GOG gameinfo file found', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.findFilesSync.returns([]);

  const result = sut.getGameName('destination');

  assert.isUndefined(result);
});

test('getGameName should return undefined when parsing the found GOG gameinfo file failed', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.findFilesSync.returns(['test']);
  fileHandlerStub.readSync.returns('');

  const result = sut.getGameName('destination');

  assert.isUndefined(result);
});
