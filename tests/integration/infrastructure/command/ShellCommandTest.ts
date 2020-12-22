import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { CommandInterface } from '../../../../src/core/command/CommandInterface';
import { ShellCommand } from '../../../../src/infrastructure/command/ShellCommand';
import * as shellJs from 'shelljs';

interface Context {
  sut: CommandInterface;
  sandbox: sinon.SinonSandbox;
  shellConfigStub: StubbedInstance<shellJs.ShellConfig>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.shellConfigStub = stubInterface<shellJs.ShellConfig>();

  t.context.sut = new ShellCommand(shellJs.exec, t.context.shellConfigStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should execute the given command and return the exit code', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = await sut.execute('true', false);

  assert.strictEqual(result, 0);
});
