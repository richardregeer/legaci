import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { Game } from "../../core/entity/Game";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameRunnerSetupInterface } from "../../core/installer/GameRunnerSetupInterface";
import chalk from "chalk";

export class DosBoxInstaller implements GameRunnerSetupInterface {
  protected readonly _template: TemplateInterface;
  protected readonly _logger: LoggerInterface;
  protected readonly _fileHandler: FileHandlerInterface;

  /**
   * @param {TemplateInterface} template
   * @param fileHandler
   * @param {LoggerInterface} logger
   */
  public constructor(
    template: TemplateInterface,
    fileHandler: FileHandlerInterface,
    logger: LoggerInterface
  ) {
    this._template = template;
    this._logger = logger;
    this._fileHandler = fileHandler;
  }

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<Game>
   */
  public async install(
    gameConfig: GameConfiguration,
    destination: string
  ): Promise<Game> {
    this._logger.info(
      `Application runner ${chalk.white(
        "DosBox"
      )} will be used to run ${chalk.white(gameConfig.name)}`
    );

    await this.generateConfiguration(gameConfig, destination);
    const binFilePath = await this.generateRunner(gameConfig, destination);

    return new Game(gameConfig.name, destination, binFilePath, gameConfig);
  }

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns void
   */
  protected saveDosBoxConfiguration(
    gameConfig: GameConfiguration,
    destination: string
  ): void {
    const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX);
    const configurationPath = runner.configurationPath;

    if (configurationPath.includes(".template.")) {
      this._logger.warning("Use default DosBox configuration");
    }

    this._fileHandler.copySync(
      configurationPath,
      `${destination}/dosbox.legaci.conf`
    );
  }

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns void
   */
  protected saveDosBoxRunConfiguration(
    gameConfig: GameConfiguration,
    destination: string
  ): void {
    const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX);

    if (runner.runConfigurationPath.includes(".template.")) {
      this._logger.warning("Use default DosBox run configuration");
    }

    this._fileHandler.copySync(
      runner.runConfigurationPath,
      `${destination}/dosbox.legaci.run.conf`
    );
  }

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<void>
   */
  public async generateConfiguration(
    gameConfig: GameConfiguration,
    destination: string
  ): Promise<void> {
    this.saveDosBoxConfiguration(gameConfig, destination);
    this.saveDosBoxRunConfiguration(gameConfig, destination);

    this._logger.info(
      "DosBox configuration file created and saved succesfully"
    );
  }

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<string>
   */
  public async generateRunner(
    gameConfig: GameConfiguration,
    destination: string
  ): Promise<string> {
    const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX);
    const binFileConfigPath = runner.binFile;

    if (binFileConfigPath.includes(".template.")) {
      this._logger.warning(
        "Use default bin file. If there is no dosbox run configuration the game will be mounted but will not start automatically!"
      );
    }

    const content = this._template.load(binFileConfigPath);
    const binFileDestination = `${destination}/legaci-run.sh`;
    this._template.save(binFileDestination, content);

    this._fileHandler.makeFileExecutabeSync(binFileDestination);

    this._logger.info(
      `${chalk.white(gameConfig.name)} bin file created and saved succesfully`
    );

    return binFileDestination;
  }
}
