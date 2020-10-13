export interface ShellInterface {
    
    /**
     * @param  {string} command
     * @param  {boolean} silent
     */
    executeSync(command: string, silent: boolean);
}