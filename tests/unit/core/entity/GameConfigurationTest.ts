import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { ApplicationRunner } from '../../../../src/core/entity/ApplicationRunner';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { Runner } from '../../../../src/core/entity/Runner';

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

  t.false(sut.hasRunners());
  sut.runners.push(runner);
  t.true(sut.hasRunners());
});
