/**
 * Research Agent — Deep web research pipeline
 *
 * Search → Scrape → Verify → Summarize any topic.
 * Costs ~$0.043 per research cycle.
 *
 * Run: npx tsx examples/research-agent.ts
 */
import { createClient } from "x402-agent-tools";

const client = createClient("0xYOUR_PRIVATE_KEY");

async function research(query: string) {
  console.log(`=== Researching: "${query}" ===\n`);

  // 1. Web search for relevant pages
  const results = await client.call("web_search", { query, count: 5 });
  console.log("Search Results:", JSON.stringify(results, null, 2));

  // 2. Scrape the top result for full content
  const pages = results as any;
  if (Array.isArray(pages?.results) && pages.results.length > 0) {
    const topUrl = pages.results[0].url;
    const content = await client.call("web_scraper", { url: topUrl });
    console.log("\nScraped Content (first 500 chars):");
    const markdown = (content as any)?.markdown || (content as any)?.content || "";
    console.log(String(markdown).slice(0, 500));

    // 3. Fact-check a key claim from the content
    const factCheck = await client.call("fact_checker", {
      claim: query,
    });
    console.log("\nFact Check:", JSON.stringify(factCheck, null, 2));
  }

  // 4. Generate a summary with AI
  const summary = await client.call("ai_summarizer", {
    text: `Research topic: ${query}. Provide a comprehensive overview with key facts and recent developments.`,
  });
  console.log("\nAI Summary:", JSON.stringify(summary, null, 2));

  // Total cost: $0.003 + $0.005 + $0.005 + $0.03 = $0.043
  console.log("\n--- Research complete. Cost: ~$0.043 ---");
}

research("x402 protocol micropayments AI agents 2026").catch(console.error);
