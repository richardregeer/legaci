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
   * @param  {string} application
   * @param  {string} version
   * @param  {string} runConfigurationSource?
   * @param  {string} configurationSource?
   * @param  {string} binFile?
   * @param  {string} id?
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
   * @returns string
   */
  public get configurationPath(): string | undefined {
    return this._configurationPath;
  }

  /**
   * @returns string
   */
  public get runConfigurationPath(): string | undefined {
    return this._runConfigurationPath;
  }

  /**
   * @returns string
   */
  public get version(): string {
    return this._version;
  }

  /**
   * @returns ApplicationRunner
   */
  public get application(): ApplicationRunner {
    return this._application;
  }

  /**
   * @returns string
   */
  public get binFile(): string | undefined {
    return this._binFile;
  }

  /**
   * @returns string
   */
  public get id(): string | undefined {
    return this._id;
  }
}
