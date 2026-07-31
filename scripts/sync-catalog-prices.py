#!/usr/bin/env python3
"""Resynchronise les prix de src/catalog.ts du paquet x402-agent-tools sur la
spec OpenAPI reellement servie par klymax402.com.

Le catalogue porte 103 prix en dur, recopies a la main a chaque repricing. Un
agent qui installe le paquet budgete donc sur des prix perimes et se prend un
402 au mauvais montant.

Usage : python3 sync-npm-catalog.py <openapi.json> <catalog.ts> [--write]
"""
import json
import re
import shutil
import sys
from datetime import datetime

def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    spec_path, catalog_path = sys.argv[1], sys.argv[2]
    write = "--write" in sys.argv

    spec = json.load(open(spec_path))
    # (slug, METHOD, path) -> amount
    prices = {}
    for full_path, ops in spec["paths"].items():
        if not full_path.startswith("/api/"):
            continue
        parts = full_path.split("/")
        slug, orig = parts[2], "/" + "/".join(parts[3:])
        for method, op in ops.items():
            amt = op.get("x-payment-info", {}).get("price", {}).get("amount")
            if amt is not None:
                prices[(slug, method.upper(), orig)] = str(amt)

    src = open(catalog_path, encoding="utf-8").read()

    # Chaque entree du catalogue est un objet plat : on la delimite sur "name:".
    entry_re = re.compile(
        r'name:\s*"(?P<name>[^"]+)",.*?'
        r'url:\s*"https://(?P<slug>[a-z0-9-]+)\.api\.klymax402\.com",\s*\n'
        r'\s*method:\s*"(?P<method>[A-Z]+)",\s*\n'
        r'\s*path:\s*"(?P<path>[^"]+)",\s*\n'
        r'\s*price:\s*"\$(?P<price>[0-9.]+)"',
        re.S,
    )

    fixes, misses = [], []
    out, last = [], 0
    for m in entry_re.finditer(src):
        key = (m.group("slug"), m.group("method"), m.group("path"))
        want = prices.get(key)
        if want is None:
            misses.append(f'  {m.group("name"):28} {m.group("method")} {m.group("slug")}{m.group("path")} — absente de openapi.json')
            continue
        have = m.group("price")
        if have == want:
            continue
        fixes.append(f'  {m.group("name"):28} ${have} -> ${want}')
        s, e = m.span("price")
        out.append(src[last:s])
        out.append(want)
        last = e
    out.append(src[last:])
    new_src = "".join(out)

    print(f"{len(prices)} routes tarifees dans openapi.json\n")
    if misses:
        print("Entrees non appariees :")
        print("\n".join(misses), "\n")
    if not fixes:
        print("Prix : aucune divergence.")
    else:
        print(f"Prix : {len(fixes)} divergences")
        print("\n".join(fixes))

    if write and fixes:
        shutil.copy(catalog_path, f"{catalog_path}.bak-{datetime.utcnow():%Y-%m-%d}")
        open(catalog_path, "w", encoding="utf-8").write(new_src)
        print(f"\nApplique ({len(fixes)} prix).")
    elif not write:
        print("\n(dry-run : rien ecrit)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
