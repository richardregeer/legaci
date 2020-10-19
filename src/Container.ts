import chalk from 'chalk';
import * as shellJs from 'shelljs';
import { InstallGameUseCase } from "./core/useCase/InstallGameUseCase";
import { CLICommandFactory } from "./infrastructure/cliController/CLICommandFactory";
import { LoggerFactory } from "./infrastructure/observability/LoggerFactory";
import { GameSetupFactory } from "./infrastructure/setup/GameSetupFactory";
import { Template } from "./infrastructure/file/Template";
import { FileHandler } from "./infrastructure/file/FileHandler";
import { ExtractorFactory } from "./infrastructure/extractor/ExtractorFactory";
import { ShellCommand } from "./infrastructure/command/ShellCommand";
import { GameConfigurationResolver } from './infrastructure/resolver/GameConfigurationResolver';
import { CLICommandHandler } from './infrastructure/cliController/CLICommandHandler';
import { WinstonLogger } from './infrastructure/observability/WinstonLogger';
import { UnableToResolveError } from './infrastructure/error/UnableToResolveError';

export class Container {
    private _container: Map<string, unknown>; 
    
    /**
     */
    constructor() {
        this._container = new Map();
    }

    /**
     * @returns void
     */
    public setup(): void {
        // Logger
        const loggerFactory = new LoggerFactory(chalk);
        this._container.set(LoggerFactory.name, loggerFactory);
        const logger = loggerFactory.createLogger();
        this._container.set(WinstonLogger.name, logger);

        // File
        const fileHandler = new FileHandler();
        this._container.set(FileHandler.name, fileHandler);
        const fileTemplate = new Template(fileHandler);
        this._container.set(Template.name, fileTemplate);

        // Command
        const shell = new ShellCommand(shellJs.exec, shellJs.config);
        this._container.set(ShellCommand.name, shell);

        // Install usecase
        const gameSetupFactory = new GameSetupFactory(fileTemplate, logger);
        this._container.set(GameSetupFactory.name, gameSetupFactory);
        const extractorFactory = new ExtractorFactory(fileHandler, logger, shell);
        this._container.set(ExtractorFactory.name, extractorFactory);
        const installGameUseCase = new InstallGameUseCase(gameSetupFactory, logger, extractorFactory);
        this._container.set(InstallGameUseCase.name, installGameUseCase);

        // CLI command handler
        const gameConfigurationResolver = new GameConfigurationResolver(fileHandler, logger);
        this._container.set(GameConfigurationResolver.name, gameConfigurationResolver);
        const cliCommandFactory = new CLICommandFactory(installGameUseCase, gameConfigurationResolver, logger);
        this._container.set(CLICommandFactory.name, cliCommandFactory);
        const cliCommandHandler = new CLICommandHandler(cliCommandFactory, logger);
        this._container.set(CLICommandHandler.name, cliCommandHandler);   
    }
    
    /**
     * @param  {string} name
     * @returns T
     */
    public resolve<T>(name: string): T {
        if (!this._container.has(name)) {
        throw new UnableToResolveError(`Unable to resolve ${name} from container`);  
        }
        
        return this._container.get(name) as T;
    }
}