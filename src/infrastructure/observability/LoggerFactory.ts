import { Chalk } from 'chalk';
import { createLogger, transports, format } from 'winston';
import { WinstonLogger } from './WinstonLogger';

const { printf } = format;

export class LoggerFactory {
  private readonly _chalk: Chalk;
  
  /**
   * @param  {Chalk} chalk
   */
  public constructor(chalk: Chalk) {
    this._chalk = chalk;
  }
  
  /**
   * @returns WinstonLogger
   */
  public createLogger(): WinstonLogger {
    const customFormat = printf(({ message }) => {
      return `${message}`;
    });

    const winstonLogger = createLogger({
      level: 'info',
      format: customFormat,
      transports: [
        new transports.Console()
      ]
    });

    return new WinstonLogger(winstonLogger, this._chalk);
  }
}