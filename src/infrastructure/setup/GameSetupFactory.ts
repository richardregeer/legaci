import { ApplicationRunner } from "../../core/entity/ApplicationRunner";
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { UnsupportedApplicationRunnerError } from "../../core/error/UnsupportedApplicationRunnerError";
import { TemplateInterface } from "../../core/file/TemplateInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameSetupFactoryInterface } from "../../core/setup/GameSetupFactoryInterface";
import { GameSetupInterface } from "../../core/setup/GameSetupInterface";
import { DosBoxInstaller } from "../installer/DosBoxInstaller";

export class GameSetupFactory implements GameSetupFactoryInterface {
    private readonly _template: TemplateInterface;
    private readonly _logger: LoggerInterface;
   
    /**
     * @param  {TemplateInterface} template
     * @param  {LoggerInterface} logger
     */
    constructor(
        template: TemplateInterface, 
        logger: LoggerInterface) {
        this._template = template;
        this._logger = logger;
    }

    /**
     * @param  {GameConfiguration} gameConfig
     * @throws UnsupportedApplicationRunnerError
     * @returns GameSetupInterface
     */
    public create(gameConfig: GameConfiguration): GameSetupInterface {
        if (gameConfig.runners.length === 0) {
            throw new UnsupportedApplicationRunnerError('No application runner found for configuration');
        }

        const runner = gameConfig.runners[0];
        if (runner.application === ApplicationRunner.DOSBOX) {
            return new DosBoxInstaller(this._template, this._logger);
        }
        else {
            throw new UnsupportedApplicationRunnerError('Application runner is not supported');
        }
    }
}