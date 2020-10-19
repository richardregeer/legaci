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
     * @returns Promise<void>
     */
    public async handleCLICommand(): Promise<void> {
        try {
        } catch(ex: unknown) {
            // Add logging  
        } 
    }
}