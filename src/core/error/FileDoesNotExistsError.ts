export class FileDoesNotExistsError extends Error {
  /**
   * Error when a given file can't be found
   *
   * @param message The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, FileDoesNotExistsError.prototype);
  }
}
