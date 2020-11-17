import * as path from 'path';
import { ApplicationRunner } from '../../core/entity/ApplicationRunner';
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { SourceType } from '../../core/entity/SourceType';
import { GameConfigurationResolver } from './GameConfigurationResolver';

export class GOGGameConfigurationResolver extends GameConfigurationResolver {
    
    /**
     * @returns SourceType
     */
    public getSourceType(): SourceType {
        return SourceType.GOG_SCUMMVM;
    }

    /**
     * @param  {SourceType} sourceType
     * @param  {string} destination
     * @returns Promise<GameConfiguration>
     */
    public async resolveDefaultConfiguration(sourceType: SourceType, destination: string): Promise<GameConfiguration> {
        const gameConfiguration = await super.resolveDefaultConfiguration(sourceType, destination);
     
        if (sourceType === SourceType.GOG_SCUMMVM) {
            const gameId = this.getScummVMGameId(destination);
            this.parseRunners(path.dirname(__dirname), [{ application: ApplicationRunner.SCUMMVM, id: gameId }], gameConfiguration);
        }
        
        return gameConfiguration;
    }
    
    /**
     * @param  {string} configIniFilePath
     * @returns string
     */
    private getScummVMGameId(configIniFilePath: string): string {
        let gameId = '';
        
        try {
            const iniFile = this._fileHandler.findFilesSync(false, configIniFilePath, '/**/*.ini');
            if (iniFile.length === 0) {
                return '';
            }

            const scummVmConfigurationLines = this._fileHandler.readSync(iniFile[0]).toString().split('\n'); 
            scummVmConfigurationLines.forEach((line: string) => {
                if (line.indexOf('gameid=') > -1) {
                    gameId = line.substring(7, line.length);
                }
            }); 
        } catch(error: unknown) {
            return '';
        }
        
        return gameId;
      }
}