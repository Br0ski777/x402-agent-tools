export interface ApiTool {
    name: string;
    description: string;
    url: string;
    price: string;
    category: string;
    parameters: Record<string, ParameterDef>;
    required?: string[];
}
interface ParameterDef {
    type: string;
    description: string;
    enum?: string[];
}
export declare const CATALOG: ApiTool[];
export declare const CATEGORIES: string[];
export declare function getToolsByCategory(category: string): ApiTool[];
export declare function getTool(name: string): ApiTool | undefined;
export {};
