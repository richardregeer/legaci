import chalk from 'chalk';
import * as shellJs from 'shelljs';
import { InstallGameUseCase } from "./core/useCase/InstallGameUseCase";
import { CLICommandFactory } from "./infrastructure/cliController/CLICommandFactory";
import { LoggerFactory } from "./infrastructure/observability/LoggerFactory";
import { GameRunnerSetupFactory } from "./infrastructure/installer/GameRunnerSetupFactory";
import { Template } from "./infrastructure/file/Template";
import { FileHandler } from "./infrastructure/file/FileHandler";
import { ExtractorFactory } from "./infrastructure/extractor/ExtractorFactory";
import { ShellCommand } from "./infrastructure/command/ShellCommand";
import { GameConfigurationResolver } from './infrastructure/resolver/GameConfigurationResolver';
import { CLICommandHandler } from './infrastructure/cliController/CLICommandHandler';
import { UnableToResolveError } from './infrastructure/error/UnableToResolveError';
import { GameFilesInstaller } from './infrastructure/installer/GameFilesInstaller';
import { SourceTypeService } from './core/resolver/SourceTypeService';
import { GOGDosboxSourceTypeResolver } from './infrastructure/resolver/GOGDosboxSourceTypeResolver';

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
        this._container.set('LoggerInterface', logger);

        // File
        const fileHandler = new FileHandler();
        this._container.set('FileHandlerInterface', fileHandler);
        const fileTemplate = new Template(fileHandler);
        this._container.set('TemplateInterface', fileTemplate);

        // Command
        const shell = new ShellCommand(shellJs.exec, shellJs.config);
        this._container.set(ShellCommand.name, shell);
        
        // SourceType
        const sourceTypeServices = [
            new GOGDosboxSourceTypeResolver(fileHandler)
        ]
        const sourceTypeService = new SourceTypeService(sourceTypeServices);
        this._container.set(SourceTypeService.name, sourceTypeService);

        // Install usecase
        const gameSetupFactory = new GameRunnerSetupFactory(fileTemplate, fileHandler, logger);
        this._container.set('GameSetupFactoryInterface', gameSetupFactory);
        const extractorFactory = new ExtractorFactory(fileHandler, logger, shell);
        this._container.set('ExtractorFactoryInterface', extractorFactory);
        const gameFilesInstaller = new GameFilesInstaller(fileHandler, logger);
        this._container.set('GameFilesInstallerInterface', gameFilesInstaller);
        const installGameUseCase = new InstallGameUseCase(gameSetupFactory, logger, extractorFactory, gameFilesInstaller, sourceTypeService);
        this._container.set(InstallGameUseCase.name, installGameUseCase);

        // CLI command handler
        const gameConfigurationResolver = new GameConfigurationResolver(fileHandler);
        this._container.set('GameConfigurationResolverInterface', gameConfigurationResolver);
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