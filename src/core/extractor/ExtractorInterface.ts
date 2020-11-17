export interface ExtractorInterface {
  /**
   * @param  {string} source
   * @param  {string} destination
   * @returns Promise<void>
   */
  extract(source: string, destination: string): Promise<void>;
}
