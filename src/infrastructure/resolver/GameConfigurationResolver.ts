import * as path from 'path';
import { ApplicationRunner } from '../../core/entity/ApplicationRunner';
import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { GameFile } from '../../core/entity/GameFile';
import { Runner } from '../../core/entity/Runner';
import { SourceType } from '../../core/entity/SourceType';
import { GameConfigurationNotFoundError } from '../../core/error/GameConfigurationNotFoundError';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { GameConfigurationResolverInterface } from '../../core/resolver/GameConfigurationResolverInterface';

export class GameConfigurationResolver implements GameConfigurationResolverInterface {
  protected readonly _fileHandler: FileHandlerInterface;

  /**
   * @param  {FileHandlerInterface} fileHandler
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * @param  {string} id
   * @throws GameConfigurationNotFoundError
   * @returns Promise<GameConfiguration>
   */
  public async resolveById(id: string): Promise<GameConfiguration> {
    const source = path.join(__dirname, '../../../../', 'resources', 'games', id, 'config.json');

    if (!this._fileHandler.existsSync(source, false)) {
      throw new GameConfigurationNotFoundError(`No game configuration found for ${id}`);
    }

    return this.resolveBySource(source);
  }

  /**
   * @param {string} dirname
   * @param dirName
   * @param {Array<Record<string, unknown>>} configRunners
   * @param {GameConfiguration} gameConfiguration
   * @returns void
   */
  protected parseRunners(
    dirName: string,
    configRunners: Record<string, unknown>[],
    gameConfiguration: GameConfiguration
  ): void {
    configRunners.forEach(
      (i: {
        application: string;
        version: string;
        runConfiguration: string;
        gameConfiguration: string;
        binFile: string;
        id: string;
      }) => {
        gameConfiguration.runners.push(
          new Runner(
            i.application,
            i.version,
            this.parseConfigPath(
              path.join(dirName, i.runConfiguration || ''),
              i.runConfiguration,
              'run.template.conf',
              i.application
            ),
            this.parseConfigPath(
              path.join(dirName, i.gameConfiguration || ''),
              i.gameConfiguration,
              'configuration.template.conf',
              i.application
            ),
            this.parseConfigPath(path.join(dirName, i.binFile || ''), i.binFile, 'bin.template.sh', i.application),
            i.id
          )
        );
      }
    );
  }

  /**
   * @param  {string} source
   * @param  {string} configuration
   * @param  {string} fallbackFileName
   * @param  {string} runner
   * @returns string
   */
  private parseConfigPath(source: string, configuration: string, fallbackFileName: string, runner: string): string {
    // Use fallback source when no configuration is given
    if (!configuration || configuration === '') {
      return path.join(__dirname, '../../../../', 'resources', 'runners', runner.toLocaleLowerCase(), fallbackFileName);
    }

    return source;
  }

  /**
   * @returns SourceType
   */
  public getSourceType(): SourceType {
    return SourceType.UNKNOWN;
  }

  /**
   * @param  {SourceType} sourceType
   * @param  {string} destination
   * @returns Promise<GameConfiguration>
   */
  public async resolveDefaultConfiguration(): Promise<GameConfiguration> {
    const gameConfiguration = new GameConfiguration('Legaci game');

    this.parseRunners(
      path.dirname(__dirname),
      [{ application: ApplicationRunner.DOSBOX, version: '0.74' }],
      gameConfiguration
    );

    return gameConfiguration;
  }

  /**
   * @param  {string} source
   * @returns Promise<GameConfiguration>
   */
  private async resolveBySource(source: string): Promise<GameConfiguration> {
    const content = this._fileHandler.readSync(source);
    const configuration = JSON.parse(content) as Record<string, unknown>;
    const dirName = path.dirname(source);

    // Map fields to configuration object
    const gameConfiguration = new GameConfiguration(configuration.name as string);
    gameConfiguration.genre = configuration.genre as string;
    gameConfiguration.releaseStatus = configuration.releaseStatus as string;
    gameConfiguration.released = configuration.released as Date;
    gameConfiguration.id = configuration.id as string;

    this.parseRunners(dirName, configuration.runners as Record<string, unknown>[], gameConfiguration);

    const gameFiles = configuration.gameFiles as Record<string, string>[];
    gameFiles.forEach((i: { name: string; location: string }) => {
      gameConfiguration.gameFiles.push(new GameFile(i.name, path.join(dirName, i.location || '')));
    });

    // configuration.sourcePorts.forEach((i: { name: string; version: string; }) => {
    //     gameConfiguration.sourcePorts.push(new SourcePort(
    //         i.name,
    //         i.version
    //     ));
    // });

    // configuration.stores.forEach(((i: { store: string; id: string; url: string; }) => {
    //     gameConfiguration.stores.push(new Store(
    //         i.store,
    //         i.id,
    //         i.url
    //     ));
    // }));

    // gameConfiguration.references.push(configuration.references.map((i: string) => i));
    // gameConfiguration.reviews.push(configuration.reviews.map((i: string) => i));
    // gameConfiguration.downloadLocations.push(configuration.downloadLocations.map((i: string) => i));

    return gameConfiguration;
  }
}
