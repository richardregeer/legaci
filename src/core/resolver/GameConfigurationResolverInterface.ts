import { GameConfiguration } from "../entity/GameConfiguration";

export interface GameConfigurationResolverInterface {
    
    /**
     * @param  {string} source
     * @returns Promise<GameConfiguration>
     */
    resolveBySource(source: string): Promise<GameConfiguration>;
    
    /**
     * @param  {string} id
     * @returns Promise
     */
    resolveById(id: string):  Promise<GameConfiguration>;
}