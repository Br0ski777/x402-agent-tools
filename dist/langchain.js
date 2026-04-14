/**
 * LangChain.js integration.
 *
 * Usage:
 *   import { createClient } from "x402-agent-tools";
 *   import { getX402LangChainTools } from "x402-agent-tools/langchain";
 *   import { ChatAnthropic } from "@langchain/anthropic";
 *   import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
 *
 *   const client = createClient("0xYourPrivateKey");
 *   const tools = getX402LangChainTools(client);
 *
 *   const agent = createToolCallingAgent({ llm, tools, prompt });
 *   const executor = new AgentExecutor({ agent, tools });
 *   await executor.invoke({ input: "Check trust score for example.com" });
 */
// @ts-ignore — optional peer dependency
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { CATALOG } from "./catalog.js";
function paramToZod(param) {
    if (param.enum)
        return z.enum(param.enum).describe(param.description);
    switch (param.type) {
        case "number": return z.number().describe(param.description);
        case "boolean": return z.boolean().describe(param.description);
        case "array": return z.array(z.string()).describe(param.description);
        default: return z.string().describe(param.description);
    }
}
function buildZodSchema(apiTool) {
    const shape = {};
    for (const [key, param] of Object.entries(apiTool.parameters)) {
        const zodType = paramToZod(param);
        shape[key] = apiTool.required?.includes(key) ? zodType : zodType.optional();
    }
    return z.object(shape);
}
export function getX402LangChainTools(client, filter) {
    const filtered = CATALOG.filter((t) => {
        if (filter?.tools)
            return filter.tools.includes(t.name);
        if (filter?.categories)
            return filter.categories.includes(t.category);
        return true;
    });
    return filtered.map((apiTool) => new DynamicStructuredTool({
        name: apiTool.name,
        description: `${apiTool.description} (${apiTool.price}/call USDC)`,
        schema: buildZodSchema(apiTool),
        func: async (params) => {
            const result = await client.call(apiTool.name, params);
            return JSON.stringify(result);
        },
    }));
}
