import { UnableToResolveError } from '../../infrastructure/error/UnableToResolveError';
import { GameConfiguration } from '../entity/GameConfiguration';
import { SourceType } from '../entity/SourceType';
import { GameConfigurationResolverInterface } from './GameConfigurationResolverInterface';
import { SourceTypeResolverInterface } from './SourceTypeResolverInterface';

export class GameResolverService {
  private readonly _sourceTypeResolvers: SourceTypeResolverInterface[];
  private readonly _gameConfigurationResolvers: GameConfigurationResolverInterface[];

  /**
   * Bla die bla
   *
   * @param sourceTypeResolvers
   * @param gameConfigurationResolvers
   */
  constructor(
    sourceTypeResolvers: SourceTypeResolverInterface[],
    gameConfigurationResolvers: GameConfigurationResolverInterface[]
  ) {
    this._sourceTypeResolvers = sourceTypeResolvers;
    this._gameConfigurationResolvers = gameConfigurationResolvers;
  }

  /**
   * @param source
   * @returns SourceType
   */
  public determineSourceType(source: string): SourceType {
    for (const sourceTypeResolver of this._sourceTypeResolvers) {
      if (sourceTypeResolver.isSourceType(source)) {
        return sourceTypeResolver.getSourceType();
      }
    }

    return SourceType.UNKNOWN;
  }

  /**
   * @param sourceType
   * @param destination
   * @param gameId?
   * @param gameId
   * @throws UnableToResolveError
   * @returns GameConfiguration
   */
  public async resolveGameConfiguration(
    sourceType: SourceType,
    destination: string,
    gameId?: string
  ): Promise<GameConfiguration> {
    let configurationResolver = this._gameConfigurationResolvers.find((x) => x.getSourceType() === sourceType);

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
