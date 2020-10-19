import { Game } from "../../core/entity/Game";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameConfigurationResolverInterface } from "../../core/resolver/GameConfigurationResolverInterface";
import { InstallGameUseCase } from "../../core/useCase/InstallGameUseCase";

export class InstallGameController {
    private readonly _installGameUseCase: InstallGameUseCase;
    private readonly _logger: LoggerInterface
    private _gameConfigurationResolver: GameConfigurationResolverInterface;
    
    /**
     * @param  {InstallGameUseCase} installGameUseCase
     * @param  {GameConfigurationResolverInterface} gameConfigurationResolver
     * @param  {LoggerInterface} logger
     */
    public constructor(
        installGameUseCase: InstallGameUseCase, 
        gameConfigurationResolver:GameConfigurationResolverInterface, 
        logger: LoggerInterface) {
        this._installGameUseCase = installGameUseCase;
        this._gameConfigurationResolver = gameConfigurationResolver;
        this._logger = logger;
    }
    
    /**
     * @param  {string} configSource
     * @param  {string} gameSource
     * @param  {string} gameDestination
     * @returns Promise
     */
    public async handleInstallCommand(configSource: string, gameSource: string, gameDestination: string): Promise<Game> {
        try {
            const gameConfig = await this._gameConfigurationResolver.resolve(configSource);
            return this._installGameUseCase.installGame(gameConfig, gameSource, gameDestination); 
        } catch(ex: unknown) {
            // Add logging  
        } 
    }
}