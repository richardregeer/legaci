import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { ExtractorInterface } from '../../core/extractor/ExtractorInterface';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CommandInterface } from '../../core/command/CommandInterface';
import chalk from 'chalk';

export class DirectoryExtractor implements ExtractorInterface {
  private readonly _logger: LoggerInterface;
  private readonly _fileHandler: FileHandlerInterface;
  private readonly _shell: CommandInterface;

  /**
   * Extractor that copies the directory files
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
   * Extract the given source directory to the given destination
   *
   * @param source - The source of the directory to extract
   * @param destination - The destination folder of the files
   * @throws FileDoesNotExistsError When the given source does not exists
   * @returns Promise<void>
   */
  public async extract(source: string, destination: string): Promise<void> {
    if (!this._fileHandler.existsSync(source, false)) {
      throw new FileDoesNotExistsError(`Unable to extract ${chalk.underline.white(source)} does not exists`);
    }

    this._fileHandler.createDirWhenNotExistsSync(destination);

    try {
      this._fileHandler.copyFilesSync(`${source}*`, `${destination}`);

      this._logger.info(`Finished extracting game directory to path ${chalk.underline.white(destination)}`);
    } catch (error) {
      this._logger.error(`Unable to extract game directiry${chalk.underline.white(source)},`, error);

      throw error;
    }
  }
}
