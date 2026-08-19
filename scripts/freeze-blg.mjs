/**
 * One-off: final pull from BabyLoveGrowth before retiring the integration
 * (Aug 2026 — replaced by Outrank.so).
 *
 * Fetches the complete article list, reuses locally cached bodies from
 * scripts/output/blg-cache.json where available, fetches the rest, and writes
 * the full raw article set to src/data/blg-articles.json (tracked in git).
 * src/lib/babylovegrowth.ts reads that static file from then on — no API key,
 * no network, no Actions cache.
 *
 * Usage: node scripts/freeze-blg.mjs   (needs BABYLOVEGROWTH in .env)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

// Minimal .env parser (no deps)
let apiKey = process.env.BABYLOVEGROWTH;
if (!apiKey) {
  try {
    const env = readFileSync(join(root, ".env"), "utf-8");
    const m = env.match(/^BABYLOVEGROWTH=(.+)$/m);
    if (m) apiKey = m[1].trim();
  } catch {}
}
if (!apiKey) {
  console.error("BABYLOVEGROWTH key not found in env or .env");
  process.exit(1);
}

const BASE_URL = "https://api.babylovegrowth.ai/api/integrations";
const MIN_INTERVAL_MS = 2100; // BLG limit: 30 req/min
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let lastCall = 0;
async function blgFetch(path, params) {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const wait = lastCall + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  const res = await fetch(url, { headers: { "X-API-Key": apiKey, "Content-Type": "application/json" } });
  if (res.status === 429) {
    await sleep(10000);
    return blgFetch(path, params);
  }
  if (!res.ok) throw new Error(`BLG API ${res.status}: ${await res.text()}`);
  return res.json();
}

// 1. Full article list
const PAGE_SIZE = 50;
const summaries = [];
let offset = 0;
while (true) {
  const page = await blgFetch("/v1/articles", { limit: String(PAGE_SIZE), offset: String(offset) });
  if (!page || page.length === 0) break;
  summaries.push(...page);
  if (page.length < PAGE_SIZE) break;
  offset += PAGE_SIZE;
}
console.log(`List: ${summaries.length} articles`);

// 2. Bodies: reuse local cache, fetch the rest
let cache = { articles: {} };
try {
  cache = JSON.parse(readFileSync(join(root, "scripts/output/blg-cache.json"), "utf-8"));
} catch {}

const articles = {};
let fetched = 0;
for (const s of summaries) {
  if (cache.articles[s.id]) {
    articles[s.id] = cache.articles[s.id];
    continue;
  }
  try {
    articles[s.id] = await blgFetch(`/v1/articles/${s.id}`);
    fetched++;
    console.log(`  fetched ${s.slug}`);
  } catch (e) {
    console.error(`  FAILED ${s.id} (${s.slug}): ${e.message}`);
    process.exitCode = 1;
  }
}

const outPath = join(root, "src/data/blg-articles.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ version: 1, frozenAt: new Date().toISOString(), articles }, null, 0), "utf-8");
console.log(`Frozen ${Object.keys(articles).length} articles (${fetched} newly fetched) → src/data/blg-articles.json`);
