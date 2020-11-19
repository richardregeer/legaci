import { ExtractorInterface } from './ExtractorInterface';

export interface ExtractorFactoryInterface {
  /**
   * @param source
   * @returns ExtractorInterface
   */
  create(source: string): ExtractorInterface;
}
