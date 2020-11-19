import { SourceType } from '../../core/entity/SourceType';
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { SourceTypeResolverInterface } from '../../core/resolver/SourceTypeResolverInterface';

export class GOGScummVMSourceTypeResolver implements SourceTypeResolverInterface {
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
    return SourceType.GOG_SCUMMVM;
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

    const scummVMFiles = this._fileHandler.findFilesSync(true, source, '**/scummvm/');
    return scummVMFiles.length > 0;
  }
}
