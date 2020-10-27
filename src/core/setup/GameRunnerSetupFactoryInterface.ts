import { GameConfiguration } from "../entity/GameConfiguration";
import { GameRunnerSetupInterface } from "./GameRunnerSetupInterface";

export interface GameRunnerSetupFactoryInterface {
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @returns GameSetupInterface
     */
    create(gameConfig: GameConfiguration): GameRunnerSetupInterface
}