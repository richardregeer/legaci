import { ExtractorInterface } from './ExtractorInterface';

export interface ExtractorFactoryInterface {
  /**
   * Create a new extractor to extract the game installer
   *
   * @param source The source path of the game to extract
   * @returns ExtractorInterface
   */
  create(source: string): ExtractorInterface;
}
