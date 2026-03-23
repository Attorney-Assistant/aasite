const API_KEY = import.meta.env.BABYLOVEGROWTH;
const BASE_URL = "https://api.babylovegrowth.ai/api/integrations";

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

export async function fetchBLGArticles() {
  const articles = await blgFetch<BLGArticleSummary[]>("/v1/articles", {
    limit: "500",
    offset: "0",
  });

  if (!articles || articles.length === 0) return [];

  // Fetch full content for each article
  const full = await Promise.all(
    articles.map((a) => blgFetch<BLGArticleFull>(`/v1/articles/${a.id}`))
  );

  // Filter out any failed/empty fetches
  const valid = full.filter((article) => article && article.slug);

  return valid.map((article) => ({
    id: `blg-${article.id}`,
    slug: article.slug,
    title: article.title,
    postBody: article.content_html,
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
