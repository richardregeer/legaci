import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import { GameResolverService } from '../../../../src/core/resolver/GameResolverService';
import { SourceTypeResolverInterface } from '../../../../src/core/resolver/SourceTypeResolverInterface';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { GameConfigurationResolverInterface } from '../../../../src/core/resolver/GameConfigurationResolverInterface';
import { SourceType } from '../../../../src/core/entity/SourceType';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { UnableToResolveError } from '../../../../src/infrastructure/error/UnableToResolveError';

interface Context {
  sut: GameResolverService;
  sandbox: sinon.SinonSandbox;
  sourceTypeResolverStub: StubbedInstance<SourceTypeResolverInterface>;
  gameConfigResolverStub: StubbedInstance<GameConfigurationResolverInterface>;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.sourceTypeResolverStub = stubInterface<SourceTypeResolverInterface>();
  t.context.gameConfigResolverStub = stubInterface<GameConfigurationResolverInterface>();

  t.context.gameConfigResolverStub.getSourceType.returns(SourceType.UNKNOWN);
  t.context.gameConfigResolverStub.resolveById.resolves(new GameConfiguration('test'));
  t.context.gameConfigResolverStub.resolveDefaultConfiguration.resolves(new GameConfiguration('test'));

  t.context.sut = new GameResolverService([t.context.sourceTypeResolverStub], [t.context.gameConfigResolverStub]);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('determineSourceType should return the sourceType of the given source', async (t: ExecutionContext<Context>) => {
  const { sut, sourceTypeResolverStub } = t.context;

  sourceTypeResolverStub.isSourceType.returns(true);
  sourceTypeResolverStub.getSourceType.returns(SourceType.GOG_DOSBOX);

  const result = sut.determineSourceType('source');

  assert.equal(result, SourceType.GOG_DOSBOX);
});

test('determineSourceType should return the UNKNONW sourceType when no sourcetype is found', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.determineSourceType('source');

  assert.equal(result, SourceType.UNKNOWN);
});

test('resolveGameConfiguration should return the game configuration of the given sourceType when a game id is provided', async (t: ExecutionContext<
  Context
>) => {
  const { sut } = t.context;

  const result = await sut.resolveGameConfiguration(SourceType.GOG_DOSBOX, 'destination', 'test-game-id');

  assert.isTrue(t.context.gameConfigResolverStub.resolveById.calledOnce);
  assert.equal(result.name, 'test');
});

test('resolveGameConfiguration should return the default configuration of the given sourceType when no game id is provided', async (t: ExecutionContext<
  Context
>) => {
  const { sut, gameConfigResolverStub } = t.context;

  const result = await sut.resolveGameConfiguration(SourceType.GOG_DOSBOX, 'destination');

  assert.isTrue(gameConfigResolverStub.resolveDefaultConfiguration.calledOnce);
  assert.equal(result.name, 'test');
});

test('resolveGameConfiguration should throw an UnableToResolveError when no game configuration resolver is found', async (t: ExecutionContext<
  Context
>) => {
  const { sut, gameConfigResolverStub } = t.context;

  gameConfigResolverStub.getSourceType.returns('invalid' as SourceType);

  await t.throwsAsync(async () => sut.resolveGameConfiguration(SourceType.GOG_DOSBOX, 'destination', 'test-game-id'), {
    instanceOf: UnableToResolveError,
  });
});
