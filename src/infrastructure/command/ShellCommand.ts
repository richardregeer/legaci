import { ExecFunction, ShellConfig } from 'shelljs';
import { CommandInterface } from '../../core/command/CommandInterface';

export class ShellCommand implements CommandInterface {
  private readonly _execute: ExecFunction;
  private readonly _shellConfig: ShellConfig;

  /**
   * Shell command that will be executed in terminal
   *
   * @param shellExecute - The shell command to execute
   * @param shellConfig - The shell configuration
   */
  constructor(shellExecute: ExecFunction, shellConfig: ShellConfig) {
    this._execute = shellExecute;
    this._shellConfig = shellConfig;
  }

  /**
   * Execute the command
   *
   * @param command - The shell command to execute
   * @param silent - Output shell command or not
   * @returns Promise
   */
  public async execute(command: string, silent: boolean): Promise<number> {
    this._shellConfig.silent = silent;

    return this._execute(command).code;
  }
}
