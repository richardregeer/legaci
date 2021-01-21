import { GameConfiguration } from '../entity/GameConfiguration';
import { SourceType } from '../entity/SourceType';
import { GameRunnerSetupInterface } from './GameRunnerSetupInterface';

export interface GameRunnerSetupFactoryInterface {
  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {SourceType} sourceType
   * @returns GameRunnerSetupInterface
   */
  create(gameConfig: GameConfiguration, sourceType: SourceType): GameRunnerSetupInterface;
}
