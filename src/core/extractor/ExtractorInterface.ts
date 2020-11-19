export interface ExtractorInterface {
  /**
   * @param source
   * @param destination
   * @returns Promise<void>
   */
  extract(source: string, destination: string): Promise<void>;
}
