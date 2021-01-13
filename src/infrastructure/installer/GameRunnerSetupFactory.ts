import { ApplicationRunner } from '../../core/entity/ApplicationRunner';
import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { SourceType } from '../../core/entity/SourceType';
import { UnsupportedApplicationRunnerError } from '../../core/error/UnsupportedApplicationRunnerError';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { TemplateInterface } from '../../core/file/TemplateInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { GameRunnerSetupFactoryInterface } from '../../core/installer/GameRunnerSetupFactoryInterface';
import { GameRunnerSetupInterface } from '../../core/installer/GameRunnerSetupInterface';
import { DosBoxInstaller } from './DosBoxInstaller';
import { GOGDosBoxInstaller } from './GOGDosBoxInstaller';
import { ScummVMInstaller } from './ScummVMInstaller';
import { GOGScummVMInstaller } from './GOGScummVMInstaller';

export class GameRunnerSetupFactory implements GameRunnerSetupFactoryInterface {
  private readonly _template: TemplateInterface;
  private readonly _logger: LoggerInterface;
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * Factory to create a new GameRunnerSetup instance
   *
   * @param template String template utility
   * @param fileHandler File handler utility
   * @param logger Logger
   */
  constructor(template: TemplateInterface, fileHandler: FileHandlerInterface, logger: LoggerInterface) {
    this._template = template;
    this._logger = logger;
    this._fileHandler = fileHandler;
  }

  /**
   * Create a new GameRunnerSetup instance based on the given game configuration and source type
   *
   * @param gameConfig The legaci game installation configuration
   * @param sourceType The type of the source game file to install
   * @returns GameRunnerSetupInterface
   */
  public create(gameConfig: GameConfiguration, sourceType: SourceType): GameRunnerSetupInterface {
    if (!gameConfig.hasRunners()) {
      throw new UnsupportedApplicationRunnerError('No application runner found for configuration');
    }

    // ScummVM
    let runner = gameConfig.findByApplicationRunner(ApplicationRunner.SCUMMVM);
    if (runner !== null) {
      switch (sourceType) {
        case SourceType.GOG_SCUMMVM:
          return new GOGScummVMInstaller(this._template, this._fileHandler, this._logger);
        default:
          return new ScummVMInstaller(this._template, this._fileHandler, this._logger);
      }
    }

    // DosBox
    runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX);
    if (runner === null) {
      throw new UnsupportedApplicationRunnerError('Application runner is not supported');
    }

    // Return the correct installer based on the given source type
    switch (sourceType) {
      case SourceType.GOG_DOSBOX:
        return new GOGDosBoxInstaller(this._template, this._fileHandler, this._logger);
      default:
        return new DosBoxInstaller(this._template, this._fileHandler, this._logger);
    }
  }
}
