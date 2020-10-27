import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { Game } from "../../core/entity/Game";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameRunnerSetupInterface } from "../../core/setup/GameRunnerSetupInterface";
import chalk from 'chalk';

export class DosBoxInstaller implements GameRunnerSetupInterface {
    private readonly _template: TemplateInterface;
    private readonly _logger: LoggerInterface;
    private readonly _fileHandler: FileHandlerInterface;
    
    /**
     * @param  {TemplateInterface} template
     * @param  {LoggerInterface} logger
     */
    public constructor(
        template: TemplateInterface,
        fileHandler: FileHandlerInterface,
        logger: LoggerInterface) {
        this._template = template;
        this._logger = logger;
        this._fileHandler = fileHandler;
    }
   
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<Game>
     */
    public async install(gameConfig: GameConfiguration, destination: string): Promise<Game> {
        this._logger.info(`Application runner ${chalk.white('DosBox')} will be used to run ${chalk.white(gameConfig.name)}`);

        await this.generateConfiguration(gameConfig, destination);
        const binFilePath = await this.generateRunner(gameConfig, destination);

        return Promise.resolve(new Game(gameConfig.name, destination, binFilePath, gameConfig));
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<void>
     */
    public async generateConfiguration(gameConfig: GameConfiguration, destination: string): Promise<void> {
        try {
            const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX)
            const configurationPath = runner.configurationPath;

            if (configurationPath.includes('.template.')) {
                this._logger.warning('Use default DosBox configuration');   
            }

            const content = this._template.load(configurationPath);
            this._template.save(`${destination}/dosbox.legaci.conf`, content);

            if (runner.runConfigurationPath.includes('.template.')) {
                this._logger.warning('Use default DosBox run configuration');   
            }

            // Try loading the run configuration
            if (runner.runConfigurationPath) {
                const content = this._template.load(runner.runConfigurationPath);
                this._template.save(`${destination}/dosbox.legaci.run.conf`, content);
            }
            
            this._logger.info('DosBox configuration file created and saved succesfully');

            return Promise.resolve();
        } catch(error: any) {
            return Promise.reject(error);
        }
    }
    
    /**
     * @param  {GameConfiguration} gameConfig
     * @param  {string} destination
     * @returns Promise<string>
     */
    public async generateRunner(gameConfig: GameConfiguration, destination: string): Promise<string> {
        const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX)
        const binFileConfigPath = runner.binFile;

        // // Use DosBox fallback launch configuration if no launcher is found
        // if (!runner || !runner.binFile) {
        //     launchConfigPath = '../../resources/launchers/dosbox/dosbox.lauch.template.sh';   
        // } else {
        //     launchConfigPath = runner.binFile;
        // }

        //  // Try loading the launch configuration
        //  const content = this._template.load(launchConfigPath);
        //  if (!runner.binFile) {
        //     this._template.replaceVariable('CONF_PATH', `-conf ${destination}/legaci.conf`, content);

        //     if (runner.runConfigurationPath) {
        //         this._template.replaceVariable('RUN_CONF_PATH', `-conf ${destination}/legaci-start.conf`, content);         
        //     }
        //     else {
        //         this._template.replaceVariable('RUN_CONF_PATH', '', content);   
        //     }
        // }
        
        if (binFileConfigPath.includes('.template.')) {
            this._logger.warning('Use default bin file. Game folder will be mounted but the game will not start automatically!');   
        }

        const content = this._template.load(binFileConfigPath);
        const binFileDestination = `${destination}/legaci-run.sh`;
        this._template.save(binFileDestination, content);
        
        this._fileHandler.makeFileExecutabeSync(binFileDestination);

        this._logger.info(`${chalk.white(gameConfig.name)} bin file created and saved succesfully`);
            
        return Promise.resolve(binFileDestination);
    }
}