import chalk from 'chalk';
import { Game } from '../../core/entity/Game';
import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { ScummVMInstaller } from './ScummVMInstaller';

export class GOGScummVMInstaller extends ScummVMInstaller {
  /**
   * Cleanup unused GOG files
   *
   * @param destination - The destination where the game will be installed
   * @returns void
   */
  private cleanup(destination: string): void {
    this._fileHandler.removeFilesSync(
      `${destination}/app`,
      `${destination}/tmp`,
      `${destination}/__redist`,
      `${destination}/__support`,
      `${destination}/commonappdata`,
      `${destination}/scummvm`,
      `${destination}/webcache.zip`
    );

    this._logger.info(`Removed unused GOG.com files from installation folder`);
  }

  /**
   * Install the GOG game for ScummVM
   *
   * @param gameConfig - The legaci game installation configuration
   * @param destination - The destination where the game will be installed
   * @returns Promise<Game>
   */
  public async install(gameConfig: GameConfiguration, destination: string): Promise<Game> {
    this._logger.info(`${chalk.white('GOG.com')} installation file detected`);

    // Make sure we move all files that are in the app folder. Some games have required data there that
    // Inoextract does not copy.
    this._fileHandler.copyFilesSync(`${destination}/app/*`, destination);

    const game = await super.install(gameConfig, destination);

    // Remove all files from GOG.com that are not needed for the game.
    this.cleanup(destination);

    return game;
  }

  /**
   * Copy the GOG ScummVM configuration that will be used to run the game. If not available generate the default.
   *
   * @param gameConfig - The legaci game installation configuration
   * @param destination - The destination where the game will be installed
   * @returns Promise<void>
   */
  public async generateConfiguration(gameConfig: GameConfiguration, destination: string): Promise<void> {
    // Try to find the GOG dosbox configuration files
    const resultConfiguration = this._fileHandler.findFilesSync(false, destination, '/**/*.ini');
    const config = resultConfiguration[0];

    // If there is no GOG ScummVM configuration or a game config is available, continue with the default ScummVM setup
    if (gameConfig.id || !config) {
      await super.generateConfiguration(gameConfig, destination);
    } else {
      this._fileHandler.copySync(config, `${destination}/scummvm.legaci.ini`);
      this._logger.info('ScummVM configuration file copied from GOG configuration and saved succesfully');
    }
  }
}
