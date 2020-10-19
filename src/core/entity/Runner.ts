import { UnsupportedApplicationRunnerError } from "../error/UnsupportedApplicationRunnerError";
import { ApplicationRunner } from "./ApplicationRunner";

export class Runner {
    private readonly _application: ApplicationRunner;
    private readonly _version: string;
    private readonly _runConfigurationPath: string;
    private readonly _configurationPath: string;
    private readonly _binFile: string;
    
    /**
     * @param  {string} application
     * @param  {string} version
     * @param  {string} launchConfigPath
     * @param  {string} configurationPath
     * @throws {UnsupportedApplicationRunnerError}
     */
    public constructor(application : string, version : string, runConfigurationPath: string, configurationPath: string, binFile: string) {
        switch (application.toLocaleLowerCase) {
            case ApplicationRunner.DOSBOX.toString: 
                this._application = ApplicationRunner.DOSBOX;
                break;
            case ApplicationRunner.SCUMMVM.toString: 
                this._application = ApplicationRunner.SCUMMVM;
                break;
            default: throw new UnsupportedApplicationRunnerError(`Unsupported launch application ${application}`);
        }

        this._version = version;
        this._runConfigurationPath = runConfigurationPath;
        this._configurationPath = configurationPath;
        this._binFile = binFile;
    }

    public get configurationPath(): string {
        return this._configurationPath;
    }

    public get runConfigurationPath(): string {
        return this._runConfigurationPath;
    }

    public get version(): string {
        return this._version;
    }

    public get application(): ApplicationRunner {
        return this._application;
    }

    public get binFile(): string {
        return this._binFile;
    }
}