import path = require('path');
import fs = require('fs');
import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { FileDoesNotExistsError } from '../../core/error/FileDoesNotExistsError';
import { FileType } from '../../core/file/FileType';
import { UnknownFileTypeError } from '../../core/error/UnkownFileTypeError';
import { cp, find, mv, rm, ShellConfig, head } from 'shelljs';

export class FileHandler implements FileHandlerInterface {
  private readonly _shellConfig: ShellConfig;

  /**
   * Utility class for file handling
   *
   * @param shellConfig - Shell configuration
   */
  constructor(shellConfig: ShellConfig) {
    this._shellConfig = shellConfig;
  }

  /**
   * Remove files
   *
   * @param glob[] - Remove all given files
   * @param glob
   * @returns void
   */
  public removeFilesSync(...glob: string[]): void {
    rm('-rf', glob);
  }

  /**
   * Find files in source folder
   *
   * @param ignoreCase - Ignore file casing
   * @param source - The source folder to find the files
   * @param glob - The glob pattern to search fore
   * @returns string[]
   */
  public findFilesSync(ignoreCase: boolean, source: string, ...glob: string[]): string[] {
    this._shellConfig.silent = true;
    let files = find(`${source}/${glob.toString()}`);

    if (files.length === 0 && ignoreCase) {
      files = find(glob.map((x) => `${source}/${x.toUpperCase()}`));
    }

    if (files.length === 0 && ignoreCase) {
      files = find(glob.map((x) => `${source}/${x.toLowerCase()}`));
    }

    // if (ignoreCase) {
    //   const upperCase = [...files, find(glob.map((x) => `${source}/${x.toUpperCase()}`))];
    //   const lowerCase = find(glob.map((x) => `${source}/${x.toLowerCase()}`));

    //   return [...(upperCase as string[]), ...(lowerCase as string[]), ...(files as string[])];
    // }

    return files as string[];
  }

  /**
   * Move files to destination
   *
   * @param glob - The search pattern to move.
   * @param destination - The destinaton to move to files to
   * @returns void
   */
  public moveFilesSync(glob: string, destination: string): void {
    this._shellConfig.silent = true;
    mv(glob, destination);
  }

  /**
   * Create a tempory folder
   *
   * @param destination - The path to cretea the folder in
   * @returns string
   */
  public createTempFolderSync(destination: string): string {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `${destination}/${randomFolder}`;

    this.createDirWhenNotExistsSync(tempFolder);

    return tempFolder;
  }

  /**
   * Validate if the given file exists
   *
   * @param source - The file to validate if it exists
   * @param ignoreCase - Ignore the file casing. Default false
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
   * Create the directory if it does not exists
   *
   * @param source - The directory name
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
   * Write a string to a file
   *
   * @param destination - The location where to write the string
   * @param contentsThe - contents to write
   * @param contents
   * @returns void
   */
  public writeSync(destination: string, contents: string): void {
    this.createDirWhenNotExistsSync(destination);
    fs.writeFileSync(destination, contents);
  }

  /**
   * Copy a file to a given destination folder
   *
   * @param source - The file to copy
   * @param destination - The location to copy the file to
   * @throws FileDoesNotExistsError Will be thrown if the source file not exist
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
   * Copy all files that match the given pattern
   *
   * @param glob - The files to copy the matching pattern
   * @param destination - The destination
   * @returns boolean
   */
  public copyFilesSync(glob: string, destination: string): void {
    this._shellConfig.silent = true;
    cp('-r', glob, destination);
  }

  /**
   * Read a text file
   *
   * @param source - The file to read
   * @throws FileDoesNotExistsError Will be thrown when the given file does not exists
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
   * Read the header of a file
   *
   * @param source - The file to read
   * @param lines - The amount of lines of the header
   * @throws FileDoesNotExistsError Will be thrown when the given file does not exists
   * @returns string
   */
  public readFileHeaderSync(source: string, lines: number): string {
    const fileName = path.basename(source);

    if (!this.existsSync(source)) {
      throw new FileDoesNotExistsError(`File ${fileName} does not exists`);
    }

    return head({ '-n': lines }, source);
  }

  /**
   * Resolve the file extension
   *
   * @param source - The file to resolve the extension of
   * @throws UnknownFileTypeError Will be thrown when the extension is unknown
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
   * Resolves the name of the file
   *
   * @param source - The file to resolve the name of
   * @returns string
   */
  public resolveFileName(source: string): string {
    const extName = path.extname(source);

    return path.basename(source).replace(extName, '');
  }

  /**
   * Make the given file executable
   *
   * @param source - The file to make executable
   * @returns void
   * @throws FileDoesNotExistsError Will be thrown if the file does not exists
   */
  public makeFileExecutabeSync(source: string): void {
    const fileName = path.basename(source);

    if (!this.existsSync(source)) {
      throw new FileDoesNotExistsError(`File ${fileName} does not exists`);
    }

    fs.chmodSync(source, fs.constants.S_IRWXU | fs.constants.S_IRGRP | fs.constants.S_IROTH);
  }
}
