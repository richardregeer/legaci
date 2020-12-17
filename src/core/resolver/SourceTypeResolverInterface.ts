import { SourceType } from '../entity/SourceType';

export interface SourceTypeResolverInterface {
  /**
   * Determine the source type of the given source path
   * @param source The source path to determine the source type
   * @returns boolean
   */
  isSourceType(source: string): boolean;

  /**
   * Get the type of the source
   *
   * @returns SourceType
   */
  getSourceType(): SourceType;
}
