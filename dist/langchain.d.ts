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
import { DynamicStructuredTool } from "@langchain/core/tools";
import type { X402AgentClient } from "./client.js";
export declare function getX402LangChainTools(client: X402AgentClient, filter?: {
    categories?: string[];
    tools?: string[];
}): DynamicStructuredTool[];
