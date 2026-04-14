import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";
import { CATALOG } from "./catalog.js";
export class X402AgentClient {
    fetchWithPayment;
    account;
    constructor(config) {
        this.account = privateKeyToAccount(config.privateKey);
        this.fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
            schemes: [
                {
                    network: (config.network ?? "eip155:8453"),
                    client: new ExactEvmScheme(this.account),
                },
            ],
        });
    }
    get walletAddress() {
        return this.account.address;
    }
    async call(toolName, params = {}) {
        const tool = CATALOG.find((t) => t.name === toolName);
        if (!tool)
            throw new Error(`Tool "${toolName}" not found. Available: ${CATALOG.map((t) => t.name).join(", ")}`);
        const url = new URL("/api", tool.url);
        const response = await this.fetchWithPayment(url.toString(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`${tool.name} failed (${response.status}): ${text}`);
        }
        return response.json();
    }
    listTools() {
        return CATALOG;
    }
    listCategories() {
        return [...new Set(CATALOG.map((t) => t.category))];
    }
    getToolsByCategory(category) {
        return CATALOG.filter((t) => t.category === category);
    }
}
export function createClient(privateKey) {
    return new X402AgentClient({ privateKey });
}
