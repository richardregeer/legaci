export interface CommandInterface {
  /**
   * @param command - The command that will be executed
   * @param silent - Weather the command output is suppressed
   * @returns Promise<number>
   */
  execute(command: string, silent: boolean): Promise<number>;
}
