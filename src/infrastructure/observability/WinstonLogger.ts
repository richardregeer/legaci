import { Chalk } from "chalk";
import { Logger } from "winston";
import { LoggerInterface } from "../../core/observability/LoggerInterface";

export class WinstonLogger implements LoggerInterface {
  private _logger: Logger;
  private _chalk: Chalk;
  private _debug: boolean;

  /**
   * @param  {Logger} logger
   * @param  {Chalk} chalk
   */
  constructor(logger: Logger, chalk: Chalk) {
    this._logger = logger;
    this._chalk = chalk;
    this._debug = true;
  }

  /**
   * @param  {string} message
   * @returns void
   */
  public debug(message: string): void {
    this._logger.debug(this._chalk.green(message));
  }

  /**
   * @param  {string} message
   * @returns void
   */
  public info(message: string): void {
    this._logger.info(this._chalk.cyan(message));
  }

  /**
   * @param  {string} message
   * @returns void
   */
  public warning(message: string): void {
    this._logger.warn(this._chalk.yellow(message));
  }

  /**
   * @param  {string} message
   * @param  {Error} error
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
