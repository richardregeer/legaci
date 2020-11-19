export class UnknownFileTypeError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnknownFileTypeError.prototype);
  }
}
