import { ApplicationRunner } from '../../core/entity/ApplicationRunner';
import { Game } from '../../core/entity/Game';
import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { TemplateInterface } from '../../core/file/TemplateInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { GameRunnerSetupInterface } from '../../core/installer/GameRunnerSetupInterface';
import chalk from 'chalk';

export class ScummVMInstaller implements GameRunnerSetupInterface {
  protected readonly _template: TemplateInterface;
  protected readonly _logger: LoggerInterface;
  protected readonly _fileHandler: FileHandlerInterface;

  /**
   * Installer to install games that can run with ScummVM
   *
   * @param template - String template utility
   * @param fileHandler - File handler utility
   * @param logger - Logger
   */
  constructor(template: TemplateInterface, fileHandler: FileHandlerInterface, logger: LoggerInterface) {
    this._template = template;
    this._logger = logger;
    this._fileHandler = fileHandler;
  }

  /**
   * Install the game for ScummVM
   *
   * @param gameConfig - The legaci game installation configuration
   * @param destination - The destination where the game will be installed
   * @returns Promise<Game>
   */
  public async install(gameConfig: GameConfiguration, destination: string): Promise<Game> {
    this._logger.info(
      `Application runner ${chalk.white('ScummVM')} will be used to run ${chalk.white(gameConfig.name)}`
    );

    await this.generateConfiguration(gameConfig, destination);
    const binFilePath = await this.generateRunner(gameConfig, destination);

    return new Game(gameConfig.name, destination, binFilePath, gameConfig);
  }

  /**
   * Generate the ScummVM configuration that will be used to run the game
   *
   * @param gameConfig - The legaci game installation configuration
   * @param destination - The destination where the game will be installed
   * @returns Promise<void>
   */
  public async generateConfiguration(gameConfig: GameConfiguration, destination: string): Promise<void> {
    const runner = gameConfig.findByApplicationRunner(ApplicationRunner.SCUMMVM);
    const configurationPath = runner.configurationPath;

    if (configurationPath.includes('.template.')) {
      this._logger.warning('Use default ScummVM configuration');
    }

    this._fileHandler.copySync(configurationPath, `${destination}/scummvm.legaci.ini`);

    this._logger.info('ScummVM configuration file created and saved succesfully');
  }

  /**
   * Generate the binary file to run the game
   *
   * @param gameConfig - The legaci game installation configuration
   * @param destination - The destination where the game will be installed
   * @returns Promise<string>
   */
  public async generateRunner(gameConfig: GameConfiguration, destination: string): Promise<string> {
    const runner = gameConfig.findByApplicationRunner(ApplicationRunner.SCUMMVM);
    const binFileConfigPath = runner.binFile;

    if (binFileConfigPath.includes('.template.')) {
      this._logger.warning('Use default bin file');
    }

    let content = this._template.load(binFileConfigPath);
    const binFileDestination = `${destination}/legaci-run.sh`;
    content = this._template.replaceVariable('SCUMMVM_GAME_ID', runner.id || '', content);
    this._template.save(binFileDestination, content);
    this._fileHandler.makeFileExecutabeSync(binFileDestination);

    this._logger.info(`${chalk.white(gameConfig.name)} bin file created and saved succesfully`);

    return binFileDestination;
  }
}
