export class GameConfigurationNotFoundError extends Error {
  /**
   * Error when a given game configuration can't be found
   *
   * @param message The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, GameConfigurationNotFoundError.prototype);
  }
}
