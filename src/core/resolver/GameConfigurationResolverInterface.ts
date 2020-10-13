import { GameConfiguration } from "../entities/GameConfiguration";

export interface GameConfigurationResolverInterface {
    
    /**
     * @param  {string} source
     * @returns Promise<GameConfiguration>
     */
    resolve(source: string): Promise<GameConfiguration>;
}