export class SourcePort {
  private readonly _name: string;
  private readonly _version: string;

  /**
   * Available Sourceport for the game to install
   *
   * @param name - The name of the sourceport
   * @param version - The version of the sourceport
   */
  constructor(name: string, version: string) {
    this._name = name;
    this._version = version;
  }

  /**
   * Get the version of the sourceport
   *
   * @returns string
   */
  public get version(): string {
    return this._version;
  }

  /**
   * Get the name of the sourceport
   *
   * @returns string
   */
  public get name(): string {
    return this._name;
  }
}
