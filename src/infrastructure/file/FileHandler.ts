import path = require('path');
import fs = require('fs');
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { FileType } from '../../core/file/FileType';
import { UnknownFileTypeError } from '../../core/error/UnkownFileTypeError';

export class FileHandler implements FileHandlerInterface {
  /**
   * @param  {string} destination
   * @returns string
   */
  public createTempFolderSync(destination: string): string {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `${destination}/${randomFolder}`;

    this.createDirWhenNotExistsSync(tempFolder);

    return tempFolder;
  }
  
  /**
   * @param  {string} source
   * @returns boolean
   */
  public existsSync(source: string): boolean {
    if (!fs.existsSync(source)) {
      return false;
    }  

    return true;
  }
  
  /**
   * @param  {string} source
   * @returns boolean
   */
  public createDirWhenNotExistsSync(source: string): boolean {
    const dirName = path.dirname(source);

    if (!this.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
      return true;
    }

    return false;
  }

  /**
   * @param  {string} destination
   * @param  {string} contents
   * @returns void
   */
  public writeSync(destination: string, contents: string): void {
    this.createDirWhenNotExistsSync(destination);
    fs.writeFileSync(destination, contents);
  }

  /**
   * @param  {string} source
   * @param  {string} destination
   * @throws FileDoesNotExistsError
   * @returns void
   */
  public copySync(source: string, destination: string): void {
    const sourceDirName = path.dirname(source);
    const fileName = path.basename(source);

    if (!this.existsSync(source)) {
      throw new FileDoesNotExistsError(`Unable to copy file ${fileName} from ${sourceDirName}, it does not exists`);
    }

    this.createDirWhenNotExistsSync(destination);
    fs.copyFileSync(source, destination);
  }

  /**
   * @param  {string} source
   * @throws FileDoesNotExistsError
   * @returns string
   */
  public readSync(source: string): string {
    const fileName = path.basename(source);

    if (!this.existsSync(source)) {
      throw new FileDoesNotExistsError(`File ${fileName} does not exists`);
    }

    return fs.readFileSync(source).toString();
  }
 
  /**
  * @param  {string} source
  * @throws UnknownFileTypeError
  * @returns FileType
  */
  public resolveFileTypeSync(source: string): FileType  {
      const extName = path.extname(source);

      switch (extName.toLowerCase()) {
        case '.zip': return FileType.ZIP;
        case '.sh': return FileType.SH;
        case '.exe': return FileType.EXE;
        default:
      }

      throw new UnknownFileTypeError(`Unknown file type ${extName}`);
  }

  /**
   * @param  {string} source
   * @returns void
   * @throws FileDoesNotExistsError
   */
  public makeFileExecutabeSync(source: string): void {
    const fileName = path.basename(source);

    if (!this.existsSync(source)) {
      throw new FileDoesNotExistsError(`File ${fileName} does not exists`);
    }

    fs.chmodSync(source, fs.constants.S_IRWXU | fs.constants.S_IRGRP | fs.constants.S_IROTH);
  }
}