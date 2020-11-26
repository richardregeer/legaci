import { UnsupportedApplicationRunnerError } from '../error/UnsupportedApplicationRunnerError';
import { ApplicationRunner } from './ApplicationRunner';

export class Runner {
  private readonly _application: ApplicationRunner;
  private readonly _version: string;
  private readonly _runConfigurationPath?: string;
  private readonly _configurationPath?: string;
  private readonly _binFile?: string;
  private readonly _id?: string;

  /**
   * The application runner that will be used to run the game
   *
   * @param  {string} application The application that will run the game
   * @param  {string} version The version of the application
   * @param  {string} runConfigurationSource? The configuration that contains startup configuration
   * @param  {string} configurationSource? The main configuration file of the application
   * @param  {string} binFile? The bin script file to start the application
   * @param  {string} id? The game id that will be used the directly launch the game. This is the id used by the application
   * @returns string
   */
  constructor(
    application: string,
    version: string,
    runConfigurationSource?: string,
    configurationSource?: string,
    binFile?: string,
    id?: string
  ) {
    if (!Object.values(ApplicationRunner).includes(application.toLowerCase() as ApplicationRunner)) {
      throw new UnsupportedApplicationRunnerError(`Unsupported application runner ${application}`);
    }

    this._application = application as ApplicationRunner;
    this._version = version;
    this._runConfigurationPath = runConfigurationSource;
    this._configurationPath = configurationSource;
    this._binFile = binFile;
    this._id = id;
  }

  /**
   * Get the main configuration file of the application
   * @returns string
   */
  public get configurationPath(): string | undefined {
    return this._configurationPath;
  }

  /**
   * Get the configuration that contains startup configuration
   * @returns string
   */
  public get runConfigurationPath(): string | undefined {
    return this._runConfigurationPath;
  }

  /**
   * Get the version of the application
   * @returns string
   */
  public get version(): string {
    return this._version;
  }

  /**
   * Get the application runner that will run the game
   *
   * @returns ApplicationRunner
   */
  public get application(): ApplicationRunner {
    return this._application;
  }

  /**
   * Get the bin script file to start the application
   * @returns string
   */
  public get binFile(): string | undefined {
    return this._binFile;
  }

  /**
   * The game id that will be used the directly launch the game. This is the id used by the application
   *
   * @returns string
   */
  public get id(): string | undefined {
    return this._id;
  }
}
