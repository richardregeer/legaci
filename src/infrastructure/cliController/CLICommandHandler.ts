import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { CLICommandFactory } from "./CLICommandFactory";

export class CLICommandHandler {
    private readonly _cliCommandFactory: CLICommandFactory;
    private readonly _logger: LoggerInterface
    
    /**
     * @param  {InstallCommandHandler} installCommandHandler
     * @param  {LoggerInterface} logger
     */
    public constructor(
        cliCommandFactory: CLICommandFactory,
        logger: LoggerInterface) {
        this._logger = logger;
        this._cliCommandFactory = cliCommandFactory;
    }
    
    /**
     * @param  {string} gameId
     * @param  {string} file
     * @param  {string} destination
     * @returns Promise<void>
     */
    public async handleCLICommand(gameId: string, file: string, destination: string): Promise<void> {        
        const installController = this._cliCommandFactory.createInstallController();
        
        await installController.handleInstallCommand(gameId, file, destination);

        return Promise.resolve();
    }
}