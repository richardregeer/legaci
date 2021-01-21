import { UnableToResolveError } from '../../infrastructure/error/UnableToResolveError';
import { GameConfiguration } from '../entity/GameConfiguration';
import { SourceType } from '../entity/SourceType';
import { GameConfigurationResolverInterface } from './GameConfigurationResolverInterface';
import { SourceTypeResolverInterface } from './SourceTypeResolverInterface';

export class GameResolverService {
  private readonly _sourceTypeResolvers: SourceTypeResolverInterface[];
  private readonly _gameConfigurationResolvers: GameConfigurationResolverInterface[];

  /**
   * Service to resover the game configuration based on the installation files or installation configuration
   *
   * @param sourceTypeResolvers - Resolvers that determine the type of the source
   * @param gameConfigurationResolvers - Resolvers that resolve the of the game that will be installed
   */
  constructor(
    sourceTypeResolvers: SourceTypeResolverInterface[],
    gameConfigurationResolvers: GameConfigurationResolverInterface[]
  ) {
    this._sourceTypeResolvers = sourceTypeResolvers;
    this._gameConfigurationResolvers = gameConfigurationResolvers;
  }

  /**
   * Determine the type of the source, based on the installation files
   *
   * @param source - The path where the game is installed
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
   * Resolve the configuration for the game that will be installed
   *
   * @param sourceType - The type of the source installation files
   * @param destination - The destination path where the game will be installed
   * @param gameId - The Legaci id of the game that will be installed
   * @throws UnableToResolveError
   * @returns Promise<GameConfiguration>
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

    return configurationResolver.resolveDefaultConfiguration(sourceType, destination);
  }
}
