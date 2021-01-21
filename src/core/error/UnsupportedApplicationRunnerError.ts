export class UnsupportedApplicationRunnerError extends Error {
  /**
   * Error when the given application runner is not supporting the game
   *
   * @param message - The message of the error
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnsupportedApplicationRunnerError.prototype);
  }
}
