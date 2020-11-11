import chalk from 'chalk';
import { Game } from "../entity/Game";
import { GameConfiguration } from "../entity/GameConfiguration";
import { ExtractorFactoryInterface } from "../extractor/ExtractorFactoryInterface";
import { LoggerInterface } from "../observability/LoggerInterface";
import { GameRunnerSetupFactoryInterface } from "../installer/GameRunnerSetupFactoryInterface";
import { GameFilesInstallerInterface } from "../installer/GameFilesInstallerInterface";
import { SourceTypeService } from '../resolver/SourceTypeService';

export class InstallGameUseCase {
    private readonly _gameRunnerSetupFactory: GameRunnerSetupFactoryInterface;
    private readonly _logger: LoggerInterface;
    private readonly _extractorFactory: ExtractorFactoryInterface;
    private readonly _gameFilesInstaller: GameFilesInstallerInterface;
    private readonly _sourceTypeService: SourceTypeService;
    
    /**
     * @param  {GameRunnerSetupFactoryInterface} gameRunnerSetupFactory
     * @param  {LoggerInterface} logger
     * @param  {ExtractorFactoryInterface} extractorFactory
     * @param  {GameFilesInstallerInterface} gameFilesInstaller
     * @param  {SourceTypeService} sourceTypeService
     */
    public constructor(
        gameRunnerSetupFactory: GameRunnerSetupFactoryInterface, 
        logger: LoggerInterface,
        extractorFactory: ExtractorFactoryInterface,
        gameFilesInstaller: GameFilesInstallerInterface,
        sourceTypeService: SourceTypeService){
        this._gameRunnerSetupFactory = gameRunnerSetupFactory;
        this._logger = logger;
        this._extractorFactory = extractorFactory;
        this._gameFilesInstaller = gameFilesInstaller;
        this._sourceTypeService = sourceTypeService;
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} source
     * @param  {string} destination
     * @returns Promise<Game>
     */
    public async installGame(gameConfig: GameConfiguration, source: string, destination: string): Promise<Game> { 
        this._logger.info(`Start installing ${chalk.bold.white(gameConfig.name)} from ${chalk.white.underline(source)} to ${chalk.white.underline(destination)}`);
        
        // Extract game file
        const extractor = this._extractorFactory.create(source);
        await extractor.extract(source, destination);

        // Determine source type of the installed files
        const sourceType = this._sourceTypeService.determineSourceType(destination);
        
        // Setup application runner
        const gameRunnerSetup = this._gameRunnerSetupFactory.create(gameConfig, sourceType);
        const game = await gameRunnerSetup.install(gameConfig, destination);
        
        // Install additional game files
        await this._gameFilesInstaller.install(gameConfig, destination);

        this._logger.info(`Finished installing ${chalk.white(game.name)} to ${chalk.white.underline(destination)}`);
        this._logger.info(`Run: ${chalk.bold.white.underline(game.binFile)} to start ${chalk.white(game.name)}`);

        return game;
    }
}