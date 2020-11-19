import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { ExtractorInterface } from '../../core/extractor/ExtractorInterface';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { CommandInterface } from '../../core/command/CommandInterface';
import chalk from 'chalk';

export class InnoExtractExtractor implements ExtractorInterface {
  private readonly _logger: LoggerInterface;
  private readonly _fileHandler: FileHandlerInterface;
  private readonly _shell: CommandInterface;

  /**
   * @param fileHandler
   * @param logger
   * @param shell
   */
  constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface, shell: CommandInterface) {
    this._logger = logger;
    this._shell = shell;
    this._fileHandler = fileHandler;
  }

  /**
   * Extract the given source file to the given destination with InnoExtract
   *
   * @param source - The source of the file to extract
   * @param destination - The destination folder of the extracted files
   * @returns Promise<void>
   */
  public async extract(source: string, destination: string): Promise<void> {
    if (!this._fileHandler.existsSync(source, false)) {
      throw new FileDoesNotExistsError(`Unable to extract ${chalk.underline.white(source)} does not exists`);
    }

    this._fileHandler.createDirWhenNotExistsSync(destination);

    try {
      const command = `innoextract "${source}" -g -d ${destination}`;
      this._logger.info('Extracting game file using Innoextract');
      await this._shell.execute(command, false);

      this._logger.info(`Finished extracting game file to path ${chalk.underline.white(destination)}`);
    } catch (error) {
      this._logger.error(`Unable to extract game file ${chalk.underline.white(source)}`, error);
      throw error;
    }
  }
}
