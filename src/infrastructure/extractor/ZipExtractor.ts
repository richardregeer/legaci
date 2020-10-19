import { FileDoesNotExistsError } from "../../core/error/FileDoesNotExistsError";
import { ExtractorInterface } from "../../core/extractor/ExtractorInterface";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { CommandInterface } from "../../core/command/CommandInterface";

export class ZipExtractor implements ExtractorInterface {
    private _logger: LoggerInterface;
    private _fileHandler: FileHandlerInterface;
    private _shell: CommandInterface;

    /**
     * @param  {FileHandlerInterface} fileHandler
     * @param  {LoggerInterface} logger
     * @param  {ShellInterface} shell
     */
    public constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface, shell: CommandInterface) {
        this._logger = logger;
        this._shell = shell;
        this._fileHandler = fileHandler;
    }
    
    /**
     * @param  {string} source
     * @param  {string} destination
     * @throws {FileDoesNotExistsError}
     * @returns Promise<void>
     */
    public async extract(source: string, destination: string): Promise<void> {
        if (!this._fileHandler.existsSync(source)) {
            throw new FileDoesNotExistsError(`Unable to extract ${source} does not exists`);
        }

        this._fileHandler.createDirWhenNotExistsSync(destination);

        try {
            const command = `unzip "${source}" -d ${destination}`;
            this._logger.info('Extracting game file using unzip');
            this._shell.executeSync(command, false);
                
            this._logger.info(`Finished extracting game file to path ${destination}`);
        } catch (error) {
            this._logger.error(`Unable to extract game file ${destination},`, error);
    
          throw error;
        }
    }
}