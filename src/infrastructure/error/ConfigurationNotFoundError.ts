export class ConfigurationNotFoundError extends Error {
    
    /**
     * @param  {string} message
     */
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConfigurationNotFoundError.prototype);
    }
}