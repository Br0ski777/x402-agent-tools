/**
 * Vercel AI SDK integration.
 *
 * Usage:
 *   import { createClient } from "x402-agent-tools";
 *   import { getX402Tools } from "x402-agent-tools/ai-sdk";
 *   import { generateText } from "ai";
 *
 *   const client = createClient("0xYourPrivateKey");
 *   const tools = getX402Tools(client);
 *
 *   const { text } = await generateText({
 *     model: anthropic("claude-sonnet-4-20250514"),
 *     tools,
 *     prompt: "What's the funding rate for BTC on Hyperliquid?",
 *   });
 */
// @ts-ignore — optional peer dependency
import { tool } from "ai";
import { z } from "zod";
import type { X402AgentClient } from "./client.js";
import { CATALOG, type ApiTool } from "./catalog.js";

function paramToZod(param: { type: string; description: string; enum?: string[] }): z.ZodTypeAny {
  if (param.enum) return z.enum(param.enum as [string, ...string[]]).describe(param.description);
  switch (param.type) {
    case "number": return z.number().describe(param.description);
    case "boolean": return z.boolean().describe(param.description);
    case "array": return z.array(z.string()).describe(param.description);
    default: return z.string().describe(param.description);
  }
}

function buildZodSchema(apiTool: ApiTool): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const [key, param] of Object.entries(apiTool.parameters)) {
    const zodType = paramToZod(param);
    shape[key] = apiTool.required?.includes(key) ? zodType : zodType.optional();
  }
  return z.object(shape);
}

export function getX402Tools(client: X402AgentClient, filter?: { categories?: string[]; tools?: string[] }) {
  const filtered = CATALOG.filter((t) => {
    if (filter?.tools) return filter.tools.includes(t.name);
    if (filter?.categories) return filter.categories.includes(t.category);
    return true;
  });

  const tools: Record<string, ReturnType<typeof tool>> = {};

  for (const apiTool of filtered) {
    tools[apiTool.name] = tool({
      description: `${apiTool.description} (${apiTool.price}/call USDC)`,
      parameters: buildZodSchema(apiTool),
      execute: async (params: Record<string, unknown>) => client.call(apiTool.name, params),
    });
  }

  return tools;
}
