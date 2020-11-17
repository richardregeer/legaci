export class GameFile {
  private readonly _name: string;
  private readonly _location: string;

  /**
   * @param  {string} name
   * @param  {string} locagion
   * @param  {string} url
   */
  public constructor(name : string, location : string) {
    this._name = name;
    this._location = location;
  }

  /**
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @returns string
   */
  public get location(): string {
    return this._location;
  }
}
