import path = require('path');
import fs = require('fs');
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { FileType } from '../../core/file/FileType';
import { UnknownFileTypeError } from '../../core/error/UnkownFileTypeError';
import { cp, find, mv, rm, ShellConfig } from 'shelljs';

export class FileHandler implements FileHandlerInterface {
  private readonly _shellConfig: ShellConfig;

  /**
   * @param shellConfig
   */
  constructor(shellConfig: ShellConfig) {
    this._shellConfig = shellConfig;
  }

  /**
   * @param ...glob
   * @param glob
   * @returns void
   */
  public removeFilesSync(...glob: string[]): void {
    rm('-rf', glob);
  }

  /**
   * @param ignoreCase
   * @param source
   * @param ...glob
   * @param glob
   * @returns Array
   */
  public findFilesSync(ignoreCase: boolean, source: string, ...glob: string[]): string[] {
    this._shellConfig.silent = true;
    let files = find(`${source}/${glob.toString()}`);

    if (files.length === 0 && ignoreCase) {
      files = find(glob.map((x) => `${source}/${x.toLocaleUpperCase()}`));
    }

    if (files.length === 0 && ignoreCase) {
      files = find(glob.map((x) => `${source}/${x.toLowerCase()}`));
    }

    return files as string[];
  }

  /**
   * @param glob
   * @param destination
   * @returns void
   */
  public moveFilesSync(glob: string, destination: string): void {
    this._shellConfig.silent = true;
    mv(glob, destination);
  }

  /**
   * @param destination
   * @returns string
   */
  public createTempFolderSync(destination: string): string {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `${destination}/${randomFolder}`;

    this.createDirWhenNotExistsSync(tempFolder);

    return tempFolder;
  }

  /**
   * @param source
   * @param ignoreCase=false
   * @param ignoreCase
   * @returns boolean
   */
  public existsSync(source: string, ignoreCase = false): boolean {
    const dirName = path.dirname(source);
    const fileName = path.basename(source);

    if (!fs.existsSync(source)) {
      if (ignoreCase) {
        let correctedFileName = fileName.toLowerCase();
        if (fs.existsSync(dirName + `/${correctedFileName}`)) {
          return true;
        }

        correctedFileName = fileName.toUpperCase();
        if (fs.existsSync(dirName + `/${correctedFileName}`)) {
          return true;
        }
      }

      return false;
    }

    return true;
  }

  /**
   * @param source
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
   * @param destination
   * @param contents
   * @returns void
   */
  public writeSync(destination: string, contents: string): void {
    this.createDirWhenNotExistsSync(destination);
    fs.writeFileSync(destination, contents);
  }

  /**
   * @param source
   * @param destination
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
   * @param glob
   * @param destination
   * @returns boolean
   */
  public copyFilesSync(glob: string, destination: string): void {
    this._shellConfig.silent = true;
    cp('-r', glob, destination);
  }

  /**
   * @param source
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
   * @param source
   * @throws UnknownFileTypeError
   * @returns FileType
   */
  public resolveFileTypeSync(source: string): FileType {
    const extName = path.extname(source);

    switch (extName.toLowerCase()) {
      case '.zip':
        return FileType.ZIP;
      case '.sh':
        return FileType.SH;
      case '.exe':
        return FileType.EXE;
    }

    throw new UnknownFileTypeError(`Unknown file type ${extName}`);
  }

  /**
   * @param source
   * @returns string
   */
  public resolveFileName(source: string): string {
    const extName = path.extname(source);

    return path.basename(source).replace(extName, '');
  }

  /**
   * @param source
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
