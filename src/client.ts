import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount, type PrivateKeyAccount } from "viem/accounts";
import { CATALOG, type ApiTool } from "./catalog.js";

export interface X402ClientConfig {
  privateKey: `0x${string}`;
  network?: string;
}

export class X402AgentClient {
  private fetchWithPayment: typeof fetch;
  private account: PrivateKeyAccount;

  constructor(config: X402ClientConfig) {
    this.account = privateKeyToAccount(config.privateKey);
    this.fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
      schemes: [
        {
          network: (config.network ?? "eip155:8453") as `${string}:${string}`,
          client: new ExactEvmScheme(this.account),
        },
      ],
    });
  }

  get walletAddress(): string {
    return this.account.address;
  }

  async call(toolName: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const tool = CATALOG.find((t) => t.name === toolName);
    if (!tool) throw new Error(`Tool "${toolName}" not found. Available: ${CATALOG.map((t) => t.name).join(", ")}`);

    const method = (tool.method ?? "GET").toUpperCase();
    const url = new URL(tool.path, tool.url);

    let init: RequestInit;
    if (method === "GET" || method === "HEAD") {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
      init = { method };
    } else {
      init = {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      };
    }

    const response = await this.fetchWithPayment(url.toString(), init);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${tool.name} failed (${response.status}): ${text}`);
    }

    return response.json();
  }

  listTools(): ApiTool[] {
    return CATALOG;
  }

  listCategories(): string[] {
    return [...new Set(CATALOG.map((t) => t.category))];
  }

  getToolsByCategory(category: string): ApiTool[] {
    return CATALOG.filter((t) => t.category === category);
  }
}

export function createClient(privateKey: `0x${string}`): X402AgentClient {
  return new X402AgentClient({ privateKey });
}
