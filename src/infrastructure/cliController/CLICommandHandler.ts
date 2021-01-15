import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CLICommandFactory } from './CLICommandFactory';

export class CLICommandHandler {
  private readonly _cliCommandFactory: CLICommandFactory;
  private readonly _logger: LoggerInterface;

  /**
   * Handler for CLI commands
   *
   * @param installCommandHandler - Handler to handle the install command
   * @param cliCommandFactory - Factory to create the controllers to handle the command
   * @param logger - Logger
   */
  constructor(cliCommandFactory: CLICommandFactory, logger: LoggerInterface) {
    this._logger = logger;
    this._cliCommandFactory = cliCommandFactory;
  }

  /**
   * Handle the given CLI command
   *
   * @param file - The file to install
   * @param destination - The destination of the installed file
   * @param gameId - The optional legacy game identifier
   * @returns Promise<void>
   */
  public async handleCLICommand(file: string, destination: string, gameId?: string): Promise<void> {
    const installController = this._cliCommandFactory.createInstallController();

    await installController.handleInstallCommand(file, destination, gameId);
    return;
  }
}
