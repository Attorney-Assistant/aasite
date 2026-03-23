/**
 * Unified blog content layer.
 * Merges posts from HubSpot CMS and BabyLoveGrowth.ai at build time,
 * sorted by publish date (newest first).
 */
import { fetchAllBlogPosts as fetchHubSpotPosts } from "./hubspot";
import { fetchBLGArticles } from "./babylovegrowth";

export async function fetchAllBlogPosts() {
  const [hubspot, blg] = await Promise.all([
    fetchHubSpotPosts().catch(() => []),
    fetchBLGArticles().catch(() => []),
  ]);

  // Tag HubSpot posts with source
  const hsTagged = hubspot.map((p) => ({ ...p, source: "hubspot" as const }));

  // Merge and sort by date descending
  const all = [...hsTagged, ...blg].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return all;
}

export async function fetchBlogPostBySlug(slug: string) {
  const all = await fetchAllBlogPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function fetchBlogPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await fetchAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
