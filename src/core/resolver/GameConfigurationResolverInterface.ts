import { GameConfiguration } from "../entity/GameConfiguration";

export interface GameConfigurationResolverInterface {
    
    /**
     * @param  {string} source
     * @returns Promise<GameConfiguration>
     */
    resolve(source: string): Promise<GameConfiguration>;
}