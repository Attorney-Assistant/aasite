/**
 * Unified blog content layer.
 * Merges posts from HubSpot CMS, Outrank.so, and the frozen BabyLoveGrowth
 * archive at build time, sorted by publish date (newest first).
 */
import { fetchAllBlogPosts as fetchHubSpotPosts } from "./hubspot";
import { fetchOutrankArticles } from "./outrank";
import { fetchBLGArticles } from "./babylovegrowth";

let allPostsPromise: Promise<any[]> | null = null;

export function fetchAllBlogPosts() {
  if (!allPostsPromise) allPostsPromise = _fetchAllBlogPosts();
  return allPostsPromise;
}

async function _fetchAllBlogPosts() {
  const [hubspot, outrank, blg] = await Promise.all([
    fetchHubSpotPosts().catch((e) => { console.error("[blog] HubSpot fetch failed:", e.message); return []; }),
    fetchOutrankArticles().catch((e) => { console.error("[blog] Outrank fetch failed:", e.message); return []; }),
    fetchBLGArticles().catch((e) => { console.error("[blog] BLG archive read failed:", e.message); return []; }),
  ]);
  console.log(`[blog] ${hubspot.length} HubSpot + ${outrank.length} Outrank + ${blg.length} BLG archive = ${hubspot.length + outrank.length + blg.length} total`);

  // Tag HubSpot posts with source
  const hsTagged = hubspot.map((p) => ({ ...p, source: "hubspot" as const }));

  // Merge with slug de-dup (HubSpot wins, then Outrank, then the BLG archive)
  // so a colliding slug can't produce duplicate /blog/[slug] routes.
  const seen = new Set<string>();
  const all: any[] = [];
  for (const p of [...hsTagged, ...outrank, ...blg]) {
    if (!p.slug) continue;
    if (seen.has(p.slug)) {
      console.warn(`[blog] Duplicate slug "${p.slug}" from ${p.source} — skipped.`);
      continue;
    }
    seen.add(p.slug);
    all.push(p);
  }

  // Sort by date descending
  all.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return all;
}

export async function fetchBlogPostBySlug(slug: string) {
  const all = await fetchAllBlogPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function fetchBlogPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await fetchAllBlogPosts();
  return posts
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug }));
}
