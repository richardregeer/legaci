import { ExtractorInterface } from './ExtractorInterface';

export interface ExtractorFactoryInterface {
  /**
   * @param  {string} source
   * @returns ExtractorInterface
   */
  create(source: string): ExtractorInterface;
}
