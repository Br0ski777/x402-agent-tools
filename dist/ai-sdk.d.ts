import type { X402AgentClient } from "./client.js";
export declare function getX402Tools(client: X402AgentClient, filter?: {
    categories?: string[];
    tools?: string[];
}): Record<string, any>;
