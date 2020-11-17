import { Game } from "../../core/entity/Game";
import { FileDoesNotExistsError } from "../../core/error/FileDoesNotExistsError";
import { GameConfigurationNotFoundError } from "../../core/error/GameConfigurationNotFoundError";
import { UnknownFileTypeError } from "../../core/error/UnkownFileTypeError";
import { UnsupportedApplicationRunnerError } from "../../core/error/UnsupportedApplicationRunnerError";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameConfigurationResolverInterface } from "../../core/resolver/GameConfigurationResolverInterface";
import { InstallGameUseCase } from "../../core/useCase/InstallGameUseCase";
import chalk from 'chalk';

export class InstallGameController {
  private readonly _installGameUseCase: InstallGameUseCase;
  private readonly _logger: LoggerInterface

  /**
   * @param  {InstallGameUseCase} installGameUseCase
   * @param  {GameConfigurationResolverInterface} gameConfigurationResolver
   * @param  {LoggerInterface} logger
   */
  public constructor(
    installGameUseCase: InstallGameUseCase,
    logger: LoggerInterface) {
    this._installGameUseCase = installGameUseCase;
    this._logger = logger;
  }

  /**
   * @param  {string} gameSource
   * @param  {string} gameDestination
   * @param  {string} gameId?
   * @returns Promise<Game | null>
   */
  public async handleInstallCommand(gameSource: string, gameDestination: string, gameId?: string): Promise<Game | null> {
    try {
      return this._installGameUseCase.installGame(gameSource, gameDestination, gameId);
    } catch(error: unknown) {
      if (error instanceof GameConfigurationNotFoundError) {
        this._logger.error(`No game configuration found for game ${chalk.white(gameId)}`, error as Error);
      }
      else if (error instanceof UnsupportedApplicationRunnerError) {
        this._logger.error('Configured application runner is not supported', error as Error);
      }
      else if (error instanceof FileDoesNotExistsError) {
        this._logger.error(`File ${chalk.underline.white(gameSource)} is not found`, error as Error);
      }
      else if (error instanceof UnknownFileTypeError) {
        this._logger.error(`The filetype of ${chalk.underline.white(gameSource)} is not supported for install`, error as Error);
      }
      else {
        this._logger.error(`Error installing game ${chalk.white(gameId)} from ${chalk.underline.white(gameSource)} to ${chalk.underline.white(gameDestination)}`, error as Error);
      }
    }

    return null;
  }
}
