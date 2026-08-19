import { rebrandText } from "./rebrand";

// Outrank.so — AI SEO articles, pulled at build time (replaced BabyLoveGrowth,
// Aug 2026). Uses the "Next.js Blog" integration API: X-API-Key auth against
// /api/integrations/nextjs-blog/articles (endpoint + schema taken from
// Outrank's official outrank-next-js-blog client package). The key comes from
// the OUTRANK env var (GitHub secret of the same name); with no key set, this
// source contributes zero posts and the build carries on.
const API_KEY = import.meta.env.OUTRANK;
const BASE_URL = "https://outrank.so/api/integrations/nextjs-blog";
const PAGE_SIZE = 50;

interface OutrankArticleSummary {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  image_url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  reading_time_minutes: number;
}

interface OutrankArticle extends OutrankArticleSummary {
  html: string;
  content_markdown: string;
}

async function outrankFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": API_KEY, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Outrank API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

function cleanContentHtml(html: string): string {
  let cleaned = html;
  // Drop any embedded JSON-LD (the site injects its own schema)
  cleaned = cleaned.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>\s*/gi, "");
  // Remove a leading <h1> (duplicates the page title)
  cleaned = cleaned.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  // Remove a leading hero image (duplicates the featured image)
  cleaned = cleaned.replace(/^\s*<p>\s*<img[^>]*>\s*<\/p>\s*/i, "");
  cleaned = cleaned.replace(/^\s*<img[^>]*>\s*/i, "");
  // Lazy-load all remaining images
  cleaned = cleaned.replace(/<img(?![^>]*loading=)/gi, '<img loading="lazy" decoding="async"');
  return cleaned.trim();
}

let outrankPromise: Promise<Awaited<ReturnType<typeof _fetchOutrankArticles>>> | null = null;

export function fetchOutrankArticles() {
  if (!outrankPromise) {
    outrankPromise = _fetchOutrankArticles().catch((e) => {
      outrankPromise = null; // retry on next call
      throw e;
    });
  }
  return outrankPromise;
}

async function _fetchOutrankArticles() {
  if (!API_KEY) {
    console.log("[Outrank] No OUTRANK API key set — skipping.");
    return [];
  }

  // Paginated summary list
  const summaries: OutrankArticleSummary[] = [];
  let page = 1;
  while (true) {
    const res = await outrankFetch<{ data: { articles: OutrankArticleSummary[]; total: number } }>(
      "/articles",
      { page: String(page), limit: String(PAGE_SIZE) }
    );
    const batch = res.data?.articles || [];
    summaries.push(...batch);
    if (batch.length === 0 || summaries.length >= (res.data?.total ?? 0)) break;
    page += 1;
  }

  // Full content per article, by slug
  const full: OutrankArticle[] = [];
  for (const s of summaries) {
    const res = await outrankFetch<{ data: { article: OutrankArticle } }>(
      `/articles/${encodeURIComponent(s.slug)}`
    ).catch((e) => {
      console.error(`[Outrank] Failed to fetch article ${s.slug}:`, e.message);
      return null;
    });
    if (res?.data?.article) full.push(res.data.article);
  }

  console.log(`[Outrank] ${summaries.length} articles listed, ${full.length} bodies fetched.`);

  return full
    .filter((article) => article && article.slug && article.html)
    .map((article) => ({
      id: `outrank-${article.id}`,
      slug: article.slug,
      title: rebrandText(article.title),
      postBody: rebrandText(cleanContentHtml(article.html)),
      excerpt: rebrandText(article.meta_description || ""),
      featuredImage: article.image_url || null,
      publishedDate: article.created_at,
      authorName: "Attorney Assistant",
      authorAvatar: null as string | null,
      tags: (article.tags || []).map((name, i) => ({
        id: i,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      })),
      seoTitle: rebrandText(article.title),
      seoDescription: rebrandText(article.meta_description || ""),
      source: "outrank" as const,
    }));
}
