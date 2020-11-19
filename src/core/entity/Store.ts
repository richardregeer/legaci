export class Store {
  private readonly _name: string;
  private readonly _id: string;
  private readonly _url: string;

  /**
   * @param name
   * @param id
   * @param url
   */
  constructor(name: string, id: string, url: string) {
    this._name = name;
    this._id = id;
    this._url = url;
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
  public get id(): string {
    return this._id;
  }

  /**
   * @returns string
   */
  public get url(): string {
    return this._url;
  }
}
