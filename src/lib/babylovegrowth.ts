import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { rebrandText } from "./rebrand";

const API_KEY = import.meta.env.BABYLOVEGROWTH;
const BASE_URL = "https://api.babylovegrowth.ai/api/integrations";

// Disk cache of fetched article bodies, keyed by BLG article id. The summary
// list is cheap; per-article content fetches are not — so we only pull content
// for articles we haven't already cached. Persisted across CI runs via
// actions/cache (see .github/workflows/deploy.yml).
//
// NOTE: keyed on id presence only. Edits to an EXISTING article's content are
// NOT picked up until its cache entry is dropped — delete scripts/output/
// blg-cache.json (or clear the Actions cache) to force a full refresh.
const CACHE_PATH = join(process.cwd(), "scripts/output/blg-cache.json");

interface BLGCache {
  version: number;
  articles: Record<string, BLGArticleFull>;
}

function readCache(): BLGCache {
  try {
    const parsed = JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
    if (parsed && parsed.version === 1 && parsed.articles) return parsed as BLGCache;
  } catch {
    // missing or corrupt cache → start fresh
  }
  return { version: 1, articles: {} };
}

function writeCache(cache: BLGCache): void {
  try {
    mkdirSync(dirname(CACHE_PATH), { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(cache), "utf-8");
  } catch (e) {
    console.error("[BLG] Failed to write article cache:", (e as Error).message);
  }
}

function cleanContentHtml(html: string, heroImageUrl: string | null): string {
  let cleaned = html;
  // Remove embedded JSON-LD schema script (BLG injects its own)
  cleaned = cleaned.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>\s*/gi, "");
  // Remove leading <h1> (duplicates the page title)
  cleaned = cleaned.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  // Remove leading hero image (duplicates the featured image)
  if (heroImageUrl) {
    cleaned = cleaned.replace(/^\s*<p>\s*<img[^>]*>\s*<\/p>\s*/i, "");
    cleaned = cleaned.replace(/^\s*<img[^>]*>\s*/i, "");
  }
  // Remove BabyLoveGrowth attribution link
  cleaned = cleaned.replace(/<p>\s*<a[^>]*babylovegrowth[^>]*>.*?<\/a>\s*<\/p>/gi, "");
  // Add lazy loading to all remaining images
  cleaned = cleaned.replace(/<img(?![^>]*loading=)/gi, '<img loading="lazy" decoding="async"');
  return cleaned.trim();
}

