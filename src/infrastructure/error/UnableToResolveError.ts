export class UnableToResolveError extends Error {
  /**
     * @param  {string} message
     */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnableToResolveError.prototype);
  }
}
