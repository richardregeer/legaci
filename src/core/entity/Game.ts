import { GameConfiguration } from './GameConfiguration';

export class Game {
  private readonly _name: string;
  private readonly _gameConfig: GameConfiguration;
  private readonly _installationPath: string;
  private readonly _binFilePath: string;

  /**
   * @param {string} name
   * @param {string} installationPath
   * @param {string} binFile
   * @param binFilePath
   * @param {GameConfiguration} gameConfig
   */
  constructor(name: string, installationPath: string, binFilePath: string, gameConfig: GameConfiguration) {
    this._name = name;
    this._installationPath = installationPath;
    this._binFilePath = binFilePath;

    this._gameConfig = gameConfig;
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
  public get binFile(): string {
    return this._binFilePath;
  }

  /**
   * @returns string
   */
  public get installationPath(): string {
    return this._installationPath;
  }

  /**
   * @returns GameConfiguration
   */
  public get gameConfig(): GameConfiguration {
    return this._gameConfig;
  }
}
