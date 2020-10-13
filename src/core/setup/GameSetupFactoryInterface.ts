import { GameConfiguration } from "../entities/GameConfiguration";
import { GameSetupInterface } from "./GameSetupInterface";

export interface GameSetupFactoryInterface {
    
    /**
     * @param  {string} source
     * @param  {GameConfiguration} gameConfig
     * @returns Promise<GameSetupInterface>
     */
    create(source: string, gameConfig: GameConfiguration): Promise<GameSetupInterface>
}