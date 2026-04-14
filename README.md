# x402-agent-tools

**37 pre-built AI agent tools with x402 micropayments.** Pay-per-call USDC on Base. Zero API keys.

Hyperliquid trading suite, prediction markets, trust scoring, B2B enrichment, web scraping, Twitter, NLP, crypto data, and more.

## Install

```bash
npm install x402-agent-tools @x402/fetch @x402/evm viem
```

## Quick Start

```typescript
import { createClient } from "x402-agent-tools";

const client = createClient("0xYourPrivateKey");

// Call any tool directly
const trustScore = await client.call("trust_score", { target: "example.com" });
const funding = await client.call("hl_funding", { period: "current" });
const markets = await client.call("prediction_markets", { platform: "polymarket" });
```

## Vercel AI SDK

```typescript
import { createClient } from "x402-agent-tools";
import { getX402Tools } from "x402-agent-tools/ai-sdk";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const client = createClient("0xYourPrivateKey");

const { text } = await generateText({
  model: anthropic("claude-sonnet-4-20250514"),
  tools: getX402Tools(client),
  prompt: "What are the current funding rates on Hyperliquid for BTC?",
});
```

### Filter tools by category

```typescript
// Only crypto + hyperliquid tools
const tools = getX402Tools(client, { categories: ["crypto", "hyperliquid"] });

// Only specific tools
const tools = getX402Tools(client, { tools: ["trust_score", "web_scraper", "hl_funding"] });
```

## LangChain.js

```typescript
import { createClient } from "x402-agent-tools";
import { getX402LangChainTools } from "x402-agent-tools/langchain";
import { ChatAnthropic } from "@langchain/anthropic";

const client = createClient("0xYourPrivateKey");
const tools = getX402LangChainTools(client);

const llm = new ChatAnthropic({ model: "claude-sonnet-4-20250514" });
const llmWithTools = llm.bindTools(tools);

const result = await llmWithTools.invoke("Check if example.com is trustworthy");
```

## Available Tools

### Hyperliquid Suite (6 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `hyperliquid_data` | $0.001 | Perp markets, prices, OI, orderbook |
| `hyperliquid_whales` | $0.003 | Whale positions, PnL tracking |
| `hl_vaults` | $0.003 | Vault APR, TVL, PnL |
| `hl_funding` | $0.002 | Funding rates, arb scanner |
| `hl_portfolio` | $0.003 | Account positions, PnL, fills |
| `hl_spot` | $0.002 | 454 spot tokens, prices |

### Prediction Markets (2 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `prediction_markets` | $0.005 | Polymarket + Kalshi events |
| `event_resolver` | $0.005 | Settlement oracle |

### Trust & Security (3 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `trust_score` | $0.01 | Unified trust scoring 0-100 |
| `token_safety` | $0.003 | Rug pull detection |
| `domain_intelligence` | $0.005 | DNS/WHOIS/SSL |

### B2B Enrichment (4 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `email_verification` | $0.002 | Email validity check |
| `company_enrichment` | $0.01 | Company data from domain |
| `person_enrichment` | $0.01 | Person data from email |
| `email_finder` | $0.005 | Find email from name+domain |

### Web & Social (4 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `web_scraper` | $0.005 | URL to clean markdown |
| `seo_analyzer` | $0.02 | SEO audit, score 0-100 |
| `twitter_scraper` | $0.005 | Twitter profiles, search |
| `screenshot_pdf` | $0.008 | Screenshots and PDFs |

### Crypto DeFi (10 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `wallet_portfolio` | $0.003 | Multi-chain balances |
| `gas_oracle` | $0.001 | Gas prices, all chains |
| `dex_quotes` | $0.005 | Best swap quotes |
| `token_price` | $0.001 | Crypto prices |
| `defi_yields` | $0.002 | Best DeFi yields |
| `whale_alert` | $0.003 | Whale tracking |
| `crypto_news` | $0.002 | News + sentiment |
| `funding_arb` | $0.005 | Funding arb scanner |
| `ens_resolver` | $0.002 | ENS resolution |
| `token_holders` | $0.005 | Holder distribution |
| `token_ohlcv` | $0.002 | OHLCV candles |

### Solana (2 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `solana_launches` | $0.003 | New token launches |
| `jupiter_quotes` | $0.002 | Jupiter swap quotes |

### NLP (3 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `ai_summarizer` | $0.01 | Text/URL summarization |
| `sentiment_analyzer` | $0.005 | Sentiment analysis |
| `text_translator` | $0.005 | 50+ languages |

### Finance (2 tools)
| Tool | Price | Description |
|------|-------|-------------|
| `stock_price` | $0.002 | Real-time stock quotes |
| `currency_converter` | $0.001 | Fiat + crypto conversion |

### Compliance (1 tool)
| Tool | Price | Description |
|------|-------|-------------|
| `gdpr_scanner` | $0.02 | GDPR compliance scan |

## How It Works

1. Your agent calls a tool (e.g., `trust_score`)
2. The SDK sends an HTTP request to our API
3. Server responds with `402 Payment Required`
4. `@x402/fetch` automatically signs a USDC payment on Base
5. Request is retried with the payment header
6. You get structured JSON data back

**No API keys. No subscriptions. Pay only for what you use.**

## Requirements

- Node.js >= 18
- A wallet with USDC on Base (even $1 is enough for 100+ calls)
- Private key for signing payments (use a dedicated agent wallet, not your main wallet)

## License

MIT
