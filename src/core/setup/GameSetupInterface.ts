import { Game } from "../entities/Game";
import { GameConfiguration } from "../entities/GameConfiguration";

export interface GameSetupInterface {
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<Game>
     */
    install(gameConfig: GameConfiguration, destination: string) : Promise<Game>;
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<void>
     */
    generateConfiguration(gameConfig: GameConfiguration, destination: string) : Promise<void>;
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<string>
     */
    generateRunner(gameConfig: GameConfiguration, destination: string) : Promise<string>;  
}