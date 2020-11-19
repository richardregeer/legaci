import { GameConfiguration } from './GameConfiguration';

export class Game {
  private readonly _name: string;
  private readonly _gameConfig: GameConfiguration;
  private readonly _installationPath: string;
  private readonly _binFilePath: string;

  /**
   * Create a new entity containing the information about the installed game
   *
   * @param name - The name of the game that is installed
   * @param installationPath - The path where the game is installed
   * @param binFilePath - The binary file path to start the game
   * @param gameConfig - The configuration of the installed game
   */
  constructor(name: string, installationPath: string, binFilePath: string, gameConfig: GameConfiguration) {
    this._name = name;
    this._installationPath = installationPath;
    this._binFilePath = binFilePath;

    this._gameConfig = gameConfig;
  }
  /**
   * The name of the installed game
   *
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * The binary file path to start the game
   *
   * @returns string
   */
  public get binFile(): string {
    return this._binFilePath;
  }

  /**
   * The path where the game is installed
   *
   * @returns string
   */
  public get installationPath(): string {
    return this._installationPath;
  }

  /**
   * The configuration of the installed game
   *
   * @returns GameConfiguration
   */
  public get gameConfig(): GameConfiguration {
    return this._gameConfig;
  }
}
