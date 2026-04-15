/**
 * Vercel AI SDK Agent — Claude + 103 x402 tools
 *
 * Give Claude access to all tools and let it autonomously
 * choose which ones to call based on your prompt.
 *
 * Run: ANTHROPIC_API_KEY=sk-... npx tsx examples/vercel-ai-agent.ts
 */
import { createClient } from "x402-agent-tools";
import { getX402Tools } from "x402-agent-tools/ai-sdk";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const client = createClient("0xYOUR_PRIVATE_KEY");

async function main() {
  // Option 1: Give the agent ALL 103 tools
  const allTools = getX402Tools(client);

  // Option 2: Filter by category (recommended for focused agents)
  const tradingTools = getX402Tools(client, {
    categories: ["hyperliquid", "crypto", "defi"],
  });

  // Option 3: Pick specific tools
  const researchTools = getX402Tools(client, {
    tools: ["web_search", "web_scraper", "ai_summarizer", "fact_checker"],
  });

  // Run the agent with trading tools
  const { text } = await generateText({
    model: anthropic("claude-sonnet-4-20250514"),
    tools: tradingTools,
    maxSteps: 5,
    prompt:
      "Check the current BTC and ETH funding rates on Hyperliquid. " +
      "Then look at whale positions for both. " +
      "Summarize any arbitrage opportunities you see.",
  });

  console.log("Agent Response:\n", text);
}

main().catch(console.error);
