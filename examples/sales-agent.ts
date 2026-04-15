/**
 * Sales Agent — B2B lead enrichment pipeline
 *
 * Find → Enrich → Verify → Score a lead in one pipeline.
 * Replaces Apollo + Hunter + Clearbit at 3-5x lower cost.
 *
 * Run: npx tsx examples/sales-agent.ts
 */
import { createClient } from "x402-agent-tools";

const client = createClient("0xYOUR_PRIVATE_KEY");

async function enrichLead(domain: string) {
  console.log(`=== Enriching lead: ${domain} ===\n`);

  // 1. Get company data from domain
  const company = await client.call("company_enrichment", { domain });
  console.log("Company:", JSON.stringify(company, null, 2));

  // 2. Detect their tech stack
  const tech = await client.call("tech_enrichment", { url: `https://${domain}` });
  console.log("\nTech Stack:", JSON.stringify(tech, null, 2));

  // 3. Find a contact email
  const contact = await client.call("email_finder", {
    name: "CEO",
    domain,
  });
  console.log("\nContact Found:", JSON.stringify(contact, null, 2));

  // 4. Verify the email is deliverable
  if (contact && typeof contact === "object" && "email" in (contact as any)) {
    const verified = await client.call("email_verification", {
      email: (contact as any).email,
    });
    console.log("\nEmail Verified:", JSON.stringify(verified, null, 2));
  }

  // 5. Trust score the domain
  const trust = await client.call("trust_score", { target: domain });
  console.log("\nTrust Score:", JSON.stringify(trust, null, 2));

  // Total cost: $0.01 + $0.005 + $0.005 + $0.002 + $0.01 = $0.032
  console.log("\n--- Pipeline complete. Cost: ~$0.032 per lead ---");
}

// Enrich a list of target companies
const targets = ["stripe.com", "vercel.com", "linear.app"];

(async () => {
  for (const domain of targets) {
    await enrichLead(domain);
    console.log("\n" + "=".repeat(50) + "\n");
  }
})();
