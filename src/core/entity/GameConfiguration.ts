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
  private readonly _gameFiles: GameFile[];
  private readonly _downloadRequired: boolean;
  private _id: string;

  /**
   * @param  {string} name
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

  public hasRunners(): boolean {
    return this._runners.length !== 0;
  }

  public findByApplicationRunner(runner: ApplicationRunner): Runner | null {
    const applicationRunner = this._runners.find((x: Runner) => x.application.toLowerCase() === runner.toLowerCase());

    if (!applicationRunner) {
      return null;
    }

    return applicationRunner;
  }

  /**
   * @returns string
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @param  {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * @returns string
   */
  public get releaseStatus(): string {
    return this._releaseStatus;
  }

  /**
   * @param  {string} value
   */
  public set releaseStatus(value: string) {
    this._releaseStatus = value;
  }

  /**
   * @returns string
   */
  public get genre(): string {
    return this._genre;
  }

  /**
   * @param  {string} value
   */
  public set genre(value: string) {
    this._genre = value;
  }

  /**
   * @returns Date
   */
  public get released(): Date {
    return this._released;
  }

  /**
   * @param  {Date} value
   */
  public set released(value: Date) {
    this._released = value;
  }

  /**
   * @returns string
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @param  {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * @returns Array<Runner>
   */
  public get runners(): Runner[] {
    return this._runners;
  }

  /**
   * @returns Array<SourcePort>
   */
  public get sourcePorts(): SourcePort[] {
    return this._sourcePorts;
  }

  /**
   * @returns Array<string>
   */
  public get references(): string[] {
    return this._references;
  }

  /**
   * @returns Array<string>
   */
  public get reviews(): string[] {
    return this._reviews;
  }

  /**
   * @returns Array<Store>
   */
  public get stores(): Store[] {
    return this._stores;
  }

  /**
   * @returns Array<string>
   */
  public get downloadLocations(): string[] {
    return this._downloadLocations;
  }

  /**
   * @returns Array<string>
   */
  public get gameFiles(): GameFile[] {
    return this._gameFiles;
  }

  /**
   * @returns boolean
   */
  public get downloadRequired(): boolean {
    return this._downloadRequired;
  }
}
