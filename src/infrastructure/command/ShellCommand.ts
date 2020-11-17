import { ExecFunction, ShellConfig } from "shelljs";
import { CommandInterface } from "../../core/command/CommandInterface";

export class ShellCommand implements CommandInterface {
  private readonly _execute: ExecFunction;
  private readonly _shellConfig: ShellConfig;

  /**
   * @param  {ExecFunction} shellExecute
   * @param  {ShellConfig} shellConfig
   */
  public constructor(shellExecute: ExecFunction, shellConfig: ShellConfig) {
    this._execute = shellExecute;
    this._shellConfig = shellConfig;
  }

  /**
   * @param  {string} command
   * @param  {boolean} silent
   * @returns Promise
   */
  public async execute(command: string, silent: boolean): Promise<number> {
    this._shellConfig.silent = silent;

    return Promise.resolve(this._execute(command).code);
  }
}
