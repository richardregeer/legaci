import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameConfigurationResolverInterface } from "../../core/resolver/GameConfigurationResolverInterface";
import { InstallGameUseCase } from "../../core/useCase/InstallGameUseCase";
import { InstallGameController } from "./InstallGameController";

export class CLICommandFactory {
    private readonly _installGameUseCase: InstallGameUseCase;
    private readonly _gameConfigurationResolver: GameConfigurationResolverInterface;
    private readonly _logger: LoggerInterface;
    
    /**
     * @param  {InstallGameUseCase} installGameUseCase
     * @param  {GameConfigurationResolverInterface} gameConfigurationResolver
     * @param  {LoggerInterface} logger
     */
    constructor(
        installGameUseCase: InstallGameUseCase, 
        gameConfigurationResolver: GameConfigurationResolverInterface, 
        logger: LoggerInterface) {
            this._installGameUseCase = installGameUseCase;
            this._gameConfigurationResolver = gameConfigurationResolver;
            this._logger = logger;
    }

    /**
     * @returns InstallGameController
     */
    createInstallController(): InstallGameController {
        return new InstallGameController(this._installGameUseCase, this._gameConfigurationResolver, this._logger);    
    }    
}