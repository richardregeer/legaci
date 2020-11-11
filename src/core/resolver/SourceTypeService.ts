import { SourceType } from "../entity/SourceType";
import { SourceTypeResolverInterface } from "./SourceTypeResolverInterface";

export class SourceTypeService {
    private _sourceTypeResolvers: Array<SourceTypeResolverInterface>;
    
    public constructor(sourceTypeResolvers: Array<SourceTypeResolverInterface>) {
        this._sourceTypeResolvers = sourceTypeResolvers;
    }
    
    public determineSourceType(source: string): SourceType {

        for (const sourceTypeResolver of this._sourceTypeResolvers) {
            if(sourceTypeResolver.isSourceType(source)) {
                return sourceTypeResolver.getSourceType();
            }    
        }
        
        return SourceType.UNKNOWN;
    }           
}