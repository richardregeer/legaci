import { GameConfiguration } from "../entity/GameConfiguration";

export interface GameFilesInstallerInterface {
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<void>
     */
    install(gameConfig: GameConfiguration, destination: string): Promise<void>;
}