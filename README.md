# x402-agent-tools

**100 production-ready AI agent tools with x402 micropayments.** Pay-per-call USDC on Base. Zero API keys. Zero subscriptions. Just a wallet.

The largest collection of x402-compatible tools for autonomous AI agents. Built for LangChain, Vercel AI SDK, CrewAI, AutoGPT, and any agent framework that supports tool calling.

> **3-17x cheaper than StableEnrich, httpay, BlockRun, and Nansen.** Same data. Fraction of the cost. [See benchmark](https://github.com/Br0ski777/x402-agent-tools).

## Why x402-agent-tools?

| Feature | x402-agent-tools | StableEnrich | httpay | BlockRun |
|---------|-----------------|--------------|--------|----------|
| Tools available | **103** | ~12 | ~8 | ~15 |
| Avg price/call | **$0.003** | $0.01-0.05 | $0.01-0.03 | $0.01-0.05 |
| API keys needed | **None** | Yes | Yes | Yes |
| Subscription | **None** | Monthly | Monthly | Monthly |
| Hyperliquid data | **7 APIs** | 0 | 0 | 0 |
| Prediction markets | **2 APIs** | 0 | 0 | 0 |
| Payment | USDC on Base | USDC | USDC | USDC |
| Framework support | LangChain, AI SDK | Custom | Custom | Custom |

## Install

```bash
npm install x402-agent-tools @x402/fetch @x402/evm viem
```

## Quick Start — 3 Lines to Your First Call

```typescript
import { createClient } from "x402-agent-tools";

const client = createClient("0xYourPrivateKey");

// Crypto: whale positions on Hyperliquid
const whales = await client.call("hyperliquid_whales", { coin: "BTC" });

// B2B: enrich a company from domain
const company = await client.call("company_enrichment", { domain: "stripe.com" });

// Security: trust score any domain
const trust = await client.call("trust_score", { target: "example.com" });

// DeFi: best bridge route across 60+ chains
const route = await client.call("bridge_routes", {
  fromChain: "1", toChain: "8453", token: "USDC", amount: "1000000"
});
```

## Vercel AI SDK Integration

Use this when building AI agents with Vercel AI SDK. Returns all 103 tools as Vercel-compatible tool objects with automatic x402 payment handling.

```typescript
import { createClient } from "x402-agent-tools";
import { getX402Tools } from "x402-agent-tools/ai-sdk";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const client = createClient("0xYourPrivateKey");

const { text } = await generateText({
  model: anthropic("claude-sonnet-4-20250514"),
  tools: getX402Tools(client),
  prompt: "What are the current funding rates on Hyperliquid for BTC and ETH? Also check if there are any liquidation levels near current prices on Aave.",
});
```

### Filter by category or specific tools

```typescript
// Only Hyperliquid + DeFi tools (ideal for trading agents)
const tradingTools = getX402Tools(client, {
  categories: ["hyperliquid", "defi", "crypto"]
});

// Only specific tools you need
const researchTools = getX402Tools(client, {
  tools: ["web_scraper", "web_search", "fact_checker", "research_report"]
});
```

## LangChain.js Integration

Use this when building agents with LangChain.js. Returns DynamicStructuredTool instances compatible with all LangChain agent types.

```typescript
import { createClient } from "x402-agent-tools";
import { getX402LangChainTools } from "x402-agent-tools/langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";

const client = createClient("0xYourPrivateKey");
const tools = getX402LangChainTools(client);

const llm = new ChatAnthropic({ model: "claude-sonnet-4-20250514" });
const agent = createToolCallingAgent({ llm, tools, prompt: yourPrompt });
const executor = new AgentExecutor({ agent, tools });

await executor.invoke({
  input: "Find the top whale positions on Hyperliquid BTC, check token safety for the top traded token, then summarize the findings."
});
```

## Direct HTTP (No SDK Needed)

Every tool is also available as a standalone x402 HTTP endpoint. Use `@x402/fetch` directly:

```typescript
import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0xYourPrivateKey");
const paidFetch = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{ network: "eip155:8453", client: new ExactEvmScheme(account) }],
});

// trust_score is POST /api/score. GET tools (e.g. dex_quotes -> /api/quote) take query params.
const response = await paidFetch("https://trust-score.api.klymax402.com/api/score", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ target: "example.com" }),
});
const result = await response.json();
```

## All 103 Tools

### Hyperliquid Suite — 7 tools
*#1 Hyperliquid data provider on x402. Complete DEX coverage.*

| Tool | Price | What it returns |
|------|-------|-----------------|
| `hyperliquid_data` | $0.001 | Perp markets: prices, open interest, 24h volume, orderbook depth for 229 markets |
| `hyperliquid_whales` | $0.003 | Whale positions: sizes, PnL, entry prices, leverage |
| `hl_vaults` | $0.003 | Vault summaries: APR, TVL, PnL, depositor count |
| `hl_funding` | $0.002 | Funding rates: current, 1h, 8h, 24h with arb scanner |
| `hl_portfolio` | $0.003 | Account analysis: positions, PnL, fills, open orders, funding |
| `hl_spot` | $0.002 | 454 spot tokens: prices, volume, wallet balances |

### Prediction Markets — 2 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `prediction_markets` | $0.005 | Active events from Polymarket + Kalshi: probabilities, volume, trending |
| `event_resolver` | $0.005 | Settlement oracle: resolve outcomes, verify claims, check thresholds |

### Crypto & DeFi — 16 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `wallet_portfolio` | $0.003 | Multi-chain wallet balances and token holdings |
| `gas_oracle` | $0.001 | Gas prices: fast/standard/slow for any EVM chain |
| `gas_estimator` | $0.002 | Multi-chain gas comparison in one call |
| `dex_quotes` | $0.005 | Best swap quotes across DEXs with price impact |
| `token_price` | $0.001 | Real-time crypto prices via CoinGecko |
| `defi_yields` | $0.002 | Best DeFi yields: APY, TVL, risk scores |
| `whale_alert` | $0.003 | Large crypto transactions and whale movements |
| `crypto_news` | $0.002 | Crypto news with sentiment scores |
| `funding_arb` | $0.005 | Funding rate arbitrage across exchanges |
| `funding_rates` | $0.002 | Live perp funding: Binance, Bybit, OKX, open interest |
| `ens_resolver` | $0.002 | ENS name resolution and reverse lookup |
| `token_holders` | $0.005 | Token holder distribution: whale count, concentration |
| `token_ohlcv` | $0.002 | Historical OHLCV candles |
| `airdrop_checker` | $0.005 | Check wallet eligibility for active airdrops |
| `bridge_routes` | $0.003 | Best cross-chain bridge routes via LI.FI (60+ chains) |
| `currency_converter` | $0.001 | Fiat (ECB) and crypto (CoinGecko) conversion |

### DeFi Advanced — 3 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `base_defi` | $0.003 | Base chain yields: Aerodrome LP, Moonwell lending |
| `liquidation_oracle` | $0.003 | Liquidation levels: Aave, Compound, Morpho positions |
| `orderbook_depth` | $0.005 | Uniswap V3 liquidity depth and slippage estimation |

### NFT — 3 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `nft_collection` | $0.005 | Collection floor price, volume, holders, rarity |
| `nft_rarity` | $0.003 | Token rarity rank, score, trait floor prices |
| `nft_metadata` | $0.003 | NFT metadata: name, image, attributes, collection info |

### Solana — 4 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `solana_launches` | $0.003 | New token launches: pump.fun, Raydium |
| `jupiter_quotes` | $0.002 | Jupiter aggregator swap quotes |
| `solana_fees` | $0.001 | Priority fee estimates at 6 levels |
| `solana_pools` | $0.003 | DEX pool liquidity: Raydium, Orca, Meteora |

### Trust & Security — 8 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `trust_score` | $0.01 | Unified trust scoring 0-100: domains, wallets, APIs |
| `token_safety` | $0.003 | Rug pull detection: honeypot, liquidity, ownership |
| `domain_intelligence` | $0.005 | Full domain intel: DNS, WHOIS, SSL, registrar |
| `ssl_checker` | $0.002 | SSL/TLS cert: validity, expiry, chain, grade |
| `http_headers` | $0.001 | HTTP security headers: HSTS, CSP, server detection |
| `port_scanner` | $0.003 | TCP port scan: open/closed, response time |
| `password_strength` | $0.001 | Password score 0-100, entropy, crack time |
| `jwt_decoder` | $0.001 | JWT decode: header, payload, claims, expiry |

### B2B Enrichment — 6 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `email_verification` | $0.002 | Email validation: syntax, MX, disposable, score 0-100 |
| `company_enrichment` | $0.01 | Company data: industry, size, tech, social, founded |
| `person_enrichment` | $0.01 | Person data: name, role, company, social, location |
| `email_finder` | $0.005 | Find email from name + domain |
| `tech_enrichment` | $0.005 | 50+ technologies detected on any website |
| `social_profile` | $0.008 | Social profiles: Twitter, GitHub, LinkedIn, YouTube |

### Email — 2 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `email_deliverability` | $0.005 | Deliverability audit: SPF, DKIM, DMARC, score 0-100 |
| `email_send` | $0.003 | Send emails via Resend: text/HTML, delivery status |

### Web & SEO — 6 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `web_scraper` | $0.005 | URL to clean markdown, headless rendering |
| `seo_analyzer` | $0.02 | Full SEO audit: meta, headings, schema, score 0-100 |
| `screenshot_pdf` | $0.008 | Screenshots (PNG/JPEG/WebP) and PDF capture |
| `web_search` | $0.003 | Web search: title, URL, snippet, 10 results |
| `keyword_research` | $0.01 | SEO keywords: Google Suggest, intent, long-tail |
| `webhook_tester` | $0.002 | Test webhooks: custom methods, headers, latency |

### Social — 1 tool
| Tool | Price | What it returns |
|------|-------|-----------------|
| `twitter_scraper` | $0.005 | Twitter/X profiles, search, timelines. No API key |

### Network — 3 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `dns_lookup` | $0.002 | DNS records: A, MX, TXT, CNAME via Cloudflare DoH |
| `ip_geolocation` | $0.003 | IP geolocation: country, city, ISP, VPN detection |
| `ip_geolocation_batch` | $0.01 | Batch geolocate up to 20 IPs |

### NLP — 5 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `ai_summarizer` | $0.01 | Summarize text/URLs via Claude Haiku |
| `sentiment_analyzer` | $0.005 | Sentiment, emotions, confidence scores |
| `text_translator` | $0.005 | Translate 50+ languages with auto-detection |
| `text_classifier` | $0.005 | Topic classification, readability, content type |
| `language_detector` | $0.002 | Language detection: 30+ languages, script, confidence |

### Finance — 1 tool
| Tool | Price | What it returns |
|------|-------|-----------------|
| `stock_price` | $0.002 | Real-time stock quotes: price, change, volume, mcap |

### Media — 3 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `image_resize` | $0.003 | Resize images: dimensions, format conversion |
| `ocr_extract` | $0.005 | OCR text extraction from images |
| `text_to_speech` | $0.005 | Text to speech: 20+ languages, MP3 output |

### Text Processing — 8 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `diff_checker` | $0.002 | Line-by-line text diff with similarity score |
| `word_counter` | $0.001 | Words, chars, sentences, paragraphs, reading time |
| `lorem_ipsum` | $0.001 | Placeholder text: paragraphs, sentences, words |
| `slug_generator` | $0.001 | URL-friendly slugs with transliteration |
| `regex_tester` | $0.001 | Regex testing: matches, groups, explanations |
| `html_to_markdown` | $0.001 | HTML to clean Markdown conversion |
| `markdown_to_html` | $0.001 | Markdown to HTML conversion |
| `markdown_renderer` | $0.002 | Markdown to styled HTML (light/dark/GitHub themes) |

### Research — 2 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `fact_checker` | $0.005 | Verify claims with evidence and sources |
| `research_report` | $0.02 | Multi-source research reports in markdown |

### Compliance — 2 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `gdpr_scanner` | $0.02 | GDPR compliance: consent, privacy, trackers |
| `pii_detector` | $0.005 | PII detection: emails, SSNs, credit cards, redaction |

### Validation — 5 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `phone_validation` | $0.003 | Phone validation: carrier, line type, E.164 |
| `phone_validation_batch` | $0.025 | Batch validate up to 50 phones |
| `sms_validator` | $0.002 | SMS-capable validation with carrier type |
| `address_validator` | $0.003 | Postal address parsing and normalization |
| `json_validator` | $0.001 | JSON syntax + schema validation |

### Developer — 1 tool
| Tool | Price | What it returns |
|------|-------|-----------------|
| `code_sandbox` | $0.01 | Execute Python/JS/SQL in sandbox with output |

### Generators — 5 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `qr_code` | $0.001 | QR codes as base64 PNG |
| `barcode_generator` | $0.001 | Barcodes: EAN-13, UPC-A, Code128, Code39 |
| `hash_generator` | $0.001 | MD5, SHA1, SHA256, SHA512, bcrypt hashes |
| `uuid_generator` | $0.001 | UUID v4, v7, ULID, nanoid (batch 100) |
| `color_palette` | $0.001 | Harmonious color palettes from hex |

### Documents — 1 tool
| Tool | Price | What it returns |
|------|-------|-----------------|
| `pdf_generator` | $0.008 | PDF from HTML/Markdown with custom layout |

### Utility — 8 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `base64_codec` | $0.001 | Base64 encode/decode (standard + URL-safe) |
| `csv_to_json` | $0.001 | CSV to JSON with auto-detect delimiter |
| `cron_parser` | $0.001 | Parse cron expressions with next run times |
| `crontab_generator` | $0.001 | Natural language to cron expression |
| `timezone_converter` | $0.001 | Datetime conversion between IANA timezones |
| `unit_converter` | $0.001 | Length, weight, temp, volume, speed conversion |
| `url_shortener` | $0.001 | URL shortening with custom aliases |
| `user_agent_parser` | $0.001 | Parse user agent: browser, OS, device, bot |

### Data — 2 tools
| Tool | Price | What it returns |
|------|-------|-----------------|
| `weather` | $0.001 | Current weather + 7-day forecast |
| `vector_search` | $0.005 | TF-IDF cosine similarity document search |

## How x402 Payment Works

```
Your Agent                    x402-agent-tools                  API Server
    |                              |                                |
    |-- call("trust_score", {})  ->|                                |
    |                              |-- POST /api/score ------------>|
    |                              |<-- 402 Payment Required -------|
    |                              |                                |
    |                              |   [auto-signs USDC payment]    |
    |                              |                                |
    |                              |-- POST /api/score + payment -->|
    |                              |<-- 200 OK + JSON data ---------|
    |<-- structured result --------|                                |
```

1. Your agent calls a tool through the SDK
2. The SDK sends an HTTP request to our API
3. Server responds `402 Payment Required` with price in USDC
4. `@x402/fetch` automatically signs a USDC micro-payment on Base L2
5. Request retries with the signed payment header
6. You get structured JSON data back

**No API keys. No rate limits. No subscriptions. Pay per call.**

## Categories

```typescript
const client = createClient("0xYourPrivateKey");

// List all categories
console.log(client.listCategories());
// ["hyperliquid", "prediction", "crypto", "defi", "nft", "solana",
//  "security", "enrichment", "email", "web", "social", "network",
//  "nlp", "finance", "media", "text", "research", "compliance",
//  "validation", "developer", "generator", "document", "utility", "data"]

// Get tools in a category
const cryptoTools = client.getToolsByCategory("hyperliquid");

// List all 103 tools
const all = client.listTools();
```

## Use Cases

**Trading Agent** — Use `hyperliquid_*` + `funding_rates` + `liquidation_oracle` + `prediction_markets` to build autonomous trading strategies. Monitor whale positions, funding arbitrage, and prediction market odds in real-time.

**Research Agent** — Use `web_search` + `web_scraper` + `fact_checker` + `research_report` + `ai_summarizer` to build deep research pipelines. Scrape, verify, and synthesize information from multiple sources.

**Security Agent** — Use `trust_score` + `token_safety` + `ssl_checker` + `port_scanner` + `gdpr_scanner` to audit websites, tokens, and infrastructure. Generate compliance reports automatically.

**Sales Agent** — Use `email_finder` + `company_enrichment` + `person_enrichment` + `email_verification` + `email_send` to build outbound sales pipelines. Find, enrich, verify, and contact leads at scale.

**DeFi Agent** — Use `defi_yields` + `base_defi` + `bridge_routes` + `dex_quotes` + `wallet_portfolio` to optimize yield farming, find bridge routes, and manage multi-chain portfolios.

## Requirements

- Node.js >= 18
- A wallet with USDC on Base L2 (even $1 gets you 100-1000+ calls)
- Private key for signing payments (use a dedicated agent wallet, **not** your main wallet)


## Prepaid mode

Skip the x402 wallet setup entirely. Buy credits upfront on [klymax402.com/packs](https://klymax402.com/packs) and call any API with a simple key — no x402 signing, no EIP-3009, no USDC balance management.

**Setup (2 steps):**

```bash
# 1. Register your wallet → get an API key
curl -X POST https://klymax402.com/proxy/register   -H "Content-Type: application/json"   -d '{"wallet": "0xYourBaseWallet"}'
# → { "api_key": "klyx_...", "credits_bank": "0x7cfE..." }

# 2. Send exactly $10 / $50 / $200 USDC on Base to the credits_bank address
#    Credits are detected automatically within 5 minutes
```

**Call any API via the prepaid proxy:**

```bash
curl -X POST https://klymax402.com/proxy/stock-price/api/quote   -H "X-Klymax-Key: klyx_your_key_here"   -H "Content-Type: application/json"   -d '{"symbol": "AAPL"}'
# Response header: X-Klymax-Balance: 10.998
```

| Pack | Price | Credits | Bonus |
|------|-------|---------|-------|
| Starter | $10 USDC | $11.00 | +10% |
| Pro | $50 USDC | $62.50 | +25% |
| Scale | $200 USDC | $280.00 | +40% |

Check balance: `GET https://klymax402.com/proxy/balance?key=klyx_...`

Full details and pricing: [klymax402.com/packs](https://klymax402.com/packs)

## Links

- [GitHub](https://github.com/Br0ski777/x402-agent-tools)
- [x402 Protocol](https://www.x402.org/)
- [x402scan Analytics](https://www.x402scan.com/)

## License

MIT
