import { ExtractorInterface } from "./ExtractorInterface";

export interface ExtractorFactoryInterface {
    
    /**
     * @param  {string} source
     * @returns Promise<ExtractorInterface>
     */
    create(source: string): Promise<ExtractorInterface>
}