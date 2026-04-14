import { type ApiTool } from "./catalog.js";
export interface X402ClientConfig {
    privateKey: `0x${string}`;
    network?: string;
}
export declare class X402AgentClient {
    private fetchWithPayment;
    private account;
    constructor(config: X402ClientConfig);
    get walletAddress(): string;
    call(toolName: string, params?: Record<string, unknown>): Promise<unknown>;
    listTools(): ApiTool[];
    listCategories(): string[];
    getToolsByCategory(category: string): ApiTool[];
}
export declare function createClient(privateKey: `0x${string}`): X402AgentClient;
