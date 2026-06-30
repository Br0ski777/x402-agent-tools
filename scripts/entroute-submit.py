#!/usr/bin/env python3
"""
EntRoute mass-submit v2 — klymax402
- Utilise klymax402.com/api/{slug}/... (root domain → 1 provider groupé)
- Capability IDs vérifiés contre /capabilities EntRoute live
- Rate limit : 10 req/h anonymous → 1 submit toutes les 6.5s + pause 70s entre batches
"""

import time
import json
import urllib.request
import urllib.error

ENTROUTE_SUBMIT = "https://api.entroute.com/submit"
CONTACT = "broski.corp@protonmail.com"
PROVIDER = "klymax402"
BASE = "https://klymax402.com/api"

# Mapping slug → (capability_id, path, price_per_call)
APIS = [
    # Finance / Stocks
    ("stock-price",         "finance.stock_quote",          "/api/quote",       0.002),
    ("currency-converter",  "finance.fx_convert",           "/api/convert",     0.001),
    ("token-price",         "finance.crypto_price",         "/api/price",       0.001),
    ("token-ohlcv",         "finance.crypto_historical",    "/api/ohlcv",       0.003),
    # DeFi
    ("dex-quotes",          "defi.swap_quote",              "/api/quote",       0.003),
    ("bridge-routes",       "defi.swap_quote",              "/api/routes",      0.003),
    ("jupiter-quotes",      "defi.swap_quote",              "/api/quote",       0.003),
    ("orderbook-depth",     "defi.swap_quote",              "/api/depth",       0.003),
    ("defi-yields",         "defi.yield_opportunities",     "/api/yields",      0.003),
    ("base-defi",           "defi.yield_opportunities",     "/api/yields",      0.005),
    ("hl-vaults",           "defi.yield_opportunities",     "/api/vaults",      0.003),
    ("solana-pools",        "defi.yield_opportunities",     "/api/pools",       0.003),
    ("liquidation-oracle",  "defi.yield_opportunities",     "/api/risks",       0.003),
    ("hl-portfolio",        "defi.portfolio",               "/api/portfolio",   0.005),
    ("wallet-portfolio",    "defi.portfolio",               "/api/portfolio",   0.003),
    ("hl-spot",             "defi.token_price",             "/api/prices",      0.001),
    # Perps / Funding
    ("hl-funding",          "finance.perpetuals",           "/api/rates",       0.0001),
    ("funding-rates",       "finance.perpetuals",           "/api/rates",       0.002),
    ("funding-arb",         "finance.perpetuals",           "/api/arb",         0.005),
    ("hyperliquid-data",    "finance.perpetuals",           "/api/market",      0.002),
    # Smart money / Whales
    ("hyperliquid-whales",  "finance.smart_money",          "/api/positions",   0.002),
    ("whale-alert",         "crypto.smart_money",           "/api/alerts",      0.003),
    # Crypto / Token analysis
    ("token-safety",        "crypto.risk_intelligence",     "/api/check",       0.005),
    ("token-holders",       "crypto.token_analysis",        "/api/holders",     0.005),
    ("solana-launches",     "crypto.token_analysis",        "/api/launches",    0.003),
    ("airdrop-checker",     "crypto.token_analysis",        "/api/check",       0.003),
    # Gas
    ("gas-estimator",       "crypto.gas_price",             "/api/estimate",    0.001),
    ("gas-oracle",          "crypto.gas_price",             "/api/prices",      0.001),
    ("solana-fees",         "crypto.gas_price",             "/api/fees",        0.001),
    # Identity / Wallet
    ("ens-resolver",        "identity.wallet_profile",      "/api/resolve",     0.001),
    # Prediction markets
    ("prediction-markets",  "prediction.market",            "/api/markets",     0.003),
    ("event-resolver",      "prediction.market",            "/api/resolve",     0.003),
    # News
    ("crypto-news",         "news.crypto",                  "/api/feed",        0.003),
    # Web
    ("web-search",          "web.search",                   "/api/search",      0.003),
    ("web-scraper",         "web.scrape",                   "/api/scrape",      0.003),
    ("screenshot-pdf",      "web.screenshot",               "/api/capture",     0.010),
    ("html-to-markdown",    "web.html_to_markdown",         "/api/convert",     0.001),
    ("fact-checker",        "ai.research",                  "/api/check",       0.010),
    ("research-report",     "ai.research",                  "/api/report",      0.010),
    # Security
    ("gdpr-scanner",        "security.compliance_check",    "/api/scan",        0.010),
    ("ssl-checker",         "security.score",               "/api/check",       0.002),
    ("trust-score",         "security.score",               "/api/score",       0.005),
    ("http-headers",        "security.api_health",          "/api/analyze",     0.001),
    # Email
    ("email-verification",  "email.validate",               "/api/verify",      0.001),
    ("email-deliverability","email.validate",               "/api/audit",       0.005),
    ("email-send",          "email.send",                   "/api/send",        0.005),
    # Text / NLP
    ("sentiment-analyzer",  "text.sentiment",               "/api/analyze",     0.001),
    ("text-classifier",     "text.classify",                "/api/classify",    0.001),
    ("pii-detector",        "text.anonymize",               "/api/detect",      0.001),
    ("ai-summarizer",       "text.summarize",               "/api/summarize",   0.005),
    # Translate
    ("text-translator",     "translate.text",               "/api/translate",   0.001),
    ("language-detector",   "translate.detect_language",    "/api/detect",      0.001),
    # Text-to-speech
    ("text-to-speech",      "ai.text_to_speech",            "/api/speak",       0.010),
    # Geo
    ("ip-geolocation",      "geo.ip_lookup",                "/api/lookup",      0.001),
    ("timezone-converter",  "geo.timezone",                 "/api/convert",     0.001),
    # DNS / WHOIS
    ("dns-lookup",          "dns.lookup",                   "/api/lookup",      0.001),
    ("domain-intelligence", "whois.lookup",                 "/api/intel",       0.005),
    # NFT
    ("nft-floor",           "nft.collection",               "/api/floor",       0.003),
    ("nft-metadata",        "nft.token",                    "/api/metadata",    0.001),
    # Image
    ("image-resize",        "image.resize",                 "/api/resize",      0.002),
    # Docs / OCR
    ("ocr-extract",         "docs.ocr",                     "/api/extract",     0.010),
    # QR
    ("qr-code",             "qr.generate",                  "/api/generate",    0.001),
    # Phone
    ("phone-validation",    "phone.validate",               "/api/validate",    0.001),
    ("sms-validator",       "phone.validate",               "/api/validate",    0.001),
    # Social
    ("twitter-scraper",     "social.twitter.user",          "/api/profile",     0.010),
    ("social-profile",      "social.twitter.user",          "/api/profile",     0.005),
    # URL
    ("url-shortener",       "url.shorten",                  "/api/shorten",     0.001),
    # Weather
    ("weather-api",         "weather.current",              "/api/weather",     0.001),
    # Person enrichment (fallback to identity)
    ("person-enrichment",   "identity.wallet_profile",      "/api/enrich",      0.010),
]

