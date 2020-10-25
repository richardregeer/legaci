import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { UnsupportedApplicationRunnerError } from "../../core/error/UnsupportedApplicationRunnerError";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameSetupFactoryInterface } from "../../core/setup/GameSetupFactoryInterface";
import { GameSetupInterface } from "../../core/setup/GameSetupInterface";
import { DosBoxInstaller } from "../installer/DosBoxInstaller";

export class GameSetupFactory implements GameSetupFactoryInterface {
    private readonly _template: TemplateInterface;
    private readonly _logger: LoggerInterface;
    private readonly _fileHandler: FileHandlerInterface;
   
    /**
     * @param  {TemplateInterface} template
     * @param  {LoggerInterface} logger
     */
    constructor(
        template: TemplateInterface,
        fileHandler: FileHandlerInterface,
        logger: LoggerInterface) {
        this._template = template;
        this._logger = logger;
        this._fileHandler = fileHandler;
    }

    /**
     * @param  {GameConfiguration} gameConfig
     * @throws UnsupportedApplicationRunnerError
     * @returns GameSetupInterface
     */
    public create(gameConfig: GameConfiguration): GameSetupInterface {
        if (!gameConfig.hasRunners()) {
            throw new UnsupportedApplicationRunnerError('No application runner found for configuration');
        }

        const runner = gameConfig.findByApplicationRunner(ApplicationRunner.DOSBOX);
        if (runner === null) {
            throw new UnsupportedApplicationRunnerError('Application runner is not supported');
        }

        return new DosBoxInstaller(this._template, this._fileHandler, this._logger);    
    }
}