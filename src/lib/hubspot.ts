import { rebrandText } from "./rebrand";

const HUBSPOT_ACCESS_TOKEN = import.meta.env.HUBSPOT_ACCESS_TOKEN;
const BASE_URL = "https://api.hubapi.com";
const LANDING_PAGES_TABLE_ID = "197972231";
const TESTIMONIALS_TABLE_ID = "199622291";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function hubspotFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`HubSpot API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

// ─── Blog Posts ──────────────────────────────────────────────

interface HubSpotBlogPost {
  id: string;
  slug: string;
  name: string;
  postBody: string;
  postSummary: string;
  metaDescription: string;
  featuredImage: string;
  publishDate: string;
  authorName: string;
  blogAuthor: { displayName: string; avatar: string } | null;
  tagIds: number[];
  htmlTitle: string;
  state: string;
}

interface HubSpotBlogResponse {
  total: number;
  offset: number;
  limit: number;
  results: HubSpotBlogPost[];
}

interface HubSpotTag {
  id: number;
  name: string;
  slug: string;
}

let tagCache: HubSpotTag[] | null = null;

export async function fetchBlogTags(): Promise<HubSpotTag[]> {
  if (tagCache) return tagCache;
  const data = await hubspotFetch<{ results: HubSpotTag[] }>("/cms/v3/blogs/tags", {
    limit: "250",
  });
  tagCache = data.results;
  return tagCache;
}

let blogPostPromise: Promise<Awaited<ReturnType<typeof _fetchAllBlogPosts>>> | null = null;

export function fetchAllBlogPosts() {
  if (!blogPostPromise) {
    blogPostPromise = _fetchAllBlogPosts().catch((e) => {
      blogPostPromise = null;
      throw e;
    });
  }
  return blogPostPromise;
}

async function _fetchAllBlogPosts() {
  const allPosts: HubSpotBlogPost[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const data = await hubspotFetch<HubSpotBlogResponse>("/cms/v3/blogs/posts", {
      limit: String(limit),
      offset: String(offset),
      state: "PUBLISHED",
      sort: "-publishDate",
    });
    allPosts.push(...data.results);
    if (allPosts.length >= data.total || data.results.length < limit) break;
    offset += limit;
  }

  // Resolve tags
  const tags = await fetchBlogTags();
  const tagMap = new Map(tags.map((t) => [t.id, t]));

  return allPosts.map((post) => ({
    id: post.id,
    slug: post.slug.split("/").pop() || post.slug,
    title: rebrandText(post.name),
    postBody: rebrandText(post.postBody),
    excerpt: rebrandText(stripHtml(post.postSummary || post.metaDescription || "")),
    featuredImage: post.featuredImage || null,
    publishedDate: post.publishDate,
    authorName: post.blogAuthor?.displayName || post.authorName || "",
    authorAvatar: post.blogAuthor?.avatar || null,
    tags: (post.tagIds || [])
      .map((id) => tagMap.get(id))
      .filter(Boolean) as HubSpotTag[],
    seoTitle: rebrandText(post.htmlTitle || post.name),
    seoDescription: rebrandText(post.metaDescription || post.postSummary || ""),
  }));
}

export async function fetchBlogPostBySlug(slug: string) {
  const allPosts = await fetchAllBlogPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}

export async function fetchBlogPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await fetchAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ─── HubDB: Landing Pages ───────────────────────────────────

interface HubDBRow {
  id: string;
  values: Record<string, any>;
}

interface HubDBResponse {
  total: number;
  results: HubDBRow[];
}

async function fetchHubDBRows(tableId: string): Promise<HubDBRow[]> {
  const data = await hubspotFetch<HubDBResponse>(
    `/cms/v3/hubdb/tables/${tableId}/rows`,
    { limit: "1000" }
  );
  return data.results;
}

export async function fetchAllLandingPages() {
  const rows = await fetchHubDBRows(LANDING_PAGES_TABLE_ID);
  return rows.map((row) => ({
    id: row.id,
    ...row.values,
  }));
}

export async function fetchLandingPageBySlug(slug: string) {
  const pages = await fetchAllLandingPages();
  return pages.find((p: any) => p.slug === slug) || null;
}

export async function fetchLandingPageSlugs(): Promise<{ slug: string }[]> {
  const pages = await fetchAllLandingPages();
  return pages
    .filter((p: any) => p.slug)
    .map((p: any) => ({ slug: p.slug }));
}

// ─── HubDB: Testimonials ────────────────────────────────────

export async function fetchAllTestimonials() {
  const rows = await fetchHubDBRows(TESTIMONIALS_TABLE_ID);
  return rows.map((row) => ({
    id: row.id,
    clientName: row.values.client_name || "",
    company: row.values.company || "",
    role: rebrandText(row.values.role || ""),
    testimonialQuote: rebrandText(row.values.quote || ""),
    headshot: row.values.headshot_url || null,
    rating: row.values.rating || null,
    featured: row.values.featured || false,
  }));
}

export async function fetchFeaturedTestimonials() {
  const all = await fetchAllTestimonials();
  return all.filter((t) => t.featured);
}
