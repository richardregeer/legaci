export class UnableToResolveError extends Error {
  /**
   * Error when resolving the game configuration
   *
   * @param message The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnableToResolveError.prototype);
  }
}
