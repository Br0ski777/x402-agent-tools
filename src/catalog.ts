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
  // ═══════════════════════════════════════════════════════════
  // HYPERLIQUID SUITE — 7 APIs, #1 provider HL on x402
  // ═══════════════════════════════════════════════════════════
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
    url: "https://hl-vaults-production.up.railway.app",
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

  // ═══════════════════════════════════════════════════════════
  // PREDICTION MARKETS
  // ═══════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════
  // CRYPTO & DEFI — 15 APIs
  // ═══════════════════════════════════════════════════════════
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
    name: "gas_estimator",
    description: "Multi-chain gas prices in one call -- ETH, Base, Polygon, Arbitrum, BSC compared",
    url: "https://gas-estimator-production-f7f1.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { chain: { type: "string", description: "Chain name: ethereum, base, polygon, arbitrum, bsc. Omit for all chains" } },
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
    url: "https://token-price-x402-production.up.railway.app",
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
    url: "https://whale-alert-production-98b5.up.railway.app",
    price: "$0.003", category: "crypto",
    parameters: { chain: { type: "string", description: "Chain" }, minValue: { type: "number", description: "Min USD value" } },
  },
  {
    name: "crypto_news",
    description: "Real-time crypto news with sentiment scores",
    url: "https://crypto-news-production-b0f2.up.railway.app",
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
    name: "funding_rates",
    description: "Live perpetual funding rates across Binance, Bybit, OKX with open interest and predicted next rate",
    url: "https://funding-rates-x402-production.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { symbol: { type: "string", description: "Token symbol (BTC, ETH, SOL)" } },
    required: ["symbol"],
  },
  {
    name: "ens_resolver",
    description: "Resolve ENS names to addresses and reverse lookup",
    url: "https://ens-resolver-production-891c.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { name: { type: "string", description: "ENS name or address" } },
    required: ["name"],
  },
  {
    name: "token_holders",
    description: "Token holder distribution: whale count, concentration, top holders",
    url: "https://token-holders-production.up.railway.app",
    price: "$0.005", category: "crypto",
    parameters: { tokenAddress: { type: "string", description: "Token contract" }, chain: { type: "string", description: "Chain" } },
    required: ["tokenAddress"],
  },
  {
    name: "token_ohlcv",
    description: "Historical OHLCV candles for any token",
    url: "https://token-ohlcv-production.up.railway.app",
    price: "$0.002", category: "crypto",
    parameters: { token: { type: "string", description: "Token" }, timeframe: { type: "string", description: "Candle timeframe", enum: ["1m", "5m", "1h", "4h", "1d"] } },
    required: ["token"],
  },
  {
    name: "airdrop_checker",
    description: "Check wallet eligibility for active crypto airdrops with token, value, deadline, and claim URL",
    url: "https://airdrop-checker-production.up.railway.app",
    price: "$0.005", category: "crypto",
    parameters: { address: { type: "string", description: "Ethereum wallet address (0x...)" } },
    required: ["address"],
  },
  {
    name: "bridge_routes",
    description: "Best cross-chain bridge routes via LI.FI -- 60+ chains, 18+ bridges, fees and time compared",
    url: "https://bridge-routes-x402-production.up.railway.app",
    price: "$0.003", category: "crypto",
    parameters: { fromChain: { type: "string", description: "Source chain ID (1=Ethereum, 8453=Base, 42161=Arbitrum)" }, toChain: { type: "string", description: "Destination chain ID" }, token: { type: "string", description: "Token symbol to bridge (USDC, ETH)" }, amount: { type: "string", description: "Amount in smallest unit" }, toToken: { type: "string", description: "Destination token if different" } },
    required: ["fromChain", "toChain", "token", "amount"],
  },
  {
    name: "currency_converter",
    description: "Real-time fiat (ECB) and crypto (CoinGecko) conversion",
    url: "https://currency-converter-production-b190.up.railway.app",
    price: "$0.001", category: "crypto",
    parameters: { from: { type: "string", description: "Source currency" }, to: { type: "string", description: "Target currency" }, amount: { type: "number", description: "Amount" } },
    required: ["from", "to", "amount"],
  },

  // ═══════════════════════════════════════════════════════════
  // DEFI ADVANCED
  // ═══════════════════════════════════════════════════════════
  {
    name: "base_defi",
    description: "Base chain DeFi yields from Aerodrome LP and Moonwell lending, ranked by APY with TVL and risk",
    url: "https://base-defi-production.up.railway.app",
    price: "$0.003", category: "defi",
    parameters: { protocol: { type: "string", description: "Filter: all, aerodrome, or moonwell" } },
  },
  {
    name: "liquidation_oracle",
    description: "DeFi liquidation levels from Aave, Compound, Morpho -- at-risk positions and price triggers",
    url: "https://liquidation-oracle-x402-production.up.railway.app",
    price: "$0.003", category: "defi",
    parameters: { protocol: { type: "string", description: "Filter: aave, compound, morpho, venus" }, asset: { type: "string", description: "Collateral asset (ETH, WBTC)" }, minValueUsd: { type: "number", description: "Min at-risk USD (default: 10000)" }, limit: { type: "number", description: "Results count (default: 20, max: 100)" } },
  },
  {
    name: "orderbook_depth",
    description: "Uniswap V3 liquidity depth -- price impact at 1/2/5/10% levels for slippage estimation",
    url: "https://orderbook-depth-production.up.railway.app",
    price: "$0.005", category: "defi",
    parameters: { pool: { type: "string", description: "Uniswap V3 pool address (0x...)" }, chain: { type: "string", description: "Chain: base, ethereum (default: base)" } },
    required: ["pool"],
  },

  // ═══════════════════════════════════════════════════════════
  // NFT
  // ═══════════════════════════════════════════════════════════
  {
    name: "nft_collection",
    description: "NFT collection floor price, volume, holders, and rarity data for Ethereum and Base",
    url: "https://nft-floor-production.up.railway.app",
    price: "$0.005", category: "nft",
    parameters: { address: { type: "string", description: "NFT collection contract address" }, chain: { type: "string", description: "ethereum or base (default: ethereum)" } },
    required: ["address"],
  },
  {
    name: "nft_rarity",
    description: "NFT token rarity rank, score, and trait floor prices for valuation",
    url: "https://nft-floor-production.up.railway.app",
    price: "$0.003", category: "nft",
    parameters: { address: { type: "string", description: "NFT collection contract address" }, tokenId: { type: "string", description: "Token ID" }, chain: { type: "string", description: "ethereum or base" } },
    required: ["address", "tokenId"],
  },
  {
    name: "nft_metadata",
    description: "NFT metadata lookup -- name, image, attributes, collection info from contract + token ID",
    url: "https://nft-metadata-production.up.railway.app",
    price: "$0.003", category: "nft",
    parameters: { contract: { type: "string", description: "NFT contract address" }, tokenId: { type: "string", description: "Token ID" }, chain: { type: "string", description: "ethereum or base (default: ethereum)" } },
    required: ["contract", "tokenId"],
  },

  // ═══════════════════════════════════════════════════════════
  // SOLANA — 4 APIs
  // ═══════════════════════════════════════════════════════════
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
  {
    name: "solana_fees",
    description: "Solana priority fee estimates at 6 levels for transaction optimization",
    url: "https://solana-fees-production.up.railway.app",
    price: "$0.001", category: "solana",
    parameters: { program: { type: "string", description: "Program ID for program-specific fees (optional)" } },
  },
  {
    name: "solana_pools",
    description: "Solana DEX pool liquidity depth -- TVL, slippage, volume, fee tier for Raydium, Orca, Meteora",
    url: "https://solana-pools-production.up.railway.app",
    price: "$0.003", category: "solana",
    parameters: { mint: { type: "string", description: "Solana token mint address" } },
    required: ["mint"],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUST & SECURITY — 8 APIs
  // ═══════════════════════════════════════════════════════════
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
  {
    name: "ssl_checker",
    description: "SSL/TLS certificate validity, expiry, issuer, chain details, and security grade",
    url: "https://ssl-checker-production-3dda.up.railway.app",
    price: "$0.002", category: "security",
    parameters: { domain: { type: "string", description: "Domain to check SSL certificate" } },
    required: ["domain"],
  },
  {
    name: "http_headers",
    description: "Analyze HTTP response headers -- security score, HSTS/CSP check, server detection, caching config",
    url: "https://http-headers-production.up.railway.app",
    price: "$0.001", category: "security",
    parameters: { url: { type: "string", description: "Full URL to analyze" } },
    required: ["url"],
  },
  {
    name: "port_scanner",
    description: "Scan TCP ports on any host -- open/closed status and response time",
    url: "https://port-scanner-production-bdb2.up.railway.app",
    price: "$0.003", category: "security",
    parameters: { host: { type: "string", description: "Hostname or IP address to scan" }, ports: { type: "array", description: "Array of port numbers (default: 16 common ports)" } },
    required: ["host"],
  },
  {
    name: "password_strength",
    description: "Password strength score 0-100, entropy bits, crack time estimate, improvement tips",
    url: "https://password-strength-production.up.railway.app",
    price: "$0.001", category: "security",
    parameters: { password: { type: "string", description: "Password to analyze" } },
    required: ["password"],
  },
  {
    name: "jwt_decoder",
    description: "Decode and inspect JWT tokens -- header, payload, claims, expiry analysis",
    url: "https://jwt-decoder-production.up.railway.app",
    price: "$0.001", category: "security",
    parameters: { token: { type: "string", description: "JWT token to decode (header.payload.signature)" } },
    required: ["token"],
  },

  // ═══════════════════════════════════════════════════════════
  // B2B ENRICHMENT — 5 APIs
  // ═══════════════════════════════════════════════════════════
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
  {
    name: "tech_enrichment",
    description: "Detect 50+ technologies on any website -- CMS, JS frameworks, analytics, hosting, CDN, payments",
    url: "https://tech-enrichment-x402-production.up.railway.app",
    price: "$0.005", category: "enrichment",
    parameters: { url: { type: "string", description: "URL to scan" } },
    required: ["url"],
  },
  {
    name: "social_profile",
    description: "Enrich social profiles from handle or URL -- Twitter/X, GitHub, LinkedIn, YouTube",
    url: "https://social-profile-x402-production.up.railway.app",
    price: "$0.008", category: "enrichment",
    parameters: { handle: { type: "string", description: "Username/handle" }, platform: { type: "string", description: "Platform", enum: ["github", "twitter", "linkedin", "youtube"] }, url: { type: "string", description: "Full profile URL (alt to handle+platform)" } },
  },

  // ═══════════════════════════════════════════════════════════
  // EMAIL — 3 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "email_deliverability",
    description: "Email deliverability audit -- SPF, DKIM, DMARC, MX validation with score 0-100",
    url: "https://email-deliverability-production.up.railway.app",
    price: "$0.005", category: "email",
    parameters: { domain: { type: "string", description: "Domain to audit" } },
    required: ["domain"],
  },
  {
    name: "email_send",
    description: "Send emails programmatically via Resend -- text or HTML, delivery status, message ID",
    url: "https://email-send-production.up.railway.app",
    price: "$0.003", category: "email",
    parameters: { to: { type: "string", description: "Recipient email" }, from: { type: "string", description: "Sender email (default: noreply@x402.dev)" }, subject: { type: "string", description: "Email subject" }, body: { type: "string", description: "Email body (plain text)" }, html: { type: "string", description: "Email body (HTML, optional)" } },
    required: ["to", "subject", "body"],
  },

  // ═══════════════════════════════════════════════════════════
  // WEB & SEO — 7 APIs
  // ═══════════════════════════════════════════════════════════
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
    name: "screenshot_pdf",
    description: "Capture screenshots (PNG/JPEG/WebP) and generate PDFs from any URL",
    url: "https://screenshot-pdf-x402-production.up.railway.app",
    price: "$0.008", category: "web",
    parameters: { url: { type: "string", description: "URL to capture" }, format: { type: "string", description: "Output format", enum: ["png", "jpeg", "webp", "pdf"] } },
    required: ["url"],
  },
  {
    name: "web_search",
    description: "Web search API for AI agents -- structured results: title, URL, snippet, up to 10 results",
    url: "https://web-search-production-7393.up.railway.app",
    price: "$0.003", category: "web",
    parameters: { query: { type: "string", description: "Search query" }, count: { type: "number", description: "Results count (default: 5, max: 10)" } },
    required: ["query"],
  },
  {
    name: "keyword_research",
    description: "SEO keyword research -- Google Suggest, intent classification, long-tail discovery",
    url: "https://keyword-research-production-2ba5.up.railway.app",
    price: "$0.01", category: "web",
    parameters: { query: { type: "string", description: "Seed keyword or phrase" } },
    required: ["query"],
  },
  {
    name: "webhook_tester",
    description: "Test webhook endpoints -- POST/PUT/PATCH/DELETE with custom headers and payloads, latency",
    url: "https://webhook-tester-production-e956.up.railway.app",
    price: "$0.002", category: "web",
    parameters: { url: { type: "string", description: "Webhook URL (must be https)" }, method: { type: "string", description: "HTTP method", enum: ["POST", "PUT", "PATCH", "DELETE"] }, headers: { type: "object", description: "Custom headers" }, body: { type: "object", description: "JSON body" }, timeout: { type: "number", description: "Timeout seconds (default: 10, max: 30)" } },
    required: ["url"],
  },

  // ═══════════════════════════════════════════════════════════
  // SOCIAL
  // ═══════════════════════════════════════════════════════════
  {
    name: "twitter_scraper",
    description: "Scrape Twitter/X profiles, search tweets, user timelines. No API key needed",
    url: "https://twitter-scraper-production-a1e8.up.railway.app",
    price: "$0.005", category: "social",
    parameters: { username: { type: "string", description: "Twitter username" }, query: { type: "string", description: "Search query" }, type: { type: "string", description: "Request type", enum: ["profile", "search", "timeline"] } },
    required: ["type"],
  },

  // ═══════════════════════════════════════════════════════════
  // NETWORK — 3 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "dns_lookup",
    description: "DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, SRV) via Cloudflare DNS-over-HTTPS",
    url: "https://dns-lookup-production-437a.up.railway.app",
    price: "$0.002", category: "network",
    parameters: { domain: { type: "string", description: "Domain name" }, type: { type: "string", description: "Record type", enum: ["A", "AAAA", "MX", "TXT", "CNAME", "NS", "SOA", "SRV"] } },
    required: ["domain"],
  },
  {
    name: "ip_geolocation",
    description: "Geolocate any IP -- country, city, ISP, ASN, VPN/proxy/Tor detection",
    url: "https://ip-geolocation-production.up.railway.app",
    price: "$0.003", category: "network",
    parameters: { ip: { type: "string", description: "IP address" } },
    required: ["ip"],
  },
  {
    name: "ip_geolocation_batch",
    description: "Geolocate up to 20 IP addresses in one call with full location and network data",
    url: "https://ip-geolocation-production.up.railway.app",
    price: "$0.01", category: "network",
    parameters: { ips: { type: "array", description: "Array of IPs (max 20)" } },
    required: ["ips"],
  },

  // ═══════════════════════════════════════════════════════════
  // NLP — 4 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "ai_summarizer",
    description: "Summarize text or URLs into key bullet points. Powered by Claude Haiku",
    url: "https://ai-summarizer-production-b148.up.railway.app",
    price: "$0.01", category: "nlp",
    parameters: { text: { type: "string", description: "Text to summarize" }, url: { type: "string", description: "URL to summarize" } },
  },
  {
    name: "sentiment_analyzer",
    description: "Analyze text sentiment, emotions, confidence scores",
    url: "https://sentiment-analyzer-production-b1f6.up.railway.app",
    price: "$0.005", category: "nlp",
    parameters: { text: { type: "string", description: "Text to analyze" } },
    required: ["text"],
  },
  {
    name: "text_translator",
    description: "Translate text between 50+ languages with auto-detection",
    url: "https://text-translator-production.up.railway.app",
    price: "$0.005", category: "nlp",
    parameters: { text: { type: "string", description: "Text to translate" }, targetLang: { type: "string", description: "Target language code" } },
    required: ["text", "targetLang"],
  },
  {
    name: "text_classifier",
    description: "Classify text into topic categories with confidence scores, readability, content type detection",
    url: "https://text-classifier-production.up.railway.app",
    price: "$0.005", category: "nlp",
    parameters: { text: { type: "string", description: "Text to classify (min 50 chars)" }, categories: { type: "array", description: "Custom categories (optional)" } },
    required: ["text"],
  },
  {
    name: "language_detector",
    description: "Detect language from text -- 30+ languages, script detection, confidence scores",
    url: "https://language-detector-production-9ef8.up.railway.app",
    price: "$0.002", category: "nlp",
    parameters: { text: { type: "string", description: "Text to detect (min 10 chars)" } },
    required: ["text"],
  },

  // ═══════════════════════════════════════════════════════════
  // FINANCE
  // ═══════════════════════════════════════════════════════════
  {
    name: "stock_price",
    description: "Real-time stock quotes: price, change, volume, market cap",
    url: "https://stock-price-x402-production.up.railway.app",
    price: "$0.002", category: "finance",
    parameters: { symbol: { type: "string", description: "Stock ticker (AAPL, TSLA)" } },
    required: ["symbol"],
  },

  // ═══════════════════════════════════════════════════════════
  // MEDIA — 3 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "image_resize",
    description: "Resize images from URL -- custom dimensions, format conversion (PNG/JPEG/WebP), aspect ratio preserved",
    url: "https://image-resize-production-962d.up.railway.app",
    price: "$0.003", category: "media",
    parameters: { url: { type: "string", description: "URL of image" }, width: { type: "number", description: "Target width px" }, height: { type: "number", description: "Target height px" }, format: { type: "string", description: "Output format", enum: ["png", "jpeg", "webp"] } },
    required: ["url"],
  },
  {
    name: "ocr_extract",
    description: "Extract text from images via OCR -- URL or base64, confidence score, language detection",
    url: "https://ocr-extract-production.up.railway.app",
    price: "$0.005", category: "media",
    parameters: { image_url: { type: "string", description: "Image URL" }, image_base64: { type: "string", description: "Base64-encoded image (alt)" }, language: { type: "string", description: "Language hint: eng, fra, deu, spa" } },
  },
  {
    name: "text_to_speech",
    description: "Convert text to speech -- 20+ languages, base64 MP3 output",
    url: "https://text-to-speech-x402-production.up.railway.app",
    price: "$0.005", category: "media",
    parameters: { text: { type: "string", description: "Text to convert (max 200 chars)" }, language: { type: "string", description: "Language code: en, fr, es, de, ja, ko, zh" } },
    required: ["text"],
  },

  // ═══════════════════════════════════════════════════════════
  // TEXT PROCESSING — 8 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "diff_checker",
    description: "Compare two texts line-by-line with additions, deletions, similarity score",
    url: "https://diff-checker-production.up.railway.app",
    price: "$0.002", category: "text",
    parameters: { text1: { type: "string", description: "Original text" }, text2: { type: "string", description: "Modified text" } },
    required: ["text1", "text2"],
  },
  {
    name: "word_counter",
    description: "Text metrics: words, characters, sentences, paragraphs, reading time",
    url: "https://word-counter-production.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { text: { type: "string", description: "Text to analyze" } },
    required: ["text"],
  },
  {
    name: "lorem_ipsum",
    description: "Generate Lorem Ipsum placeholder text -- paragraphs, sentences, or words",
    url: "https://lorem-ipsum-production-efa3.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { count: { type: "number", description: "Number of units (default: 3)" }, type: { type: "string", description: "Unit type", enum: ["paragraphs", "sentences", "words"] } },
    required: ["count", "type"],
  },
  {
    name: "slug_generator",
    description: "Convert text to clean URL-friendly slugs with transliteration",
    url: "https://slug-generator-production.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { text: { type: "string", description: "Text to slugify" }, separator: { type: "string", description: "Separator (default: -)" } },
    required: ["text"],
  },
  {
    name: "regex_tester",
    description: "Test regex patterns -- matches, capture groups, positions, pattern explanations",
    url: "https://regex-generator-production-0566.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { pattern: { type: "string", description: "Regex pattern (no delimiters)" }, flags: { type: "string", description: "Flags: g, i, m, s, u" }, testStrings: { type: "array", description: "Strings to test against" } },
    required: ["pattern", "testStrings"],
  },
  {
    name: "html_to_markdown",
    description: "Convert HTML to clean Markdown -- preserves headings, links, lists, images",
    url: "https://html-to-markdown-production-3fc7.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { html: { type: "string", description: "HTML content" } },
    required: ["html"],
  },
  {
    name: "markdown_to_html",
    description: "Convert Markdown to HTML -- headings, lists, code blocks, tables, links",
    url: "https://markdown-to-html-x402-production.up.railway.app",
    price: "$0.001", category: "text",
    parameters: { markdown: { type: "string", description: "Markdown text" }, wrapInDocument: { type: "boolean", description: "Full HTML doc wrapper (default: false)" } },
    required: ["markdown"],
  },
  {
    name: "markdown_renderer",
    description: "Render Markdown to styled HTML with CSS themes -- light, dark, GitHub",
    url: "https://markdown-renderer-production.up.railway.app",
    price: "$0.002", category: "text",
    parameters: { markdown: { type: "string", description: "Markdown text" }, theme: { type: "string", description: "CSS theme", enum: ["light", "dark", "github"] } },
    required: ["markdown"],
  },

  // ═══════════════════════════════════════════════════════════
  // RESEARCH — 2 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "fact_checker",
    description: "Verify factual claims with web evidence, source URLs, and confidence assessment",
    url: "https://fact-checker-production-097f.up.railway.app",
    price: "$0.005", category: "research",
    parameters: { claim: { type: "string", description: "Factual claim to verify" }, max_sources: { type: "number", description: "Max sources (default: 5, max: 10)" } },
    required: ["claim"],
  },
  {
    name: "research_report",
    description: "Multi-source research reports on any topic -- structured markdown, findings, sources",
    url: "https://research-report-production.up.railway.app",
    price: "$0.02", category: "research",
    parameters: { topic: { type: "string", description: "Research topic" }, depth: { type: "string", description: "Depth", enum: ["quick", "standard", "deep"] } },
    required: ["topic"],
  },

  // ═══════════════════════════════════════════════════════════
  // COMPLIANCE — 2 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "gdpr_scanner",
    description: "Scan website GDPR compliance: consent, privacy, trackers. Score 0-100",
    url: "https://gdpr-scanner-production.up.railway.app",
    price: "$0.02", category: "compliance",
    parameters: { url: { type: "string", description: "URL to scan" } },
    required: ["url"],
  },
  {
    name: "pii_detector",
    description: "Detect PII in text -- emails, phones, SSNs, credit cards, IPs with risk scoring and redaction",
    url: "https://pii-detector-production.up.railway.app",
    price: "$0.005", category: "compliance",
    parameters: { text: { type: "string", description: "Text to scan for PII" } },
    required: ["text"],
  },

  // ═══════════════════════════════════════════════════════════
  // VALIDATION — 3 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "phone_validation",
    description: "Validate phone numbers worldwide: carrier, line type, country, E.164 format",
    url: "https://phone-validation-x402-production.up.railway.app",
    price: "$0.003", category: "validation",
    parameters: { phone: { type: "string", description: "Phone number (+33612345678)" } },
    required: ["phone"],
  },
  {
    name: "phone_validation_batch",
    description: "Validate up to 50 phone numbers in a single batch request",
    url: "https://phone-validation-x402-production.up.railway.app",
    price: "$0.025", category: "validation",
    parameters: { phones: { type: "array", description: "Array of phone numbers (max 50)" } },
    required: ["phones"],
  },
  {
    name: "sms_validator",
    description: "Validate if a phone number can receive SMS with carrier type and E.164 format",
    url: "https://sms-validator-production-d5a0.up.railway.app",
    price: "$0.002", category: "validation",
    parameters: { phone: { type: "string", description: "Phone number with country code" }, countryCode: { type: "string", description: "ISO country code hint (US, FR)" } },
    required: ["phone"],
  },
  {
    name: "address_validator",
    description: "Parse, validate, normalize postal addresses with country detection",
    url: "https://address-validator-production-33e1.up.railway.app",
    price: "$0.003", category: "validation",
    parameters: { address: { type: "string", description: "Full address string" } },
    required: ["address"],
  },
  {
    name: "json_validator",
    description: "Validate JSON syntax and check against JSON Schema with structure stats",
    url: "https://json-validator-production.up.railway.app",
    price: "$0.001", category: "validation",
    parameters: { json: { type: "string", description: "JSON string to validate" }, schema: { type: "object", description: "JSON Schema to validate against (optional)" } },
    required: ["json"],
  },

  // ═══════════════════════════════════════════════════════════
  // DEVELOPER TOOLS — 2 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "code_sandbox",
    description: "Execute Python, JavaScript, or SQL in a sandbox with stdout, execution time, errors",
    url: "https://code-sandbox-production-9b5e.up.railway.app",
    price: "$0.01", category: "developer",
    parameters: { code: { type: "string", description: "Code to execute" }, language: { type: "string", description: "Language", enum: ["python", "javascript", "sql"] }, timeout: { type: "number", description: "Timeout ms (default: 5000, max: 10000)" } },
    required: ["code", "language"],
  },

  // ═══════════════════════════════════════════════════════════
  // GENERATORS — 5 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "qr_code",
    description: "Generate QR codes from text or URLs -- base64 PNG output, configurable size",
    url: "https://qr-code-production-cf4b.up.railway.app",
    price: "$0.001", category: "generator",
    parameters: { data: { type: "string", description: "Text or URL to encode" }, size: { type: "number", description: "Size in modules (default: 21)" } },
    required: ["data"],
  },
  {
    name: "barcode_generator",
    description: "Generate barcodes -- EAN-13, UPC-A, Code128, Code39 as base64 SVG",
    url: "https://barcode-generator-x402-production.up.railway.app",
    price: "$0.001", category: "generator",
    parameters: { data: { type: "string", description: "Data to encode" }, format: { type: "string", description: "Format", enum: ["code128", "code39", "ean13", "upca"] }, height: { type: "number", description: "Height px (default: 100)" } },
    required: ["data"],
  },
  {
    name: "hash_generator",
    description: "Generate MD5, SHA1, SHA256, SHA512, and bcrypt hashes",
    url: "https://hash-generator-production.up.railway.app",
    price: "$0.001", category: "generator",
    parameters: { text: { type: "string", description: "Text to hash" }, algorithm: { type: "string", description: "Algorithm", enum: ["md5", "sha1", "sha256", "sha512", "bcrypt"] } },
    required: ["text"],
  },
  {
    name: "uuid_generator",
    description: "Generate UUID v4, v7, ULID, or nanoid identifiers -- batch up to 100",
    url: "https://uuid-generator-production.up.railway.app",
    price: "$0.001", category: "generator",
    parameters: { format: { type: "string", description: "Format", enum: ["uuidv4", "uuidv7", "ulid", "nanoid"] }, count: { type: "number", description: "Count (default: 1, max: 100)" } },
  },
  {
    name: "color_palette",
    description: "Generate harmonious color palettes from hex -- 5 schemes, hex/RGB/HSL/CSS vars",
    url: "https://color-palette-production-8c81.up.railway.app",
    price: "$0.001", category: "generator",
    parameters: { color: { type: "string", description: "Base hex color (#FF5733)" }, scheme: { type: "string", description: "Scheme", enum: ["complementary", "analogous", "triadic", "split-complementary", "tetradic"] }, count: { type: "number", description: "Colors (default: 5, max: 10)" } },
    required: ["color"],
  },

  // ═══════════════════════════════════════════════════════════
  // DOCUMENTS
  // ═══════════════════════════════════════════════════════════
  {
    name: "pdf_generator",
    description: "Generate PDF from HTML or Markdown with custom page size, margins, headers",
    url: "https://pdf-generator-x402-production.up.railway.app",
    price: "$0.008", category: "document",
    parameters: { content: { type: "string", description: "HTML or Markdown content" }, format: { type: "string", description: "Content format", enum: ["html", "markdown"] }, pageSize: { type: "string", description: "Page size", enum: ["A4", "Letter", "Legal"] }, landscape: { type: "boolean", description: "Landscape (default: false)" } },
    required: ["content"],
  },

  // ═══════════════════════════════════════════════════════════
  // UTILITY — 7 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "base64_codec",
    description: "Encode/decode base64 with standard and URL-safe variants",
    url: "https://base64-codec-x402-production.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { data: { type: "string", description: "Data to encode or decode" }, action: { type: "string", description: "Action", enum: ["encode", "decode"] } },
    required: ["data"],
  },
  {
    name: "csv_to_json",
    description: "Parse CSV to JSON array -- auto-detect delimiter, header row support",
    url: "https://csv-to-json-production-0ca3.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { csv: { type: "string", description: "CSV content" }, delimiter: { type: "string", description: "Delimiter (auto-detect)" }, hasHeaders: { type: "boolean", description: "First row is headers (default: true)" } },
    required: ["csv"],
  },
  {
    name: "cron_parser",
    description: "Parse, validate, explain cron expressions with next N run times in any timezone",
    url: "https://cron-parser-production-128b.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { expression: { type: "string", description: "Cron expression" }, timezone: { type: "string", description: "IANA timezone (default: UTC)" }, count: { type: "number", description: "Next runs (default: 5, max: 20)" } },
    required: ["expression"],
  },
  {
    name: "crontab_generator",
    description: "Natural language to cron -- 'every Monday at 9am' to valid cron expression",
    url: "https://crontab-generator-production.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { description: { type: "string", description: "Natural language schedule" } },
    required: ["description"],
  },
  {
    name: "timezone_converter",
    description: "Convert datetime between timezones -- all IANA zones, UTC offset, DST-aware",
    url: "https://timezone-converter-x402-production.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { datetime: { type: "string", description: "ISO 8601 datetime" }, from: { type: "string", description: "Source IANA timezone" }, to: { type: "string", description: "Target IANA timezone" } },
    required: ["datetime", "from", "to"],
  },
  {
    name: "unit_converter",
    description: "Convert units -- length, weight, temperature, volume, speed, data storage",
    url: "https://unit-converter-production-0b91.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { value: { type: "number", description: "Numeric value" }, from: { type: "string", description: "Source unit (km, lb, celsius)" }, to: { type: "string", description: "Target unit (mi, kg, fahrenheit)" } },
    required: ["value", "from", "to"],
  },
  {
    name: "url_shortener",
    description: "Shorten URLs -- hash-based, custom alias support",
    url: "https://url-shortener-production-5384.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { url: { type: "string", description: "URL to shorten" }, custom_alias: { type: "string", description: "Custom alias (3-20 chars)" } },
    required: ["url"],
  },
  {
    name: "user_agent_parser",
    description: "Parse user agent strings -- browser, OS, device type, engine, bot detection",
    url: "https://user-agent-parser-production.up.railway.app",
    price: "$0.001", category: "utility",
    parameters: { userAgent: { type: "string", description: "User agent string" } },
    required: ["userAgent"],
  },

  // ═══════════════════════════════════════════════════════════
  // DATA — 2 APIs
  // ═══════════════════════════════════════════════════════════
  {
    name: "weather",
    description: "Current weather and 7-day forecast -- temperature, humidity, wind, precipitation",
    url: "https://weather-api-x402-production.up.railway.app",
    price: "$0.001", category: "data",
    parameters: { latitude: { type: "number", description: "Latitude" }, longitude: { type: "number", description: "Longitude" }, city: { type: "string", description: "City name (alt to lat/lon)" } },
  },
  {
    name: "vector_search",
    description: "In-memory vector store with TF-IDF and cosine similarity for document retrieval",
    url: "https://vector-search-production-bc61.up.railway.app",
    price: "$0.005", category: "data",
    parameters: { documents: { type: "array", description: "Text documents to index (optional)" }, query: { type: "string", description: "Search query" }, topK: { type: "number", description: "Top results (default: 3, max: 10)" }, namespace: { type: "string", description: "Namespace to isolate doc sets" } },
    required: ["query"],
  },
];

export const CATEGORIES = [...new Set(CATALOG.map((t) => t.category))];

export function getToolsByCategory(category: string): ApiTool[] {
  return CATALOG.filter((t) => t.category === category);
}

export function getTool(name: string): ApiTool | undefined {
  return CATALOG.find((t) => t.name === name);
}
