export class UnableToResolveError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnableToResolveError.prototype);
  }
}
