import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';
import { TemplateInterface } from '../../core/file/TemplateInterface';

export class Template implements TemplateInterface {
  private readonly _fileHandler: FileHandlerInterface;

  /**
   * Create a new file tempate
   *
   * @param fileHandler - The file handler
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * Load the file from the given source
   *
   * @param source - The file to load
   * @returns string
   */
  public load(source: string): string {
    return this._fileHandler.readSync(source);
  }

  /**
   * Save the file to the given destination
   *
   * @param destination - The destination where to save the file
   * @param content - The content of the template to save
   * @returns void
   */
  public save(destination: string, content: string): void {
    this._fileHandler.writeSync(destination, content);
  }

  /**
   * Replace a template {{variable}} in the file
   *
   * @param name - The name if the template variable
   * @param value - The value of the template variable
   * @param content - The content where the variable can be replaced
   * @returns string
   */
  public replaceVariable(name: string, value: string, content: string): string {
    return content.replace(`{{${name}}}`, value);
  }
}
