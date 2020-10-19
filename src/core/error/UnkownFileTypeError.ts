export class UnknownFileTypeError extends Error {
    
    /**
     * @param  {string} message
     */
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnknownFileTypeError.prototype);
    }
}