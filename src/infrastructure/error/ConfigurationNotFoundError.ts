export class ConfigurationNotFoundError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConfigurationNotFoundError.prototype);
  }
}
