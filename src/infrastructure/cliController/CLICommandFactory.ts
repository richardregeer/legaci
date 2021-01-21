import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { GameConfigurationResolverInterface } from '../../core/resolver/GameConfigurationResolverInterface';
import { InstallGameUseCase } from '../../core/useCase/InstallGameUseCase';
import { InstallGameController } from './InstallGameController';

export class CLICommandFactory {
  private readonly _installGameUseCase: InstallGameUseCase;
  private readonly _gameConfigurationResolver: GameConfigurationResolverInterface;
  private readonly _logger: LoggerInterface;

  /**
   * Factory to create the install controller
   *
   * @param installGameUseCase - The use case that will be executed by the controller
   * @param logger - Logger
   */
  constructor(installGameUseCase: InstallGameUseCase, logger: LoggerInterface) {
    this._installGameUseCase = installGameUseCase;
    this._logger = logger;
  }

  /**
   * Create a new install game controller
   *
   * @returns InstallGameController
   */
  public createInstallController(): InstallGameController {
    return new InstallGameController(this._installGameUseCase, this._logger);
  }
}
