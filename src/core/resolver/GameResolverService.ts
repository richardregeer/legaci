import { UnableToResolveError } from "../../infrastructure/error/UnableToResolveError";
import { GameConfiguration } from "../entity/GameConfiguration";
import { SourceType } from "../entity/SourceType";
import { GameConfigurationResolverInterface } from "./GameConfigurationResolverInterface";
import { SourceTypeResolverInterface } from "./SourceTypeResolverInterface";

export class GameResolverService {
  private _sourceTypeResolvers: Array<SourceTypeResolverInterface>;
  private _gameConfigurationResolvers: Array<GameConfigurationResolverInterface>;

  /**
   * @param  {Array<SourceTypeResolverInterface>} sourceTypeResolvers
   * @param  {Array<GameConfigurationResolverInterface>} gameConfigurationResolvers
   */
  public constructor(sourceTypeResolvers: Array<SourceTypeResolverInterface>, gameConfigurationResolvers: Array<GameConfigurationResolverInterface>) {
    this._sourceTypeResolvers = sourceTypeResolvers;
    this._gameConfigurationResolvers = gameConfigurationResolvers;
  }

  /**
   * @param  {string} source
   * @returns SourceType
   */
  public determineSourceType(source: string): SourceType {

    for (const sourceTypeResolver of this._sourceTypeResolvers) {
      if(sourceTypeResolver.isSourceType(source)) {
        return sourceTypeResolver.getSourceType();
      }
    }

    return SourceType.UNKNOWN;
  }

  /**
   * @param  {SourceType} sourceType
   * @param  {String} destination
   * @param  {string} gameId?
   * @throws UnableToResolveError
   * @returns GameConfiguration
   */
  public async resolveGameConfiguration(sourceType: SourceType, destination: string, gameId?: string): Promise<GameConfiguration> {
    let configurationResolver =  this._gameConfigurationResolvers.find((x) => x.getSourceType() === sourceType);

    if (!configurationResolver) {
      configurationResolver = this._gameConfigurationResolvers.find((x) => x.getSourceType() === SourceType.UNKNOWN);
    }

    if (!configurationResolver) {
      throw new UnableToResolveError('No game configuration resolver found');
    }

    if (gameId) {
      return configurationResolver.resolveById(gameId);
    }

    return await configurationResolver.resolveDefaultConfiguration(sourceType, destination);
  }
}
