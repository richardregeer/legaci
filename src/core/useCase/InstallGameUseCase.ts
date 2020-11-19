import chalk from 'chalk';
import { Game } from '../entity/Game';
import { ExtractorFactoryInterface } from '../extractor/ExtractorFactoryInterface';
import { LoggerInterface } from '../observability/LoggerInterface';
import { GameRunnerSetupFactoryInterface } from '../installer/GameRunnerSetupFactoryInterface';
import { GameFilesInstallerInterface } from '../installer/GameFilesInstallerInterface';
import { GameResolverService } from '../resolver/GameResolverService';

export class InstallGameUseCase {
  private readonly _gameRunnerSetupFactory: GameRunnerSetupFactoryInterface;
  private readonly _logger: LoggerInterface;
  private readonly _extractorFactory: ExtractorFactoryInterface;
  private readonly _gameFilesInstaller: GameFilesInstallerInterface;
  private readonly _gameResolverService: GameResolverService;

  /**
   * @param gameRunnerSetupFactory
   * @param logger
   * @param extractorFactory
   * @param gameFilesInstaller
   * @param sourceTypeService
   * @param gameResolverService
   */
  constructor(
    gameRunnerSetupFactory: GameRunnerSetupFactoryInterface,
    logger: LoggerInterface,
    extractorFactory: ExtractorFactoryInterface,
    gameFilesInstaller: GameFilesInstallerInterface,
    gameResolverService: GameResolverService
  ) {
    this._gameRunnerSetupFactory = gameRunnerSetupFactory;
    this._logger = logger;
    this._extractorFactory = extractorFactory;
    this._gameFilesInstaller = gameFilesInstaller;
    this._gameResolverService = gameResolverService;
  }

  /**
   * @param source
   * @param destination
   * @param gameId?
   * @param gameId
   * @returns Promise<Game>
   */
  public async installGame(source: string, destination: string, gameId?: string): Promise<Game> {
    this._logger.info(
      `Start installing ${chalk.bold.white(gameId || 'Legaci game')} from ${chalk.white.underline(
        source
      )} to ${chalk.white.underline(destination)}`
    );

    // Extract game file
    const extractor = this._extractorFactory.create(source);
    await extractor.extract(source, destination);

    // Determine source type of the installed files
    const sourceType = this._gameResolverService.determineSourceType(destination);
    // Resolve the game configuration
    const gameConfig = await this._gameResolverService.resolveGameConfiguration(sourceType, destination, gameId);

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
