import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { ApplicationRunner } from '../../../../src/core/entity/ApplicationRunner';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { Runner } from '../../../../src/core/entity/Runner';
import { assert } from 'chai';

interface Context {
  sut: GameConfiguration;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sut = new GameConfiguration('test');
});

test('hasRunners should return true when there are configured applications runners', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;
  const runner = new Runner(ApplicationRunner.DOSBOX, '1', 'source', 'configSource', 'binFile');

  assert.isFalse(sut.hasRunners());
  sut.runners.push(runner);
  assert.isTrue(sut.hasRunners());
});

test('findByApplicationRunner should return the requested runner when available', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;
  const runner = new Runner(ApplicationRunner.DOSBOX, '1', 'source', 'configSource', 'binFile');
  sut.runners.push(runner);

  const result = sut.findByApplicationRunner(ApplicationRunner.DOSBOX);
  assert.strictEqual(result.application, ApplicationRunner.DOSBOX);
});

test('findByApplicationRunner should return null when the requested runner is not available', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.findByApplicationRunner(ApplicationRunner.DOSBOX);

  assert.isNull(result);
});
