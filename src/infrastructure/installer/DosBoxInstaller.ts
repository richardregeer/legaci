import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { Game } from "../../core/entity/Game";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameSetupInterface } from "../../core/setup/GameSetupInterface";

export class DosBoxInstaller implements GameSetupInterface {
    private readonly _template: TemplateInterface;
    private readonly _logger: LoggerInterface;
    
    /**
     * @param  {TemplateInterface} template
     * @param  {LoggerInterface} logger
     */
    public constructor(
        template: TemplateInterface, 
        logger: LoggerInterface) {
        this._template = template;
        this._logger = logger;
    }
   
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<Game>
     */
    public async install(gameConfig: GameConfiguration, destination: string): Promise<Game> {
        await this.generateConfiguration(gameConfig, destination);
        const binFile = await this.generateRunner(gameConfig, destination);

        return new Game(gameConfig.name, destination, binFile, gameConfig);
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<void>
     */
    public async generateConfiguration(gameConfig: GameConfiguration, destination: string): Promise<void> {
        const launcher = gameConfig.runners.find(x => x.application === ApplicationRunner.DOSBOX 
            && x.configurationPath)
        let configurationPath = '';

        // Use DosBox fallback configuration if no launcher is found
        if (!launcher) {
            configurationPath = '../../resources/launchers/dosbox/dosbox.configuration.template.conf'; 
        } else configurationPath = launcher.configurationPath;

        // Try loading the configuration
        const content = this._template.load(configurationPath);
        this._template.save(`${destination}/legaci.conf`, content);

        // Try loading the run configuration
        if (launcher.runConfigurationPath) {
            const content = this._template.load(launcher.runConfigurationPath);
            this._template.save(`${destination}/legaci-start.conf`, content);
        }
        
        this._logger.info('DosBox configuration file saved succesfully');
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<string>
     */
    public async generateRunner(gameConfig: GameConfiguration, destination: string): Promise<string> {
        const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX)
        let launchConfigPath = '';

        // Use DosBox fallback launch configuration if no launcher is found
        if (!runner || !runner.binFile) {
            launchConfigPath = '../../resources/launchers/dosbox/dosbox.lauch.template.sh';   
        } else {
            launchConfigPath = runner.binFile;
        }

         // Try loading the launch configuration
         const content = this._template.load(launchConfigPath);
         if (!runner.binFile) {
            this._template.replaceVariable('CONF_PATH', `-conf ${destination}/legaci.conf`, content);

            if (runner.runConfigurationPath) {
                this._template.replaceVariable('RUN_CONF_PATH', `-conf ${destination}/legaci-start.conf`, content);         
            }
            else {
                this._template.replaceVariable('RUN_CONF_PATH', '', content);   
            }
        }
        
        const binFile = `${destination}/legaci-run.sh`;
    
        this._template.save(binFile, content);
        this._logger.info('DosBox configuration file saved succesfully');
        
        return binFile;
    }
}