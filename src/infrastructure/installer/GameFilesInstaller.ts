import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { GameFilesInstallerInterface } from '../../core/installer/GameFilesInstallerInterface';
import chalk from 'chalk';
import { GameFile } from '../../core/entity/GameFile';

export class GameFilesInstaller implements GameFilesInstallerInterface {
  private readonly _logger: LoggerInterface;
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * Create installer to copy all the legaci game files
   *
   * @param fileHandler File handler utility
   * @param logger Logger
   */
  constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface) {
    this._logger = logger;
    this._fileHandler = fileHandler;
  }

  /**
   * Install all the game files from the game configuration
   *
   * @param gameConfig The legaci game installation configuration
   * @param destination The destination where the game will be installed
   * @returns Promise<Game>
   */
  public async install(gameConfig: GameConfiguration, destination: string): Promise<void> {
    if (gameConfig.gameFiles.length === 0) {
      return;
    }

    this._logger.info('Start copying additional game files');
    gameConfig.gameFiles.forEach((gameFile: GameFile) => {
      this._fileHandler.copySync(`${gameFile.location}/${gameFile.name}`, `${destination}/${gameFile.name}`);
      this._logger.info(`Copied: ${chalk.white(gameFile.name)}`);
    });
  }
}
