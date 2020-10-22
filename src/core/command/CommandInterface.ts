export interface CommandInterface {
    
    /**
     * @param  {string} command
     * @param  {boolean} silent
     * @returns Promise
     */
    execute(command: string, silent: boolean): Promise<number>;
}