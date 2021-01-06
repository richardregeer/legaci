import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { TemplateInterface } from '../../../../src/core/file/TemplateInterface';
import { Template } from '../../../../src/infrastructure/file/Template';

interface Context {
  sut: TemplateInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();

  t.context.sut = new Template(t.context.fileHandlerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('load should load the template file content', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.readSync.returns('testContent');

  const result = sut.load('test');

  assert.strictEqual(result, 'testContent');
});

test('save should write template content to file', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  sut.save('destination', 'testContent');

  assert.isTrue(fileHandlerStub.writeSync.calledOnceWith('destination', 'testContent'));
});

test('replaceVariable should replace a template variable in the template content', async (t: ExecutionContext<Context>) => {
  const { sut, fileHandlerStub } = t.context;

  fileHandlerStub.readSync.returns('testContent');

  const result = sut.replaceVariable('test', 'example', 'This is a {{test}} template');

  assert.strictEqual(result, 'This is a example template');
});
