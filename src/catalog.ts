export interface ApiTool {
  name: string;
  description: string;
  url: string;
  price: string;
  category: string;
  parameters: Record<string, ParameterDef>;
  required?: string[];
}

interface ParameterDef {
  type: string;
  description: string;
  enum?: string[];
}

export const CATALOG: ApiTool[] = [
  // === HYPERLIQUID SUITE (7 APIs) ===
  {
    name: "hyperliquid_data",
    description: "Hyperliquid perp markets: prices, open interest, 24h volume, orderbook depth for 229 markets",
    url: "https://hyperliquid-data-production.up.railway.app",
    price: "$0.001", category: "hyperliquid",
    parameters: { ticker: { type: "string", description: "Market symbol (BTC, ETH, SOL)" } },
    required: ["ticker"],
  },
  {
    name: "hyperliquid_whales",
    description: "Track whale positions on Hyperliquid DEX. Top traders, position sizes, PnL, entry prices",
    url: "https://hyperliquid-whales-production.up.railway.app",
    price: "$0.003", category: "hyperliquid",
    parameters: { ticker: { type: "string", description: "Perp symbol" }, minSize: { type: "number", description: "Min position USD" } },
    required: ["ticker"],
  },
  {
    name: "hl_vaults",
    description: "Hyperliquid vault summaries: APR, TVL, PnL, depositor count",
    url: "https://hl-vaults-x402-production.up.railway.app",
    price: "$0.003", category: "hyperliquid",
    parameters: { vaultAddress: { type: "string", description: "Vault address (optional)" } },
  },
  {
    name: "hl_funding",
    description: "Real-time and historical funding rates for 229 Hyperliquid perp markets. Arb scanner",
    url: "https://hl-funding-production.up.railway.app",
    price: "$0.002", category: "hyperliquid",
    parameters: { ticker: { type: "string", description: "Market symbol" }, period: { type: "string", description: "Funding period", enum: ["current", "1h", "8h", "24h"] } },
  },
  {
    name: "hl_portfolio",
    description: "Hyperliquid account analysis: positions, PnL, fills, open orders, funding payments",
    url: "https://hl-portfolio-production.up.railway.app",
    price: "$0.003", category: "hyperliquid",
    parameters: { walletAddress: { type: "string", description: "Wallet address (0x...)" } },
    required: ["walletAddress"],
  },
  {
    name: "hl_spot",
    description: "Hyperliquid spot markets: 454 tokens, prices, volume, balances",
    url: "https://hl-spot-production.up.railway.app",
    price: "$0.002", category: "hyperliquid",
    parameters: { token: { type: "string", description: "Token symbol" }, walletAddress: { type: "string", description: "Check balances" } },
  },

  // === PREDICTION MARKETS ===
  {
    name: "prediction_markets",
    description: "Active prediction market events from Polymarket + Kalshi: probabilities, volume, trending",
    url: "https://prediction-markets-production-3e07.up.railway.app",
    price: "$0.005", category: "prediction",
    parameters: { query: { type: "string", description: "Search query" }, platform: { type: "string", description: "Platform filter", enum: ["polymarket", "kalshi", "all"] } },
  },
  {
    name: "event_resolver",
    description: "Settlement oracle for prediction markets: resolve outcomes, verify claims, check thresholds",
    url: "https://event-resolver-production.up.railway.app",
    price: "$0.005", category: "prediction",
    parameters: { question: { type: "string", description: "Event question to verify" }, eventId: { type: "string", description: "Event ID" } },
    required: ["question"],
  },

  // === TRUST & SECURITY ===
  {
    name: "trust_score",
    description: "Unified trust scoring for domains, wallets, APIs. SSL/DNS/WHOIS/headers. Score 0-100 with risk flags",
    url: "https://trust-score-production-ff18.up.railway.app",
    price: "$0.01", category: "security",
    parameters: { target: { type: "string", description: "Domain, wallet, or URL to score" }, type: { type: "string", description: "Target type", enum: ["domain", "wallet", "api"] } },
    required: ["target"],
  },
  {
    name: "token_safety",
    description: "Rug pull detection: honeypot, liquidity lock, ownership renounce, tax analysis",
    url: "https://token-safety-x402-production.up.railway.app",
    price: "$0.003", category: "security",
    parameters: { tokenAddress: { type: "string", description: "Token contract address" }, chain: { type: "string", description: "Chain (ethereum, base, bsc)" } },
    required: ["tokenAddress"],
  },
  {
    name: "domain_intelligence",
    description: "DNS, WHOIS, SSL, registrar data for any domain. Full domain intelligence report",
    url: "https://domain-intelligence-x402-production.up.railway.app",
    price: "$0.005", category: "security",
    parameters: { domain: { type: "string", description: "Domain to analyze" } },
    required: ["domain"],
  },

  // === B2B ENRICHMENT ===
  {
    name: "email_verification",
    description: "Verify email addresses: syntax, MX, disposable, role-based, quality score 0-100",
    url: "https://email-verification-x402-production.up.railway.app",
    price: "$0.002", category: "enrichment",
    parameters: { email: { type: "string", description: "Email to verify" } },
    required: ["email"],
  },
  {
    name: "company_enrichment",
    description: "Company data from domain: industry, size, tech stack, social profiles, founded date",
    url: "https://company-enrichment-x402-production.up.railway.app",
    price: "$0.01", category: "enrichment",
    parameters: { domain: { type: "string", description: "Company domain" } },
    required: ["domain"],
  },
  {
    name: "person_enrichment",
    description: "Person data from email: name, role, company, social profiles, location",
    url: "https://person-enrichment-x402-production.up.railway.app",
    price: "$0.01", category: "enrichment",
    parameters: { email: { type: "string", description: "Person email" } },
    required: ["email"],
  },
  {
    name: "email_finder",
    description: "Find professional email from name + domain. Pattern matching + verification",
    url: "https://email-finder-x402-production.up.railway.app",
    price: "$0.005", category: "enrichment",
    parameters: { name: { type: "string", description: "Full name" }, domain: { type: "string", description: "Company domain" } },
    required: ["name", "domain"],
  },

  // === WEB & SEO ===
  {
    name: "web_scraper",
    description: "Extract clean markdown from any URL. Headless browser rendering. Batch support",
    url: "https://web-scraper-x402-production.up.railway.app",
    price: "$0.005", category: "web",
    parameters: { url: { type: "string", description: "URL to scrape" } },
    required: ["url"],
  },
  {
    name: "seo_analyzer",
    description: "Complete SEO audit: meta, headings, links, schema, performance. Score 0-100",
    url: "https://seo-analyzer-x402-production.up.railway.app",
    price: "$0.02", category: "web",
    parameters: { url: { type: "string", description: "URL to audit" } },
    required: ["url"],
  },
  {
    name: "twitter_scraper",
    description: "Scrape Twitter/X profiles, search tweets, user timelines. No API key needed",
    url: "https://twitter-scraper-production-a1e8.up.railway.app",
    price: "$0.005", category: "social",
    parameters: { username: { type: "string", description: "Twitter username" }, query: { type: "string", description: "Search query" }, type: { type: "string", description: "Request type", enum: ["profile", "search", "timeline"] } },
    required: ["type"],
  },
  {
    name: "screenshot_pdf",
    description: "Capture screenshots (PNG/JPEG/WebP) and generate PDFs from any URL",
    url: "https://screenshot-pdf-x402-production.up.railway.app",
    price: "$0.008", category: "web",
    parameters: { url: { type: "string", description: "URL to capture" }, format: { type: "string", description: "Output format", enum: ["png", "jpeg", "webp", "pdf"] } },
    required: ["url"],
  },

  // === CRYPTO DEFI ===
  {
    name: "wallet_portfolio",
    description: "Multi-chain wallet balances and token holdings",
    url: "https://wallet-portfolio-x402-production.up.railway.app",
    price: "$0.003", category: "crypto",
    parameters: { address: { type: "string", description: "Wallet address" }, chain: { type: "string", description: "Chain (ethereum, base, polygon)" } },
    required: ["address"],
  },
  {
    name: "gas_oracle",
    description: "Real-time gas prices across EVM chains. Fast/standard/slow estimates",
    url: "https://gas-oracle-x402-production.up.railway.app",
    price: "$0.001", category: "crypto",
    parameters: { chain: { type: "string", description: "Chain name" } },
    required: ["chain"],
  },
  {
    name: "dex_quotes",
    description: "Best swap quotes across DEXs. Multi-chain aggregation, price impact",
    url: "https://dex-quotes-x402-production.up.railway.app",
    price: "$0.005", category: "crypto",
    parameters: { tokenIn: { type: "string", description: "Input token" }, tokenOut: { type: "string", description: "Output token" }, amount: { type: "string", description: "Amount" } },
    required: ["tokenIn", "tokenOut", "amount"],
  },
  {
    name: "token_price",
    description: "Real-time crypto token prices via CoinGecko",
    url: "https://token-price-production-f72e.up.railway.app",
    price: "$0.001", category: "crypto",
    parameters: { token: { type: "string", description: "Token symbol or CoinGecko ID" } },
    required: ["token"],
  },
  {
    name: "defi_yields",
    description: "Best DeFi yields across protocols. APY, TVL, risk scores",
    url: "https://defi-yields-x402-production.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { chain: { type: "string", description: "Chain filter" }, minApy: { type: "number", description: "Minimum APY%" } },
  },
  {
    name: "whale_alert",
    description: "Track large crypto transactions and whale movements",
    url: "https://whale-alert-production-3f6f.up.railway.app",
    price: "$0.003", category: "crypto",
    parameters: { chain: { type: "string", description: "Chain" }, minValue: { type: "number", description: "Min USD value" } },
  },
  {
    name: "crypto_news",
    description: "Real-time crypto news with sentiment scores",
    url: "https://crypto-news-x402-production.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { query: { type: "string", description: "Search query" }, limit: { type: "number", description: "Max results" } },
  },
  {
    name: "funding_arb",
    description: "Funding rate arbitrage opportunities across exchanges",
    url: "https://funding-arb-production-1034.up.railway.app",
    price: "$0.005", category: "crypto",
    parameters: { minSpread: { type: "number", description: "Min spread %" } },
  },
  {
    name: "ens_resolver",
    description: "Resolve ENS names to addresses and reverse lookup",
    url: "https://ens-resolver-production-f3eb.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { name: { type: "string", description: "ENS name or address" } },
    required: ["name"],
  },
  {
    name: "token_holders",
    description: "Token holder distribution: whale count, concentration, top holders",
    url: "https://token-holders-x402-production.up.railway.app",
    price: "$0.005", category: "crypto",
    parameters: { tokenAddress: { type: "string", description: "Token contract" }, chain: { type: "string", description: "Chain" } },
    required: ["tokenAddress"],
  },
  {
    name: "token_ohlcv",
    description: "Historical OHLCV candles for any token",
    url: "https://token-ohlcv-x402-production.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { token: { type: "string", description: "Token" }, timeframe: { type: "string", description: "Candle timeframe", enum: ["1m", "5m", "1h", "4h", "1d"] } },
    required: ["token"],
  },

  // === SOLANA ===
  {
    name: "solana_launches",
    description: "New token launches on Solana: pump.fun, Raydium",
    url: "https://solana-launches-production.up.railway.app",
    price: "$0.003", category: "solana",
    parameters: { source: { type: "string", description: "Launch source", enum: ["pumpfun", "raydium", "all"] } },
  },
  {
    name: "jupiter_quotes",
    description: "Jupiter aggregator swap quotes on Solana",
    url: "https://jupiter-quotes-production.up.railway.app",
    price: "$0.002", category: "solana",
    parameters: { inputMint: { type: "string", description: "Input token mint" }, outputMint: { type: "string", description: "Output token mint" }, amount: { type: "number", description: "Amount in lamports" } },
    required: ["inputMint", "outputMint", "amount"],
  },

  // === NLP ===
  {
    name: "ai_summarizer",
    description: "Summarize text or URLs into key bullet points. Powered by Claude Haiku",
    url: "https://ai-summarizer-x402-production.up.railway.app",
    price: "$0.01", category: "nlp",
    parameters: { text: { type: "string", description: "Text to summarize" }, url: { type: "string", description: "URL to summarize" } },
  },
  {
    name: "sentiment_analyzer",
    description: "Analyze text sentiment, emotions, confidence scores",
    url: "https://sentiment-analyzer-x402-production.up.railway.app",
    price: "$0.005", category: "nlp",
    parameters: { text: { type: "string", description: "Text to analyze" } },
    required: ["text"],
  },
  {
    name: "text_translator",
    description: "Translate text between 50+ languages with auto-detection",
    url: "https://text-translator-x402-production.up.railway.app",
    price: "$0.005", category: "nlp",
    parameters: { text: { type: "string", description: "Text to translate" }, targetLang: { type: "string", description: "Target language code" } },
    required: ["text", "targetLang"],
  },

  // === FINANCE ===
  {
    name: "stock_price",
    description: "Real-time stock quotes: price, change, volume, market cap",
    url: "https://stock-price-production-3ec1.up.railway.app",
    price: "$0.002", category: "finance",
    parameters: { symbol: { type: "string", description: "Stock ticker (AAPL, TSLA)" } },
    required: ["symbol"],
  },
  {
    name: "currency_converter",
    description: "Real-time fiat (ECB) and crypto (CoinGecko) conversion",
    url: "https://currency-converter-production-b190.up.railway.app",
    price: "$0.001", category: "finance",
    parameters: { from: { type: "string", description: "Source currency" }, to: { type: "string", description: "Target currency" }, amount: { type: "number", description: "Amount" } },
    required: ["from", "to", "amount"],
  },

  // === COMPLIANCE ===
  {
    name: "gdpr_scanner",
    description: "Scan website GDPR compliance: consent, privacy, trackers. Score 0-100",
    url: "https://gdpr-scanner-x402-production.up.railway.app",
    price: "$0.02", category: "compliance",
    parameters: { url: { type: "string", description: "URL to scan" } },
    required: ["url"],
  },
];

export const CATEGORIES = [...new Set(CATALOG.map((t) => t.category))];

export function getToolsByCategory(category: string): ApiTool[] {
  return CATALOG.filter((t) => t.category === category);
}

export function getTool(name: string): ApiTool | undefined {
  return CATALOG.find((t) => t.name === name);
}
