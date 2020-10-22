import path = require("path");
import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { Runner } from "../../core/entity/Runner";
import { SourcePort } from "../../core/entity/SourcePort";
import { Store } from "../../core/entity/Store";
import { GameConfigurationNotFoundError } from "../../core/error/GameConfigurationNotFoundError";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { GameConfigurationResolverInterface } from "../../core/resolver/GameConfigurationResolverInterface";

export class GameConfigurationResolver implements GameConfigurationResolverInterface {
    private readonly _fileHandler: FileHandlerInterface;
    private readonly _logger: LoggerInterface;
    
    /**
     * @param  {FileHandlerInterface} fileHandler
     * @param  {LoggerInterface} logger
     */
    public constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface) {
        this._fileHandler = fileHandler;
        this._logger = logger;
    }
  
    /**
     * @param  {string} id
     * @throws GameConfigurationNotFoundError
     * @returns Promise<GameConfiguration>
     */
    public async resolveById(id: string): Promise<GameConfiguration> {
        const source = path.join(__dirname, '../../../../', 'resources', 'games', id, 'config.json');

        if (!this._fileHandler.existsSync(source)) {
            throw new GameConfigurationNotFoundError(`No game configuration found for ${id}`);
        }

        return this.resolveBySource(source);
    }
    
    /**
     * @param  {string} path
     * @returns Promise<GameConfiguration>
     */
    public async resolveBySource(source: string): Promise<GameConfiguration> {
        const content = this._fileHandler.readSync(source);
        const configuration = JSON.parse(content);

        // Mapp fields to configuration object
        const gameConfiguration =  new GameConfiguration(configuration.name);
        gameConfiguration.genre = configuration.genre;
        gameConfiguration.releaseStatus = configuration.releaseStatus;
        gameConfiguration.released = configuration.released;

        gameConfiguration.runners.push(configuration.runners.map((i: { application: string; version: string; runConfiguration: string; gameConfiguration: string; binFile: string; }) => {
            return new Runner(
                i.application,
                i.version,
                i.runConfiguration,
                i.gameConfiguration,
                i.binFile
            )
        }));
        
        gameConfiguration.sourcePorts.push(configuration.sourcePorts.map((i: { application: string; version: string; }) => {
            return new SourcePort(
                i.application,
                i.version
            )
        }));

        gameConfiguration.stores.push(configuration.stores.map((i: { store: string; id: string; url: string; }) => {
            return new Store(
                i.store,
                i.id,
                i.url
            );
        }));

        gameConfiguration.references.push(configuration.references.map((i: string) => i));
        gameConfiguration.reviews.push(configuration.reviews.map((i: string) => i));
        gameConfiguration.downloadLocations.push(configuration.downloadLocations.map((i: string) => i));

        return gameConfiguration;
    }
}