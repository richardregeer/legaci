export interface CommandInterface {
    
    /**
     * @param  {string} command
     * @param  {boolean} silent
     * @returns number
     */
    executeSync(command: string, silent: boolean): number;
}