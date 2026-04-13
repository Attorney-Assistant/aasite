const API_KEY = import.meta.env.BABYLOVEGROWTH;
const BASE_URL = "https://api.babylovegrowth.ai/api/integrations";

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

async function blgFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  if (!API_KEY) return [] as unknown as T;

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  });
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
  const articles = await blgFetch<BLGArticleSummary[]>("/v1/articles", {
    limit: "500",
    offset: "0",
  });

  if (!articles || articles.length === 0) return [];

  // Fetch full content for each article — throttled to respect BLG's 5 req/sec rate limit.
  // Batch in groups of 4 with a 1-second pause between batches.
  const BATCH_SIZE = 4;
  const full: BLGArticleFull[] = [];
  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((a) =>
        blgFetch<BLGArticleFull>(`/v1/articles/${a.id}`).catch((e) => {
          console.error(`[BLG] Failed to fetch article ${a.id} (${a.slug}):`, e.message);
          return null;
        })
      )
    );
    full.push(...results.filter((r): r is BLGArticleFull => r !== null));
    // Pause between batches unless this was the last one
    if (i + BATCH_SIZE < articles.length) {
      await new Promise((resolve) => setTimeout(resolve, 1100));
    }
  }

  // Filter out any failed/empty fetches
  const valid = full.filter((article) => article && article.slug);

  return valid.map((article) => ({
    id: `blg-${article.id}`,
    slug: article.slug,
    title: article.title,
    postBody: cleanContentHtml(article.content_html, article.hero_image_url),
    excerpt: article.meta_description || stripMarkdown(article.excerpt) || "",
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
    seoTitle: article.title,
    seoDescription: article.meta_description || stripMarkdown(article.excerpt) || "",
    source: "babylovegrowth" as const,
  }));
}
