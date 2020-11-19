import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { GameConfigurationResolverInterface } from '../../core/resolver/GameConfigurationResolverInterface';
import { InstallGameUseCase } from '../../core/useCase/InstallGameUseCase';
import { InstallGameController } from './InstallGameController';

export class CLICommandFactory {
  private readonly _installGameUseCase: InstallGameUseCase;
  private readonly _gameConfigurationResolver: GameConfigurationResolverInterface;
  private readonly _logger: LoggerInterface;

  /**
   * @param installGameUseCase
   * @param logger
   */
  constructor(installGameUseCase: InstallGameUseCase, logger: LoggerInterface) {
    this._installGameUseCase = installGameUseCase;
    this._logger = logger;
  }

  /**
   * @returns InstallGameController
   */
  public createInstallController(): InstallGameController {
    return new InstallGameController(this._installGameUseCase, this._logger);
  }
}
