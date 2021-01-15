import { FileHandlerInterface } from '../../core/file/FileHandlerInterface';

export class GOGGameInformationResolver {
  protected readonly _fileHandler: FileHandlerInterface;

  /**
   * Resolve the game information file from a GOG package
   *
   * @param fileHandler - File handler utility
   */
  constructor(fileHandler: FileHandlerInterface) {
    this._fileHandler = fileHandler;
  }

  /**
   * Get the game name from the GOG game information JSON file
   *
   * @param destination - The installation path of the game
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
