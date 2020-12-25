export class ConfigurationNotFoundError extends Error {
  /**
   * Error when configuration can't be found
   *
   * @param message The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConfigurationNotFoundError.prototype);
  }
}