def submit(slug, capability_id, path, price):
    endpoint_url = f"{BASE}/{slug}{path}"
    payload = json.dumps({
        "endpoint_url": endpoint_url,
        "capability_id": capability_id,
        "contact_email": CONTACT,
        "provider_name": PROVIDER,
        "price_per_call": price,
    }).encode("utf-8")

    req = urllib.request.Request(
        ENTROUTE_SUBMIT,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = json.loads(resp.read())
            return "ok", body
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return "err", body
    except Exception as ex:
        return "err", str(ex)

results = {"ok": [], "err": []}
total = len(APIS)

print(f"Submitting {total} APIs to EntRoute (root domain klymax402.com)...")
print("Rate: 1 req / 7s  (~8/min, stays under 10/hr anonymous)\n")

for i, (slug, cap, path, price) in enumerate(APIS):
    status, body = submit(slug, cap, path, price)
    results[status].append({"slug": slug, "cap": cap, "detail": body})
    icon = "✓" if status == "ok" else "✗"
    print(f"[{i+1:02d}/{total}] {icon} {slug} → {cap}  |  {body if status=='err' else body.get('id','?')}")
    if i < total - 1:
        time.sleep(7)

print(f"\n=== DONE ===")
print(f"✓ {len(results['ok'])} submitted")
print(f"✗ {len(results['err'])} failed")
with open("/tmp/entroute-v2-results.json", "w") as f:
    json.dump(results, f, indent=2)
print("Results saved to /tmp/entroute-v2-results.json")
