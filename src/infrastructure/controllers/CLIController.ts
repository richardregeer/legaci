import { Game } from "../../core/entities/Game";
import { LoggerInterface } from "../../core/observability/LoggingInterface";
import { GameConfigurationResolverInterface } from "../../core/resolver/GameConfigurationResolverInterface";
import { InstallGameUseCase } from "../../core/useCases/InstallGameUseCase";

export class CLIController {
    private readonly _installGameUseCase: InstallGameUseCase;
    private readonly _logger: LoggerInterface
    private _gameConfigurationResolver: GameConfigurationResolverInterface;
    
    /**
     * @param  {InstallGameUseCase} installGameUseCase
     * @param  {LoggerInterface} logger
     */
    public constructor(installGameUseCase: InstallGameUseCase, logger: LoggerInterface) {
        this._installGameUseCase = installGameUseCase;
        this._logger = logger;
    }
    
    /**
     * @returns Promise<void>
     */
    public async handleCommand(): Promise<void> {
        const game = new Game('a', 'b');

        // TODO support to following usecases:
        //  - Install
        //  - Remove
        //  - Run
        //  - list installed games

        // Install Usecase
        // Find game configuration
        let gameConfig = null; 

        try {
            gameConfig = await this._gameConfigurationResolver.resolve('test', 'somepath');
        } catch(ex: Error) {
            // Add logging  
        }

        const source = 'test.exe';
        const destination = 'games/test';
        await this._installGameUseCase.installGame(gameConfig,source, destination);    
    }
}