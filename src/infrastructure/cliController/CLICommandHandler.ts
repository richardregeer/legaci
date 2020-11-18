import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CLICommandFactory } from './CLICommandFactory';

export class CLICommandHandler {
  private readonly _cliCommandFactory: CLICommandFactory;
  private readonly _logger: LoggerInterface;

  /**
   * @param {InstallCommandHandler} installCommandHandler
   * @param cliCommandFactory
   * @param {LoggerInterface} logger
   */
  constructor(cliCommandFactory: CLICommandFactory, logger: LoggerInterface) {
    this._logger = logger;
    this._cliCommandFactory = cliCommandFactory;
  }

  /**
   * @param {string} file
   * @param {string} destination
   * @param {string} gameId?
   * @param gameId
   * @returns Promise<void>
   */
  public async handleCLICommand(file: string, destination: string, gameId?: string): Promise<void> {
    const installController = this._cliCommandFactory.createInstallController();

    await installController.handleInstallCommand(file, destination, gameId);

    return Promise.resolve();
  }
}
