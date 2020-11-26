export class Store {
  private readonly _name: string;
  private readonly _id: string;
  private readonly _url: string;

  /**
   * The store where you can buy the
   *
   * @param name The name of the store
   * @param id The game id of the game to install on the store
   * @param url The url to the store page where you can buy the game
   */
  constructor(name: string, id: string, url: string) {
    this._name = name;
    this._id = id;
    this._url = url;
  }

  /**
   * Get the name of the store
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Get the game id of the game to install on the store
   * @returns string
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Get the url to the store page where you can buy the game
   * @returns string
   */
  public get url(): string {
    return this._url;
  }
}
