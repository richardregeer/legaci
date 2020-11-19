import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CLICommandFactory } from './CLICommandFactory';

export class CLICommandHandler {
  private readonly _cliCommandFactory: CLICommandFactory;
  private readonly _logger: LoggerInterface;

  /**
   * @param installCommandHandler
   * @param cliCommandFactory
   * @param logger
   */
  constructor(cliCommandFactory: CLICommandFactory, logger: LoggerInterface) {
    this._logger = logger;
    this._cliCommandFactory = cliCommandFactory;
  }

  /**
   * @param file
   * @param destination
   * @param gameId?
   * @param gameId
   * @returns Promise<void>
   */
  public async handleCLICommand(file: string, destination: string, gameId?: string): Promise<void> {
    const installController = this._cliCommandFactory.createInstallController();

    await installController.handleInstallCommand(file, destination, gameId);
    return;
  }
}
