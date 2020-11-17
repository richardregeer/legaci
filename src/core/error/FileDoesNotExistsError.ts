export class FileDoesNotExistsError extends Error {
  /**
   * @param  {string} message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, FileDoesNotExistsError.prototype);
  }
}
