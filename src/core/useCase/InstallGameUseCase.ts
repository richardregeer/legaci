import { Game } from "../entity/Game";
import { GameConfiguration } from "../entity/GameConfiguration";
import { ExtractorFactoryInterface } from "../extractor/ExtractorFactoryInterface";
import { LoggerInterface } from "../observability/LoggerInterface";
import { GameSetupFactoryInterface } from "../setup/GameSetupFactoryInterface";

export class InstallGameUseCase {
    private readonly _gameSetupFactory: GameSetupFactoryInterface;
    private readonly _logger: LoggerInterface;
    private readonly _extractorFactory: ExtractorFactoryInterface;
    
    /**
     * @param  {GameSetupFactoryInterface} gameInstallerFactory
     * @param  {LoggerInterface} logger
     * @param  {ExtractorFactoryInterface} extractorFactory
     */
    public constructor(
        gameInstallerFactory: GameSetupFactoryInterface, 
        logger: LoggerInterface,
        extractorFactory: ExtractorFactoryInterface){
        this._gameSetupFactory = gameInstallerFactory;
        this._logger = logger;
        this._extractorFactory = extractorFactory;
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} source
     * @param  {string} destination
     * @returns Promise<Game>
     */
    public async installGame(gameConfig: GameConfiguration, source: string, destination: string): Promise<Game> { 
        const extractor = this._extractorFactory.create(source);
        await extractor.extract(source, destination);
    
        const gameSetup = this._gameSetupFactory.create(gameConfig);
        return gameSetup.install(gameConfig, destination);
    }
}