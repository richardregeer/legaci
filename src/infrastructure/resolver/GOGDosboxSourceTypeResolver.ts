import { SourceType } from '../../core/entity/SourceType';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { SourceTypeResolverInterface } from '../../core/resolver/SourceTypeResolverInterface';

export class GOGDosboxSourceTypeResolver implements SourceTypeResolverInterface {
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * @param fileHandler
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * @returns SourceType
   */
  public getSourceType(): SourceType {
    return SourceType.GOG_DOSBOX;
  }

  /**
   * @param source
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
