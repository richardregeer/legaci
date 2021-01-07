import { Chalk } from 'chalk';
import { createLogger, transports, format } from 'winston';
import { LoggerInterface } from '../../core/observability/LoggerInterface';
import { WinstonLogger } from './WinstonLogger';

const { printf } = format;

export class LoggerFactory {
  private readonly _chalk: Chalk;

  /**
   * Create logger instances
   *
   * @param chalk The console collor library
   */
  constructor(chalk: Chalk) {
    this._chalk = chalk;
  }

  /**
   * Create new logger instance
   *
   * @returns LoggerInterface
   */
  public createLogger(): LoggerInterface {
    const customFormat = printf(({ message }) => {
      return `${message}`;
    });

    const winstonLogger = createLogger({
      level: 'info',
      format: customFormat,
      transports: [new transports.Console()],
    });

    return new WinstonLogger(winstonLogger, this._chalk, true);
  }
}
