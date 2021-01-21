export class UnknownFileTypeError extends Error {
  /**
   * Error when the resolved file type can not be determined
   *
   * @param message - The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnknownFileTypeError.prototype);
  }
}
