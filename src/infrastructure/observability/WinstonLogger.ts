import { Chalk } from 'chalk';
import { Logger } from 'winston';
import { LoggerInterface } from '../../core/observability/LoggerInterface';

export class WinstonLogger implements LoggerInterface {
  private readonly _logger: Logger;
  private readonly _chalk: Chalk;
  private readonly _debug: boolean;

  /**
   * Create Winstong logger adapter
   *
   * @param logger The Winston logger
   * @param chalk Chalk color library
   * @param debug If the logger is in debug mode
   */
  constructor(logger: Logger, chalk: Chalk, debug: boolean) {
    this._logger = logger;
    this._chalk = chalk;
    this._debug = debug;
  }

  /**
   * Create a debug log message
   *
   * @param message The message to log
   * @returns void
   */
  public debug(message: string): void {
    this._logger.debug(this._chalk.green(message));
  }

  /**
   * Create a information log message
   *
   * @param message The message to log
   * @returns void
   */
  public info(message: string): void {
    this._logger.info(this._chalk.cyan(message));
  }

  /**
   * Create a warning log message
   *
   * @param message The message to log
   * @returns void
   */
  public warning(message: string): void {
    this._logger.warn(this._chalk.yellow(message));
  }

  /**
   * Create an error log message
   *
   * @param message The message to log
   * @param error The error to log
   * @returns void
   */
  public error(message: string, error: Error): void {
    if (this._debug) {
      this._logger.error(this._chalk.red(message));
      this._logger.error(error.stack);
    } else {
      this._logger.error(this._chalk.red(message));
    }
  }
}
