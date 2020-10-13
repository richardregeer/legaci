export interface LoggerInterface {
    
    /**
     * @param  {string} message
     * @returns void
     */
    info(message: string): void;
    
    /**
     * @param  {string} message
     * @returns void
     */
    debug(message: string): void;
    
    /**
     * @param  {string} message
     * @returns void
     */
    warning(message: string): void;
    
    /**
     * @param  {string} message
     * @param  {Error} error
     * @returns void
     */
    error(message: string, error: Error): void;
}