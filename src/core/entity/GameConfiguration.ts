import { ApplicationRunner } from './ApplicationRunner';
import { GameFile } from './GameFile';
import { Runner } from './Runner';
import { SourcePort } from './SourcePort';
import { Store } from './Store';

export class GameConfiguration {
  private _name: string;
  private _releaseStatus: string;
  private _genre: string;
  private _released: Date;
  private readonly _runners: Runner[];
  private readonly _sourcePorts: SourcePort[];
  private readonly _references: string[];
  private readonly _reviews: string[];
  private readonly _stores: Store[];
  private readonly _downloadLocations: string[];
  private _gameFiles: GameFile[];
  private readonly _downloadRequired: boolean;
  private _id: string;

  /**
   * The configuration of the game to install
   *
   * @param name - The name of the game to install
   */
  constructor(name: string) {
    this._name = name;
    this._runners = [];
    this._sourcePorts = [];
    this._references = [];
    this._stores = [];
    this._reviews = [];
    this._downloadLocations = [];
    this._gameFiles = [];
  }

  /**
   * Weather the game configuration has any runners to play the game
   *
   * @returns boolean
   */
  public hasRunners(): boolean {
    return this._runners.length !== 0;
  }

  /**
   * Find if the game configuration has the requested application runner
   *
   * @param runner - The application runner to find
   * @returns Runner
   */
  public findByApplicationRunner(runner: ApplicationRunner): Runner | null {
    const applicationRunner = this._runners.find((x: Runner) => x.application.toLowerCase() === runner.toLowerCase());

    if (!applicationRunner) {
      return null;
    }

    return applicationRunner;
  }

  /**
   * Get the name of the game to install
   *
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Set the name of the game to install
   *
   * @param value - The name of the game to install
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Get the release status of the game to install
   *
   * @returns string
   */
  public get releaseStatus(): string {
    return this._releaseStatus;
  }

  /**
   * Set the release status of the game to install
   *
   * @param value - The release date of the game to install
   */
  public set releaseStatus(value: string) {
    this._releaseStatus = value;
  }

  /**
   *Get the genre of the game to install
   *
   * @returns string
   */
  public get genre(): string {
    return this._genre;
  }

  /**
   * Set the genre of the game to install
   *
   * @param value - The genre of the game to install
   */
  public set genre(value: string) {
    this._genre = value;
  }

  /**
   * Get the release date of the game to install
   *
   * @returns Date
   */
  public get released(): Date {
    return this._released;
  }

  /**
   * Set the release date of the game to install
   *
   * @param value - the release date of the game to install
   */
  public set released(value: Date) {
    this._released = value;
  }

  /**
   * Get the Legaci game id of the game to install
   *
   * @returns string
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Set the Legaci game id of the game to install
   *
   * @param value - The Legaci game id of the game to install
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Get the application runners of the game to install
   *
   * @returns Runner[]
   */
  public get runners(): Runner[] {
    return this._runners;
  }

  /**
   * Get available sourceports of the game to install
   *
   * @returns SourcePort[]
   */
  public get sourcePorts(): SourcePort[] {
    return this._sourcePorts;
  }

  /**
   * Get available game references of the game to install
   *
   * @returns string[]
   */
  public get references(): string[] {
    return this._references;
  }

  /**
   * Get available reviews of the game to install
   *
   * @returns string[]
   */
  public get reviews(): string[] {
    return this._reviews;
  }

  /**
   * Get the available stores where the game to install can be bought
   *
   * @returns Store[]
   */
  public get stores(): Store[] {
    return this._stores;
  }

  /**
   * Get the available locations where the game to install can be downloaded
   *
   * @returns string[]
   */
  public get downloadLocations(): string[] {
    return this._downloadLocations;
  }

  /**
   * Get additonal files that can be installed for the game to install
   *
   * @returns GameFile[]
   */
  public get gameFiles(): GameFile[] {
    return this._gameFiles;
  }

  /**
   * Set additonal files that can be installed for the game to install
   *
   * @returns GameFile[]
   */
  public set gameFiles(value: GameFile[]) {
    this._gameFiles = value;
  }

  /**
   * Get weather the game to install should be download
   *
   * @returns boolean
   */
  public get downloadRequired(): boolean {
    return this._downloadRequired;
  }
}
