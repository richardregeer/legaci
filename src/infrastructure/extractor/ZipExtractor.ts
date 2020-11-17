import { FileDoesNotExistsError } from "../../core/error/FileDoesNotExistsError";
import { ExtractorInterface } from "../../core/extractor/ExtractorInterface";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { LoggerInterface } from "../../core/observability/LoggerInterface";
import { CommandInterface } from "../../core/command/CommandInterface";
import chalk from 'chalk';

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
    if (!this._fileHandler.existsSync(source, false)) {
      throw new FileDoesNotExistsError(`Unable to extract ${chalk.underline.white(source)} does not exists`);
    }

    this._fileHandler.createDirWhenNotExistsSync(destination);

    try {
      const command = `unzip -o "${source}" -d ${destination}`;
      this._logger.info('Extracting game file using unzip');
      await this._shell.execute(command, false);

      // If the name of the zip file is a folder in the archive, move all files from that folder to the root of the destination.
      const fileName = this._fileHandler.resolveFileName(source);
      if (this._fileHandler.existsSync(`${destination}/${fileName}`, true)) {
        this._fileHandler.copyFilesSync(`${destination}/${fileName}/*`, destination);
      }

      this._logger.info(`Finished extracting game file to path ${chalk.underline.white(destination)}`);
    } catch (error) {
      this._logger.error(`Unable to extract game file${chalk.underline.white(source)},`, error);

      throw error;
    }
  }
}
