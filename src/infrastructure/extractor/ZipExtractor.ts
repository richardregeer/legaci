import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { ExtractorInterface } from '../../core/extractor/ExtractorInterface';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CommandInterface } from '../../core/command/CommandInterface';
import chalk from 'chalk';
import { FileType } from '../../core/file/FileType';

export class ZipExtractor implements ExtractorInterface {
  private readonly _logger: LoggerInterface;
  private readonly _fileHandler: FileHandlerInterface;
  private readonly _shell: CommandInterface;

  /**
   * Extractor that uses Unzip to extract the file
   *
   * @param fileHandler - Handler to manipulate files
   * @param logger - The logger
   * @param shell - The command shell
   */
  constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface, shell: CommandInterface) {
    this._logger = logger;
    this._shell = shell;
    this._fileHandler = fileHandler;
  }

  /**
   * Extract the given source file to the given destination with Unzip
   *
   * @param source - The source of the file to extract
   * @param destination - The destination folder of the extracted files
   * @throws FileDoesNotExistsError When the given source does not exists
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

      // If zip file root only contains one directory, move all files from that folder to the root of the destination.
      const files = this._fileHandler.readDirSync(destination);
      if (
        files.length === 1 &&
        this._fileHandler.resolveFileTypeSync(`${destination}/${files[0]}`) === FileType.DIRECTORY
      ) {
        this._fileHandler.moveDirectorySync(`${destination}/${files[0]}`, destination, true);
        this._fileHandler.removeFilesSync(`${destination}/${files[0]}`);
      }

      // If the extracted data is in a noarch folder, move all files from that folder to the root of the destination.
      if (this._fileHandler.existsSync(`${destination}/data/noarch/`, true)) {
        this._fileHandler.moveDirectorySync(`${destination}/data/noarch/data`, `${destination}/data`, true);
        this._fileHandler.moveDirectorySync(`${destination}/data/noarch`, `${destination}`, true);
        this._fileHandler.removeFilesSync(`${destination}/data/noarch/`);
        this._fileHandler.removeFilesSync(`${destination}/scripts`);
        this._fileHandler.removeFilesSync(`${destination}/meta`);
      }

      this._logger.info(`Finished extracting game file to path ${chalk.underline.white(destination)}`);
    } catch (error) {
      this._logger.error(`Unable to extract game file${chalk.underline.white(source)},`, error);

      throw error;
    }
  }
}
