export class FileDoesNotExistsError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, FileDoesNotExistsError.prototype);
  }
}
