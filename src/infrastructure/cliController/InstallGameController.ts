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
     * @param  {string} gameId
     * @param  {string} gameSource
     * @param  {string} gameDestination
     * @returns Promise<Game>
     */
    public async handleInstallCommand(gameId: string, gameSource: string, gameDestination: string): Promise<Game> {
        const gameConfig = await this._gameConfigurationResolver.resolveById(gameId);
        
        return this._installGameUseCase.installGame(gameConfig, gameSource, gameDestination); 
    }
}