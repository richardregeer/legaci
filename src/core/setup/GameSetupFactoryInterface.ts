import { GameConfiguration } from "../entity/GameConfiguration";
import { GameSetupInterface } from "./GameSetupInterface";

export interface GameSetupFactoryInterface {
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @returns GameSetupInterface
     */
    create(gameConfig: GameConfiguration): GameSetupInterface
}