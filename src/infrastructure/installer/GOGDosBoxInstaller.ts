import { Game } from "../../core/entity/Game";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { DosBoxInstaller } from "./DosBoxInstaller";

export class GOGDosBoxInstaller extends DosBoxInstaller {     

    /**
     * @param  {string} line
     * @param  {string} destination
     * @returns string
     */
    private replaceMountPath(line: string , destination: string): string | null {
      if (line.toLowerCase().indexOf('mount c ".."') > -1) {
        return line.replace('".."', destination);
      }

      return null;
    }
    
    /**
     * @param  {string} line
     * @returns boolean
     */
    private removeCloudSaves(line: string): boolean {
      if (line.toLowerCase().indexOf('cloud_saves') > -1) {
        return true;
      }

      return false;
    }
    
    /**
     * @param  {string} line
     * @param  {string} destination
     * @returns string
     */
    private replaceImageMountPath(line: string, destination: string): string | null {
      if (line.toLowerCase().indexOf('imgmount') > -1) {
        const newLine = this.correctFilenameCase(line, destination);
        return newLine.replace('..\\', `${destination}/`);
      }

      return null;
    }
    
    /**
     * @param  {string} line
     * @returns boolean
     */
    private removeApplicationMenu(line: string): boolean {
      if ((line.toLowerCase().indexOf('[1;') > -1)
          || (line.toLowerCase().indexOf('[0m') > -1)) {
        return true;
      }

      return false;
    }
    
    /**
     * @param  {string} line
     * @param  {string} destination
     * @returns string
     */
    private correctFilenameCase(line: string, destination: string): string {
      const start = line.indexOf('\\');
      const end = line.indexOf('"', start);
      const fileName = line.substring(start + 1, end);

      if (this._fileHandler.existsSync(destination + `/${fileName}`, false)) {
        return line;
      }

      let correctedFileName = fileName.toLowerCase();
      if (this._fileHandler.existsSync(destination + `/${correctedFileName}`, false)) {
        return line.replace(fileName, correctedFileName);
      }

      correctedFileName = fileName.toUpperCase();
      if (this._fileHandler.existsSync(destination + `/${correctedFileName}`, false)) {
        return line.replace(fileName, correctedFileName);
      }

      return line;
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<Game>
     */
    public async install(gameConfig: GameConfiguration, destination: string): Promise<Game> {
      // Make sure we move all files that are in the app folder. Some games have required data there that 
      // Inoextract does not copy.
      this._fileHandler.copyFilesSync(`${destination}/app/*`, destination);

      return super.install(gameConfig, destination);
    }

    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<void>
     */
    public async generateConfiguration(gameConfig: GameConfiguration, destination: string): Promise<void> {
        // Try to find the GOG dosbox configuration files
        const resultConfiguration = this._fileHandler.findFilesSync(`${destination}/**/*.conf`);

        const config = resultConfiguration.find((value) => {
          return value.indexOf('single') < 0;
        }) 

        const runConfig = resultConfiguration.find((value) => {
          return value.indexOf('single') >= 0;
        })
          
        // If there is no GOG Dosbox configuration or a game config is available, continue with the default DosBox setup
        if (gameConfig.id || !config) {
            super.saveDosBoxConfiguration(gameConfig, destination);
        } else {
            this._fileHandler.copySync(config, `${destination}/dosbox.legaci.conf`);
        }

        // If there is no GOG Dosbox configuration or a game config is available, continue with the default DosBox setup
        if (gameConfig.id || !runConfig) {
            super.saveDosBoxRunConfiguration(gameConfig, destination);
        } else {
          this.convertRunConfiguration(runConfig, destination);
        }

        this._logger.info('DosBox configuration file copied from GOG configuration and saved succesfully');
    }
    
    /**
     * @param  {string} runConfiguration
     * @param  {string} destination
     * @returns void
     */
    private convertRunConfiguration(runConfiguration: string, destination: string): void {
      const gogRunConfiguration = this._fileHandler.readSync(runConfiguration).toString().split('\r\n');
      const convertedConfiguration = [];

      try {
        gogRunConfiguration.forEach((line) => {
          let newLine = null;

          // First try to replace lines if needed
          newLine = this.replaceMountPath(line, destination)
            || this.replaceImageMountPath(line, destination)
            || line;

          // Check if the line needs to be added to the configuration
          if (this.removeApplicationMenu(line) || this.removeCloudSaves(line)) {
            newLine = null;
          }
          
          if (newLine) {
            // Push only ASCII characters to new config.
            convertedConfiguration.push(newLine.replace(/[^ -~]+/g, ''));
          }
        });

        this._fileHandler.writeSync(`${destination}/dosbox.legaci.run.conf`, convertedConfiguration.join('\n'));
      } catch (error: unknown) {
          this._logger.error('Unable to save DosBox run configuration file', error as Error);

          throw error;
      }
    }
}
