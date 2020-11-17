import { SourceType } from "../entity/SourceType";

export interface SourceTypeResolverInterface {
  /**
   * @param  {string} source
   * @returns boolean
   */
  isSourceType(source: string): boolean;

  /**
   * @returns SourceType
   */
  getSourceType(): SourceType;
}
