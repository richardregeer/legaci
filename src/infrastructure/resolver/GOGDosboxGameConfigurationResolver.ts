import * as path from "path";
import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { SourceType } from "../../core/entity/SourceType";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { GameConfigurationResolver } from "./GameConfigurationResolver";
import { GOGGameInformationResolver } from "./GOGGameInformationResolver";

export class GOGDosboxGameConfigurationResolver extends GameConfigurationResolver {
  private readonly _gogGameInformationResolver: GOGGameInformationResolver;

  /**
   * @param  {FileHandlerInterface} fileHandler
   * @param  {GOGGameInformationResolver} gogGameInformationResolver
   */
  public constructor(
    fileHandler: FileHandlerInterface,
    gogGameInformationResolver: GOGGameInformationResolver
  ) {
    super(fileHandler);
    this._gogGameInformationResolver = gogGameInformationResolver;
  }

  /**
   * @returns SourceType
   */
  public getSourceType(): SourceType {
    return SourceType.GOG_DOSBOX;
  }

  /**
   * @param  {SourceType} sourceType
   * @param  {string} destination
   * @returns Promise<GameConfiguration>
   */
  public async resolveDefaultConfiguration(
    sourceType: SourceType,
    destination: string
  ): Promise<GameConfiguration> {
    const gameConfiguration = await super.resolveDefaultConfiguration(
      sourceType,
      destination
    );

    this.parseRunners(
      path.dirname(__dirname),
      [{ application: ApplicationRunner.DOSBOX }],
      gameConfiguration
    );

    // Try to get the game name from GOG info file
    const gameName = this._gogGameInformationResolver.getGameName(destination);
    if (gameName) {
      gameConfiguration.name = gameName;
    }

    return gameConfiguration;
  }
}
