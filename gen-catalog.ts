// One-shot generator: rebuild catalog.ts with correct method/path/params from source API configs.
// Keeps curated name/description/url/price/category; overrides parameters from real inputSchema.
import { CATALOG } from "./src/catalog.ts";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const apisDir = join(here, "..", "..", "apis");

function slugFromUrl(url: string): string {
  const m = url.match(/^https?:\/\/([^.]+)\.api\.klymax402\.com/);
  return m ? m[1] : "";
}

type Param = { type: string; description: string; enum?: string[] };

// Catalog entries that should map to route[1] (their slug is shared with another entry).
const ROUTE_INDEX: Record<string, number> = {
  nft_rarity: 1,
  ip_geolocation_batch: 1,
  phone_validation_batch: 1,
};

const audit: string[] = [];
const out: any[] = [];

for (const entry of CATALOG) {
  const slug = slugFromUrl(entry.url);
  const fsPath = join(apisDir, slug, "src", "config.ts");
  if (!slug) { audit.push(`NO_SLUG: ${entry.name} (${entry.url})`); out.push({ ...entry, _missing: true }); continue; }
  if (!existsSync(fsPath)) { audit.push(`NO_DIR: ${entry.name} -> ${slug}`); out.push({ ...entry, _missing: true }); continue; }

  let mod: any;
  try { mod = await import(pathToFileURL(fsPath).href); }
  catch (e: any) { audit.push(`IMPORT_FAIL: ${slug}: ${e.message}`); out.push({ ...entry, _missing: true }); continue; }

  const routes = mod.API_CONFIG?.routes ?? [];
  if (routes.length === 0) { audit.push(`NO_ROUTES: ${slug}`); out.push({ ...entry, _missing: true }); continue; }
  const idx = ROUTE_INDEX[entry.name] ?? 0;
  if (routes.length > 1) audit.push(`MULTI_ROUTE(${routes.length}): ${entry.name}/${slug} -> route[${idx}] ${routes[idx].path}`);

  const r = routes[idx];
  const props = r.inputSchema?.properties ?? {};
  const params: Record<string, Param> = {};
  for (const [k, v] of Object.entries<any>(props)) {
    params[k] = { type: v.type ?? "string", description: v.description ?? "" };
    if (v.enum) params[k].enum = v.enum;
  }
  const required: string[] = r.inputSchema?.required ?? r.required ?? [];

  // key mismatch report
  const oldKeys = Object.keys(entry.parameters ?? {}).sort().join(",");
  const newKeys = Object.keys(params).sort().join(",");
  if (oldKeys !== newKeys) audit.push(`KEY_DIFF: ${slug} | old[${oldKeys}] -> new[${newKeys}]`);

  out.push({
    name: entry.name,
    description: entry.description,
    url: entry.url,
    method: r.method ?? "GET",
    path: r.path,
    price: entry.price,
    category: entry.category,
    parameters: params,
    required,
  });
}

console.log("=== AUDIT ===");
console.log(audit.join("\n") || "(no issues)");
console.log(`\n=== STATS ===\ntotal=${CATALOG.length} generated=${out.filter(o=>!o._missing).length} missing=${out.filter(o=>o._missing).length}`);

// Write the generated entries to JSON for inspection
await Bun.write(join(here, "gen-catalog.json"), JSON.stringify(out, null, 2));

// --- Emit the new catalog.ts ---
const q = (s: string) => JSON.stringify(s);
function emitParams(params: Record<string, Param>): string {
  const parts = Object.entries(params).map(([k, p]) => {
    const enumPart = p.enum ? `, enum: ${JSON.stringify(p.enum)}` : "";
    return `${q(k)}: { type: ${q(p.type)}, description: ${q(p.description)}${enumPart} }`;
  });
  return `{ ${parts.join(", ")} }`;
}
function emitEntry(e: any): string {
  const req = (e.required && e.required.length) ? `\n    required: ${JSON.stringify(e.required)},` : "";
  return `  {
    name: ${q(e.name)},
    description: ${q(e.description)},
    url: ${q(e.url)},
    method: ${q(e.method)},
    path: ${q(e.path)},
    price: ${q(e.price)}, category: ${q(e.category)},
    parameters: ${emitParams(e.parameters)},${req}
  },`;
}

const header = `export interface ApiTool {
  name: string;
  description: string;
  url: string;
  method: string;
  path: string;
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
`;
const footer = `];

export const CATEGORIES = [...new Set(CATALOG.map((t) => t.category))];

export function getToolsByCategory(category: string): ApiTool[] {
  return CATALOG.filter((t) => t.category === category);
}

export function getTool(name: string): ApiTool | undefined {
  return CATALOG.find((t) => t.name === name);
}
`;
const body = out.map(emitEntry).join("\n");
await Bun.write(join(here, "src", "catalog.generated.ts"), header + body + "\n" + footer);
console.log("\nWrote src/catalog.generated.ts");
