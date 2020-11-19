import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { TemplateInterface } from '../../core/file/TemplateInterface';

export class Template implements TemplateInterface {
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * @param fileHandler
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * @param source
   * @returns string
   */
  public load(source: string): string {
    return this._fileHandler.readSync(source);
  }

  /**
   * @param destination
   * @param content
   * @returns void
   */
  public save(destination: string, content: string): void {
    this._fileHandler.writeSync(destination, content);
  }

  /**
   * @param name
   * @param value
   * @param content
   * @returns string
   */
  public replaceVariable(name: string, value: string, content: string): string {
    return content.replace(`{{${name}}}`, value);
  }
}