function stripMarkdown(md: string): string {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, "")     // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // links → text
    .replace(/#{1,6}\s+/g, "")            // headings
    .replace(/[*_~`]/g, "")               // formatting
    .replace(/\n+/g, " ")                 // newlines
    .replace(/\s+/g, " ")
    .trim();
}

interface BLGArticleSummary {
  id: string;
  title: string;
  slug: string;
  hero_image_url: string | null;
  meta_description: string;
  excerpt: string;
  created_at: string;
  seedKeyword: string;
  keywords: string[];
}

interface BLGArticleFull extends BLGArticleSummary {
  content_html: string;
  content_markdown: string;
}

// BLG enforces a hard limit of 30 requests per minute per API key. We pace EVERY
// request (list pagination + per-article fetches) at least this far apart, and
// retry on 429 with backoff. 60000/30 = 2000ms; pad to ~2100ms for safe margin.
const MIN_INTERVAL_MS = 2100;
const MAX_RETRIES = 4;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Shared across all concurrent callers: each call reserves the next time slot.
let nextSlotAt = 0;

async function acquireRateSlot(): Promise<void> {
  const now = Date.now();
  const slot = Math.max(now, nextSlotAt);
  nextSlotAt = slot + MIN_INTERVAL_MS;
  const wait = slot - now;
  if (wait > 0) await sleep(wait);
}

async function blgFetch<T>(path: string, params?: Record<string, string>, attempt = 0): Promise<T> {
  if (!API_KEY) return [] as unknown as T;

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  await acquireRateSlot();

  const res = await fetch(url.toString(), {
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  // Rate limited — back off (honoring Retry-After) and retry.
  if (res.status === 429 && attempt < MAX_RETRIES) {
    const retryAfter = Number(res.headers.get("retry-after"));
    const backoff = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : Math.min(60000, 2000 * 2 ** attempt);
    // Push the shared window out so other in-flight calls also wait.
    nextSlotAt = Math.max(nextSlotAt, Date.now() + backoff);
    await sleep(backoff);
    return blgFetch<T>(path, params, attempt + 1);
  }

  if (!res.ok) {
    throw new Error(`BabyLoveGrowth API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

let blgPromise: Promise<Awaited<ReturnType<typeof _fetchBLGArticles>>> | null = null;

export function fetchBLGArticles() {
  if (!blgPromise) {
    blgPromise = _fetchBLGArticles().catch((e) => {
      blgPromise = null; // Clear cache on failure so next call retries
      throw e;
    });
  }
  return blgPromise;
}

async function _fetchBLGArticles() {
  // BLG API accepts max 50 per request — paginate to get all articles
  const PAGE_SIZE = 50;
  const articles: BLGArticleSummary[] = [];
  let offset = 0;
  while (true) {
    const page = await blgFetch<BLGArticleSummary[]>("/v1/articles", {
      limit: String(PAGE_SIZE),
      offset: String(offset),
    });
    if (!page || page.length === 0) break;
    articles.push(...page);
    if (page.length < PAGE_SIZE) break; // last page
    offset += PAGE_SIZE;
  }

  if (articles.length === 0) return [];

  // Only fetch full content for articles we haven't cached yet. Cached bodies
  // are reused as-is; new fetches are paced/retried inside blgFetch (≤30 req/min).
  const cache = readCache();
  const full: BLGArticleFull[] = [];
  const nextArticles: Record<string, BLGArticleFull> = {};
  let fetchedCount = 0;

  for (const a of articles) {
    const cached = cache.articles[a.id];
    if (cached) {
      full.push(cached);
      nextArticles[a.id] = cached;
      continue;
    }
    const result = await blgFetch<BLGArticleFull>(`/v1/articles/${a.id}`).catch((e) => {
      console.error(`[BLG] Failed to fetch article ${a.id} (${a.slug}):`, e.message);
      return null;
    });
    if (result) {
      full.push(result);
      nextArticles[a.id] = result;
      fetchedCount++;
    }
    // Failed new fetches are intentionally left out of the cache so the next
    // build retries them.
  }

  // Persist, pruned to articles still present in the BLG list (drops deleted ones).
  writeCache({ version: 1, articles: nextArticles });
  console.log(
    `[BLG] ${articles.length} articles: ${fetchedCount} newly fetched, ${articles.length - fetchedCount} from cache.`
  );

  // Filter out any failed/empty fetches
  const valid = full.filter((article) => article && article.slug);

  return valid.map((article) => ({
    id: `blg-${article.id}`,
    slug: article.slug,
    title: rebrandText(article.title),
    postBody: rebrandText(cleanContentHtml(article.content_html, article.hero_image_url)),
    excerpt: rebrandText(article.meta_description || stripMarkdown(article.excerpt) || ""),
    featuredImage: article.hero_image_url || null,
    publishedDate: article.created_at,
    authorName: "Attorney Assistant",
    authorAvatar: null as string | null,
    tags: [
      ...(article.seedKeyword ? [{ id: -1, name: article.seedKeyword, slug: article.seedKeyword.toLowerCase().replace(/\s+/g, "-") }] : []),
      ...article.keywords
        .filter((kw) => kw.toLowerCase() !== article.seedKeyword?.toLowerCase())
        .map((kw, i) => ({
          id: i,
          name: kw,
          slug: kw.toLowerCase().replace(/\s+/g, "-"),
        })),
    ],
    seoTitle: rebrandText(article.title),
    seoDescription: rebrandText(article.meta_description || stripMarkdown(article.excerpt) || ""),
    source: "babylovegrowth" as const,
  }));
}
