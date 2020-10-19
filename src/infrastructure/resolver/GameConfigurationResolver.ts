import { GameConfiguration } from "../../core/entity/GameConfiguration";
import { Runner } from "../../core/entity/Runner";
import { SourcePort } from "../../core/entity/SourcePort";
import { Store } from "../../core/entity/Store";
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
     * @param  {string} path
     * @returns Promise<GameConfiguration>
     */
    public async resolve(source: string): Promise<GameConfiguration> {
        const content = this._fileHandler.readSync(source);
        const configuration = JSON.parse(content);

        // Mapp fields to configuration object
        const gameConfiguration =  new GameConfiguration(configuration.name);
        gameConfiguration.genre = configuration.genre;
        gameConfiguration.releaseStatus = configuration.releaseStatus;
        gameConfiguration.released = configuration.released;

        configuration.launchers.forEach(i => {
            const runner = new Runner(
                i.application,
                i.version,
                i.runConfiguration,
                i.gameConfiguration,
                i.binFile
            )
            gameConfiguration.runners.push(runner);
        });

        configuration.sourcePorts.forEach(i => {
            const sourcePort = new SourcePort(
                i.application,
                i.version
            )
            gameConfiguration.sourcePorts.push(sourcePort);
        });

        configuration.stores.forEach(i => {
            const store = new Store(
                i.store,
                i.id,
                i.url
            )
            gameConfiguration.stores.push(store);
        });

        configuration.references.forEach((i: string) => gameConfiguration.references.push(i));
        configuration.reviews.forEach((i: string) => gameConfiguration.reviews.push(i));
        configuration.downloadlocations.forEach((i: string) => gameConfiguration.downloadLocations.push(i));

        return gameConfiguration;
    }
}