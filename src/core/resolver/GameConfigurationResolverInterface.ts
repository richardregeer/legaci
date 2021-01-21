import { GameConfiguration } from '../entity/GameConfiguration';
import { SourceType } from '../entity/SourceType';

export interface GameConfigurationResolverInterface {
  /**
   * @param  {SourceType} sourceType
   * @param  {string} destination - The destination where the configuration is stored
   * @returns {Promise<GameConfiguration>} A default game configuration
   */
  resolveDefaultConfiguration(sourceType: SourceType, destination: string): Promise<GameConfiguration>;

  /**
   * @param  {string} id
   * @returns {Promise<GameConfiguration>}
   */
  resolveById(id: string): Promise<GameConfiguration>;

  /**
   * @returns SourceType
   */
  getSourceType(): SourceType;
}
