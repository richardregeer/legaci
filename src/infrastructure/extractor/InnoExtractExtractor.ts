import { FileDoesNotExistsError } from "../../core/errors/FileDoesNotExistsError";
import { ExtractorInterface } from "../../core/extractor/ExtractorInterface";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { LoggerInterface } from "../../core/observability/LoggingInterface";
import { ShellInterface } from "../../core/shell/ShellIInterface";

 export class InnoExtractExtractor implements ExtractorInterface {
    private _logger: LoggerInterface;
    private _fileHandler: FileHandlerInterface;
    private _shell: ShellInterface;

    /**
     * @param  {FileHandlerInterface} fileHandler
     * @param  {LoggerInterface} logger
     * @param  {ShellInterface} shell
     */
    public constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface, shell: ShellInterface) {
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
            const command = `innoextract "${source}" -g -d ${destination}`;
            this._logger.info('Extracting game file using Innoextract');
            this._shell.executeSync(command, false);

            this._logger.info(`Finished extracting game file to path ${destination}`);
        } catch (error) {
            this._logger.error(`Unable to extract game file ${source}`, error);
            throw error;
        }
    }
}