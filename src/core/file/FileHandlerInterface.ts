import { FileType } from "./FileType";

export interface FileHandlerInterface {
    
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
     * @param  {string} source
     * @returns string
     */
    
    /**
     * @param  {string} source
     * @returns string
     */
    readSync(source: string): string;
    
    /**
     * @param  {string} source
     * @returns boolean
     */
    existsSync(source: string): boolean;
    
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
}