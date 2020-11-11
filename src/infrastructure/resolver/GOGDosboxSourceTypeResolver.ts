import { SourceType } from "../../core/entity/SourceType";
import { FileHandlerInterface } from "../../core/file/FileHandlerInterface";
import { SourceTypeResolverInterface } from "../../core/resolver/SourceTypeResolverInterface";

export class GOGDosboxSourceTypeResolver implements SourceTypeResolverInterface {

    private readonly _fileHandler: FileHandlerInterface;
    
    /**
     * @param  {FileHandlerInterface} fileHandler
     */
    public constructor(fileHandler: FileHandlerInterface) {
        this._fileHandler = fileHandler;
    }
    
    /**
     * @returns SourceType
     */
    getSourceType(): SourceType {
        return SourceType.GOG_DOSBOX;
    }

    /**
     * @param  {string} source
     * @returns boolean
     */
    public isSourceType(source: string): boolean { 
        const files = this._fileHandler.findFilesSync(source + '/goggame-*.info');

        if(files.length === 0) {
            return false;
        }

        return this._fileHandler.existsSync(source + '/Dosbox/', true);
    } 
}