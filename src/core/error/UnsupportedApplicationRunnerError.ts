export class UnsupportedApplicationRunnerError extends Error {
  /**
   * @param  {string} message
   */
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnsupportedApplicationRunnerError.prototype);
  }
}
