import { CommandInterface } from '../../core/command/CommandInterface';
import { UnknownFileTypeError } from '../../core/error/UnkownFileTypeError';
import { ExtractorFactoryInterface } from '../../core/extractor/ExtractorFactoryInterface';
import { ExtractorInterface } from '../../core/extractor/ExtractorInterface';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { FileType } from '../../core/file/FileType';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { InnoExtractExtractor } from './InnoExtractExtractor';
import { ZipExtractor } from './ZipExtractor';

export class ExtractorFactory implements ExtractorFactoryInterface {
  private readonly _fileHandler: FileHandlerInterface;
  private readonly _shell: CommandInterface;
  private readonly _logger: LoggerInterface;

  /**
   * Create a new extractor to extract the game files
   *
   * @param fileHandler - The handler to handle the game files
   * @param logger - Logger
   * @param shell - the command shell
   */
  constructor(fileHandler: FileHandlerInterface, logger: LoggerInterface, shell: CommandInterface) {
    this._fileHandler = fileHandler;
    this._shell = shell;
    this._logger = logger;
  }

  /**
   * Create a new extractor based on the given source file
   *
   * @param source - The source file containing the game to install
   * @throws UnknownFileTypeError
   * @returns ExtractorInterface
   */
  public create(source: string): ExtractorInterface {
    const fileType = this._fileHandler.resolveFileTypeSync(source);

    if (fileType === FileType.EXE) {
      return new InnoExtractExtractor(this._fileHandler, this._logger, this._shell);
    }

    if (fileType === FileType.ZIP) {
      return new ZipExtractor(this._fileHandler, this._logger, this._shell);
    }

    throw new UnknownFileTypeError('Filetype is not supported for install');
  }
}
