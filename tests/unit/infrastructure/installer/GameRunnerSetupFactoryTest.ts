import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { LoggerInterface } from '../../../../src/core/observability/LoggerInterface';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { GameConfiguration } from '../../../../src/core/entity/GameConfiguration';
import { GameRunnerSetupFactoryInterface } from '../../../../src/core/installer/GameRunnerSetupFactoryInterface';
import { TemplateInterface } from '../../../../src/core/file/TemplateInterface';
import { GameRunnerSetupFactory } from '../../../../src/infrastructure/installer/GameRunnerSetupFactory';
import { Runner } from '../../../../src/core/entity/Runner';
import { ApplicationRunner } from '../../../../src/core/entity/ApplicationRunner';
import { SourceType } from '../../../../src/core/entity/SourceType';
import { GOGScummVMInstaller } from '../../../../src/infrastructure/installer/GOGScummVMInstaller';
import { ScummVMInstaller } from '../../../../src/infrastructure/installer/ScummVMInstaller';
import { GOGDosBoxInstaller } from '../../../../src/infrastructure/installer/GOGDosBoxInstaller';
import { DosBoxInstaller } from '../../../../src/infrastructure/installer/DosBoxInstaller';
import { UnsupportedApplicationRunnerError } from '../../../../src/core/error/UnsupportedApplicationRunnerError';

interface Context {
  sut: GameRunnerSetupFactoryInterface;
  sandbox: sinon.SinonSandbox;
  fileHandlerStub: StubbedInstance<FileHandlerInterface>;
  templateStub: StubbedInstance<TemplateInterface>;
  loggerStub: StubbedInstance<LoggerInterface>;
  gameConfigStub: StubbedInstance<GameConfiguration>;
  scummVMRunner: Runner;
  dosBoxRunner: Runner;
}

const test = anyTest as TestInterface<Context>;

test.beforeEach((t: ExecutionContext<Context>) => {
  t.context.sandbox = sinon.createSandbox();

  t.context.fileHandlerStub = stubInterface<FileHandlerInterface>();
  t.context.templateStub = stubInterface<TemplateInterface>();
  t.context.loggerStub = stubInterface<LoggerInterface>();
  t.context.gameConfigStub = stubInterface<GameConfiguration>();
  t.context.dosBoxRunner = new Runner(ApplicationRunner.DOSBOX, '1', '/test/path/source', 'test/path/config', 'test/path/bin', 'game');
  t.context.scummVMRunner = new Runner(ApplicationRunner.SCUMMVM, '1', '/test/path/source', 'test/path/config', 'test/path/bin', 'game');
  t.context.gameConfigStub.hasRunners.returns(true);

  t.context.sut = new GameRunnerSetupFactory(t.context.templateStub, t.context.fileHandlerStub, t.context.loggerStub);
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
});

test('Should throw an UnsupportedApplicationRunnerError when no application runners found', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub } = t.context;

  t.context.gameConfigStub.hasRunners.returns(false);

  t.throws(() => sut.create(gameConfigStub, SourceType.UNKNOWN), {
    instanceOf: UnsupportedApplicationRunnerError,
  });
});

test('Should throw an UnsupportedApplicationRunnerError when no supported application runner is found', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub } = t.context;

  gameConfigStub.findByApplicationRunner.returns(null);

  t.throws(() => sut.create(gameConfigStub, SourceType.UNKNOWN), {
    instanceOf: UnsupportedApplicationRunnerError,
  });
});

test('Should return a GOGScummVMInstaller when GOG sourceType and ScummVM application runner', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, scummVMRunner } = t.context;

  gameConfigStub.findByApplicationRunner.returns(scummVMRunner);

  const result = sut.create(gameConfigStub, SourceType.GOG_SCUMMVM);

  assert.instanceOf(result, GOGScummVMInstaller);
});

test('Should return a ScummVMInstaller when ScummVM application runner', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, scummVMRunner } = t.context;

  gameConfigStub.findByApplicationRunner.returns(scummVMRunner);

  const result = sut.create(gameConfigStub, SourceType.UNKNOWN);

  assert.instanceOf(result, ScummVMInstaller);
});

test('Should return a GOGDosBoxInstaller when GOG sourceType and DosBox application runner', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, dosBoxRunner } = t.context;

  gameConfigStub.findByApplicationRunner.onFirstCall().returns(null);
  gameConfigStub.findByApplicationRunner.onSecondCall().returns(dosBoxRunner);

  const result = sut.create(gameConfigStub, SourceType.GOG_DOSBOX);

  assert.instanceOf(result, GOGDosBoxInstaller);
});

test('Should return a DosBoxInstaller when DosBox application runner', async (t: ExecutionContext<Context>) => {
  const { sut, gameConfigStub, dosBoxRunner } = t.context;

  gameConfigStub.findByApplicationRunner.onFirstCall().returns(null);
  gameConfigStub.findByApplicationRunner.onSecondCall().returns(dosBoxRunner);

  const result = sut.create(gameConfigStub, SourceType.UNKNOWN);

  assert.instanceOf(result, DosBoxInstaller);
});
