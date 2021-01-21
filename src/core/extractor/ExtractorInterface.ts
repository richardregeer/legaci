export interface ExtractorInterface {
  /**
   * Extract the given game file to the given destination
   *
   * @param source - The source path where the game file is to extract
   * @param destination - The destination where the game files will be extracted
   * @returns Promise<void>
   */
  extract(source: string, destination: string): Promise<void>;
}
