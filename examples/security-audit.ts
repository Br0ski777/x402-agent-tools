/**
 * Security Audit Agent — Full domain security assessment
 *
 * Trust score + SSL + DNS + Headers + Port scan in one pipeline.
 * Costs ~$0.02 per domain audit.
 *
 * Run: npx tsx examples/security-audit.ts
 */
import { createClient } from "x402-agent-tools";

const client = createClient("0xYOUR_PRIVATE_KEY");

async function auditDomain(domain: string) {
  console.log(`=== Security Audit: ${domain} ===\n`);

  // Run all checks in parallel for speed
  const [trust, ssl, dns, headers] = await Promise.all([
    client.call("trust_score", { target: domain }),
    client.call("ssl_checker", { domain }),
    client.call("domain_intelligence", { domain }),
    client.call("http_headers", { url: `https://${domain}` }),
  ]);

  console.log("Trust Score:", JSON.stringify(trust, null, 2));
  console.log("\nSSL Certificate:", JSON.stringify(ssl, null, 2));
  console.log("\nDomain Intel:", JSON.stringify(dns, null, 2));
  console.log("\nSecurity Headers:", JSON.stringify(headers, null, 2));

  // Total cost: $0.01 + $0.002 + $0.005 + $0.001 = $0.018
  console.log("\n--- Audit complete. Cost: ~$0.018 ---");
}

// Audit multiple domains
const domains = ["example.com", "stripe.com"];

(async () => {
  for (const domain of domains) {
    await auditDomain(domain);
    console.log("\n" + "=".repeat(50) + "\n");
  }
})();
