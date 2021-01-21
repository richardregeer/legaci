import { SourceType } from '../../core/entity/SourceType';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { SourceTypeResolverInterface } from '../../core/resolver/SourceTypeResolverInterface';

export class GOGDosboxSourceTypeResolver implements SourceTypeResolverInterface {
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * GOG Dosbox source type resolver
   *
   * @param fileHandler - File handler utility
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * Returns the type of the source
   *
   * @returns SourceType
   */
  public getSourceType(): SourceType {
    return SourceType.GOG_DOSBOX;
  }

  /**
   * Determine if the given source is a GOG Dosbox package
   *
   * @param source - The source path to detremine the source type for
   * @returns boolean
   */
  public isSourceType(source: string): boolean {
    const files = this._fileHandler.findFilesSync(true, source, '**/gog*');

    if (files.length === 0) {
      return false;
    }

    const dosBoxFiles = this._fileHandler.findFilesSync(true, source, '**/Dosbox/');
    return dosBoxFiles.length > 0;
  }
}
