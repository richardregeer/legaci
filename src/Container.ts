import chalk from 'chalk';
import * as shellJs from 'shelljs';
import { InstallGameUseCase } from './core/useCase/InstallGameUseCase';
import { CLICommandFactory } from './infrastructure/cliController/CLICommandFactory';
import { LoggerFactory } from './infrastructure/observability/LoggerFactory';
import { GameRunnerSetupFactory } from './infrastructure/installer/GameRunnerSetupFactory';
import { Template } from './infrastructure/file/Template';
import { FileHandler } from './infrastructure/file/FileHandler';
import { ExtractorFactory } from './infrastructure/extractor/ExtractorFactory';
import { ShellCommand } from './infrastructure/command/ShellCommand';
import { GameConfigurationResolver } from './infrastructure/resolver/GameConfigurationResolver';
import { CLICommandHandler } from './infrastructure/cliController/CLICommandHandler';
import { UnableToResolveError } from './infrastructure/error/UnableToResolveError';
import { GameFilesInstaller } from './infrastructure/installer/GameFilesInstaller';
import { GameResolverService } from './core/resolver/GameResolverService';
import { GOGScummVMSourceTypeResolver } from './infrastructure/resolver/GOGScummVMSourceTypeResolver';
import { GOGScummVMGameConfigurationResolver } from './infrastructure/resolver/GOGScummVMGameConfigurationResolver';
import { GOGDosboxSourceTypeResolver } from './infrastructure/resolver/GOGDosboxSourceTypeResolver';
import { GOGGameInformationResolver } from './infrastructure/resolver/GOGGameInformationResolver';
import { GOGDosboxGameConfigurationResolver } from './infrastructure/resolver/GOGDosboxGameConfigurationResolver';

export class Container {
  private readonly _container: Map<string, unknown>;

  /**
   * Creates a new dependency container
   */
  constructor() {
    this._container = new Map<string, unknown>();
  }

  /**
   * Setup all dependencies of the container
   *
   * @returns void
   */
  public setup(): void {
    // Logger
    const loggerFactory = new LoggerFactory(chalk);
    this._container.set(LoggerFactory.name, loggerFactory);
    const logger = loggerFactory.createLogger();
    this._container.set('LoggerInterface', logger);

    // Command
    const shell = new ShellCommand(shellJs.exec, shellJs.config);
    this._container.set(ShellCommand.name, shell);

    // File
    const fileHandler = new FileHandler(shellJs.config);
    this._container.set('FileHandlerInterface', fileHandler);
    const fileTemplate = new Template(fileHandler);
    this._container.set('TemplateInterface', fileTemplate);

    // GameResolverService
    const gogGameInformationResolver = new GOGGameInformationResolver(fileHandler);

    const sourceTypeServices = [
      new GOGDosboxSourceTypeResolver(fileHandler),
      new GOGScummVMSourceTypeResolver(fileHandler),
    ];
    const gameConfigurationResolvers = [
      new GameConfigurationResolver(fileHandler),
      new GOGScummVMGameConfigurationResolver(fileHandler, gogGameInformationResolver),
      new GOGDosboxGameConfigurationResolver(fileHandler, gogGameInformationResolver),
    ];
    const gameResolverService = new GameResolverService(sourceTypeServices, gameConfigurationResolvers);
    this._container.set(GameResolverService.name, gameResolverService);

    // Install usecase
    const gameSetupFactory = new GameRunnerSetupFactory(fileTemplate, fileHandler, logger);
    this._container.set('GameSetupFactoryInterface', gameSetupFactory);
    const extractorFactory = new ExtractorFactory(fileHandler, logger, shell);
    this._container.set('ExtractorFactoryInterface', extractorFactory);
    const gameFilesInstaller = new GameFilesInstaller(fileHandler, logger);
    this._container.set('GameFilesInstallerInterface', gameFilesInstaller);
    const installGameUseCase = new InstallGameUseCase(
      gameSetupFactory,
      logger,
      extractorFactory,
      gameFilesInstaller,
      gameResolverService
    );
    this._container.set(InstallGameUseCase.name, installGameUseCase);

    // CLI command handler
    const cliCommandFactory = new CLICommandFactory(installGameUseCase, logger);
    this._container.set(CLICommandFactory.name, cliCommandFactory);
    const cliCommandHandler = new CLICommandHandler(cliCommandFactory, logger);
    this._container.set(CLICommandHandler.name, cliCommandHandler);
  }

  /**
   * Resolve a depenency from the container by name
   *
   * @param name - The name of the dependency to resolve
   * @returns T
   */
  public resolve<T>(name: string): T {
    if (!this._container.has(name)) {
      throw new UnableToResolveError(`Unable to resolve ${name} from container`);
    }

    return this._container.get(name) as T;
  }
}
