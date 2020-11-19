export class GameConfigurationNotFoundError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, GameConfigurationNotFoundError.prototype);
  }
}
