import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { TemplateInterface } from "../../core/file/TemplateInterface";

export class Template implements TemplateInterface {
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * @param fileHandler
   */
  public constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * @param  {string} source
   * @returns string
   */
  public load(source: string): string {
    return this._fileHandler.readSync(source);
  }

  /**
   * @param {string} destination
   * @param content
   * @returns void
   */
  public save(destination: string, content: string): void {
    this._fileHandler.writeSync(destination, content);
  }

  /**
   * @param  {string} name
   * @param  {string} value
   * @param  {string} content
   * @returns string
   */
  public replaceVariable(name: string, value: string, content: string): string {
    return content.replace(`{{${name}}}`, value);
  }
}
