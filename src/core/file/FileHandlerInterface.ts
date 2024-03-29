import { FileType } from './FileType';

export interface FileHandlerInterface {
  /**
   * @param  {boolean} ignoreCase
   * @param  {string} source
   * @param  {string[]} ...glob
   * @returns Array<string>
   */
  findFilesSync(ignoreCase: boolean, source: string, ...glob: string[]): string[];

  /**
   * @param  {string[]} ...glob
   * @returns void
   */
  removeFilesSync(...glob: string[]): void;

  /**
   * @param  {string} source
   * @param  {string} destination
   * @param  {boolean} recursive
   * @returns void
   */
  moveDirectorySync(source: string, destination: string, recursive: boolean): void;

  /**
   * @param  {string} destination
   * @param  {string} contents
   * @returns void
   */
  writeSync(destination: string, contents: string): void;

  /**
   * @param  {string} source
   * @param  {string} destination
   * @returns void
   */
  copySync(source: string, destination: string): void;

  /**
   * @param  {string} glob
   * @param  {string} destination
   * @returns boolean
   */
  copyFilesSync(glob: string, destination: string): void;

  /**
   * @param  {string} source
   * @returns string
   */
  readSync(source: string): string;

  /**
   * @param  {string} source
   * @returns string[]
   */
  readDirSync(source: string): string[];

  /**
   * @param  {string} source
   * @returns string
   */
  readFileHeaderSync(source: string, lines: number): string;

  /**
   * @param  {string} source
   * @param  {boolean} ignoreCase
   * @returns boolean
   */
  existsSync(source: string, ignoreCase: boolean): boolean;

  /**
   * @param  {string} source
   * @returns boolean
   */
  createDirWhenNotExistsSync(source: string): boolean;

  /**
   * @param  {string} destination
   * @returns string
   */
  createTempFolderSync(destination: string): string;

  /**
   * @param  {string} source
   * @returns FileType
   */
  resolveFileTypeSync(source: string): FileType;

  /**
   * @param  {string} source
   * @returns string
   */
  resolveFileName(source: string): string;

  /**
   * @param  {string} source
   * @returns void
   */
  makeFileExecutabeSync(source: string): void;
}
