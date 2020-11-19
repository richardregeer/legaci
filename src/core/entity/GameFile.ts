export class GameFile {
  private readonly _name: string;
  private readonly _location: string;

  /**
   * A additinal file for the game to install
   *
   * @param name - The name of the file to install
   * @param location - The file location of the file to install
   */
  constructor(name: string, location: string) {
    this._name = name;
    this._location = location;
  }

  /**
   * Get the name of the file to install
   *
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Get the file location of the file to install
   *
   * @returns string
   */
  public get location(): string {
    return this._location;
  }
}
