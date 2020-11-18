import { Game } from "../entity/Game";
import { GameConfiguration } from "../entity/GameConfiguration";

export interface GameRunnerSetupInterface {
  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<Game>
   */
  install(gameConfig: GameConfiguration, destination: string): Promise<Game>;

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<void>
   */
  generateConfiguration(
    gameConfig: GameConfiguration,
    destination: string
  ): Promise<void>;

  /**
   * @param  {GameConfiguration} gameConfig
   * @param  {string} destination
   * @returns Promise<string>
   */
  generateRunner(
    gameConfig: GameConfiguration,
    destination: string
  ): Promise<string>;
}
