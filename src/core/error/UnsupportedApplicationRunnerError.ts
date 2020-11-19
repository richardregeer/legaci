export class UnsupportedApplicationRunnerError extends Error {
  /**
   * @param message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnsupportedApplicationRunnerError.prototype);
  }
}
