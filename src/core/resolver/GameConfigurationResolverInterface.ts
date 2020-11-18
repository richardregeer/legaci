import { GameConfiguration } from '../entity/GameConfiguration';
import { SourceType } from '../entity/SourceType';

export interface GameConfigurationResolverInterface {
  /**
   * @param  {SourceType} sourceType
   * @param  {string} destination
   * @returns Promise<GameConfiguration>
   */
  resolveDefaultConfiguration(sourceType: SourceType, destination: string): Promise<GameConfiguration>;

  /**
   * @param  {string} id
   * @returns Promise
   */
  resolveById(id: string): Promise<GameConfiguration>;

  /**
   * @returns SourceType
   */
  getSourceType(): SourceType;
}
