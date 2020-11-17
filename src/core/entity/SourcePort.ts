export class SourcePort {
  private readonly _name: string;
  private readonly _version: string;

  /**
   * @param  {string} name
   * @param  {string} version
   */
  public constructor(name : string, version : string) {
    this._name = name;
    this._version = version;
  }
  /**
   * @returns string
   */
  public get version(): string {
    return this._version;
  }

  /**
   * @returns string
   */
  public get name(): string {
    return this._name;
  }
}
