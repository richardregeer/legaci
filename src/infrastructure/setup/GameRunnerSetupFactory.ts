import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { UnsupportedApplicationRunnerError } from "../../core/error/UnsupportedApplicationRunnerError";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameRunnerSetupFactoryInterface } from "../../core/setup/GameRunnerSetupFactoryInterface";
import { GameRunnerSetupInterface } from "../../core/setup/GameRunnerSetupInterface";
import { DosBoxInstaller } from "../installer/DosBoxInstaller";

export class GameRunnerSetupFactory implements GameRunnerSetupFactoryInterface {
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
    public create(gameConfig: GameConfiguration): GameRunnerSetupInterface {
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