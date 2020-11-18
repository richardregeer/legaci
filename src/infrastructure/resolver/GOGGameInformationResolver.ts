import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';

export class GOGGameInformationResolver {
  protected readonly _fileHandler: FileHandlerInterface;

  /**
   * @param  {FileHandlerInterface} fileHandler
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * @param  {string} destination
   * @returns string
   */
  public getGameName(destination: string): string | undefined {
    try {
      const gameInfoFile = this._fileHandler.findFilesSync(false, destination, '/**/goggame*.info');
      if (gameInfoFile.length === 0) {
        return;
      }

      const gameInfo = JSON.parse(this._fileHandler.readSync(gameInfoFile[0]).toString()) as Record<string, string>;
      return gameInfo.name;
    } catch (error: unknown) {
      return;
    }
  }
}
