import * as path from 'path';
import { ApplicationRunner } from '../../core/entity/ApplicationRunner';
import { GameConfiguration } from '../../core/entity/GameConfiguration';
import { SourceType } from '../../core/entity/SourceType';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { GameConfigurationResolver } from './GameConfigurationResolver';
import { GOGGameInformationResolver } from './GOGGameInformationResolver';

export class GOGScummVMGameConfigurationResolver extends GameConfigurationResolver {
  private readonly _gogGameInformationResolver: GOGGameInformationResolver;

  /**
   * @param fileHandler
   * @param gogGameInformationResolver
   */
  constructor(fileHandler: FileHandlerInterface, gogGameInformationResolver: GOGGameInformationResolver) {
    super(fileHandler);
    this._gogGameInformationResolver = gogGameInformationResolver;
  }

  /**
   * @returns SourceType
   */
  public getSourceType(): SourceType {
    return SourceType.GOG_SCUMMVM;
  }

  /**
   * @param sourceType
   * @param destination
   * @returns Promise<GameConfiguration>
   */
  public async resolveDefaultConfiguration(sourceType: SourceType, destination: string): Promise<GameConfiguration> {
    const gameConfiguration = await super.resolveDefaultConfiguration(sourceType, destination);

    const gameId = this.getScummVMGameId(destination);
    this.parseRunners(
      path.dirname(__dirname),
      [{ application: ApplicationRunner.SCUMMVM, id: gameId }],
      gameConfiguration
    );

    // Try to get the game name from GOG info file
    const gameName = this._gogGameInformationResolver.getGameName(destination);
    if (gameName) {
      gameConfiguration.name = gameName;
    }

    return gameConfiguration;
  }

  /**
   * @param destination
   * @returns string
   */
  private getScummVMGameId(destination: string): string {
    let gameId = '';

    try {
      const iniFile = this._fileHandler.findFilesSync(false, destination, '/**/*.ini');
      if (iniFile.length === 0) {
        return '';
      }

      const scummVmConfigurationLines = this._fileHandler.readSync(iniFile[0]).toString().split('\n');
      scummVmConfigurationLines.forEach((line: string) => {
        if (line.indexOf('gameid=') > -1) {
          gameId = line.substring(7, line.length);
        }
      });
    } catch (error: unknown) {
      return '';
    }

    return gameId;
  }
}
