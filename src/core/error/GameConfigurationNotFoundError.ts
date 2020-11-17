export class GameConfigurationNotFoundError extends Error {
  /**
   * @param  {string} message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, GameConfigurationNotFoundError.prototype);
  }
}
