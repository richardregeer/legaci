import { Chalk } from 'chalk';
import { Logger } from 'winston';
import { LoggerInterface } from '../../core/observability/LoggingInterface';

export class WinstonLogger implements LoggerInterface {
  private _logger: Logger; 
  private _chalk: Chalk;
  
  /**
   * @param  {Logger} logger
   * @param  {Chalk} chalk
   */
  constructor(logger: Logger, chalk: Chalk) {
    this._logger = logger;
    this._chalk = chalk;
  }
  
  /**
   * @param  {string} message
   * @returns void
   */
  public debug(message: string): void {
    this._logger.debug(message);
  }

  /**
   * @param  {string} message
   * @returns void
   */
  public info(message: string): void {
    this._logger.info(message);
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
    this._logger.error(this._chalk.red(message));
  }
}