export interface TemplateInterface {
  /**
   * @param  {string} source
   * @returns string
   */
  load(source: string): string;

  /**
   * @param  {string} destination
   * @param  {string} content
   * @returns void
   */
  save(destination: string, content: string): void;

  /**
   * @param  {string} name
   * @param  {string} value
   * @param  {string} content
   * @returns string
   */
  replaceVariable(name: string, value: string, content: string): string;
}
