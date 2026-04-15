/**
 * Trading Agent — Hyperliquid whale tracking + funding arb
 *
 * Monitors whale positions, funding rates, and prediction markets
 * to generate trading signals. Costs ~$0.02 per full scan.
 *
 * Run: npx tsx examples/trading-agent.ts
 */
import { createClient } from "x402-agent-tools";

const client = createClient("0xYOUR_PRIVATE_KEY"); // Base L2 wallet with USDC

async function scanMarket() {
  console.log("=== Hyperliquid Market Scan ===\n");

  // 1. Check whale positions on BTC and ETH
  const btcWhales = await client.call("hyperliquid_whales", { ticker: "BTC" });
  console.log("BTC Whale Positions:", JSON.stringify(btcWhales, null, 2));

  // 2. Scan funding rates for arbitrage opportunities
  const funding = await client.call("hl_funding", {});
  console.log("\nFunding Rates:", JSON.stringify(funding, null, 2));

  // 3. Check prediction market odds for macro events
  const predictions = await client.call("prediction_markets", {
    category: "crypto",
    limit: 5,
  });
  console.log("\nTop Crypto Predictions:", JSON.stringify(predictions, null, 2));

  // 4. Get vault APRs for yield comparison
  const vaults = await client.call("hl_vaults", {});
  console.log("\nTop Vaults by APR:", JSON.stringify(vaults, null, 2));

  // Total cost: $0.003 + $0.002 + $0.005 + $0.003 = $0.013
  console.log("\n--- Scan complete. Cost: ~$0.013 ---");
}

scanMarket().catch(console.error);
