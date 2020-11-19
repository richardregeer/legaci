import { ExecFunction, ShellConfig } from 'shelljs';
import { CommandInterface } from '../../core/command/CommandInterface';

export class ShellCommand implements CommandInterface {
  private readonly _execute: ExecFunction;
  private readonly _shellConfig: ShellConfig;

  /**
   * @param shellExecute
   * @param shellConfig
   */
  constructor(shellExecute: ExecFunction, shellConfig: ShellConfig) {
    this._execute = shellExecute;
    this._shellConfig = shellConfig;
  }

  /**
   * @param command
   * @param silent
   * @returns Promise
   */
  public async execute(command: string, silent: boolean): Promise<number> {
    this._shellConfig.silent = silent;

    return Promise.resolve(this._execute(command).code);
  }
}
