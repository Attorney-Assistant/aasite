import { readFileSync } from "node:fs";
import { join } from "node:path";
import { rebrandText } from "./rebrand";

// RETIRED INTEGRATION (Aug 2026): BabyLoveGrowth.ai is no longer pulled at
// build time. The full article set was frozen by scripts/freeze-blg.mjs into
// src/data/blg-articles.json (tracked in git), and this module now just maps
// that static file into the unified blog shape. No API key, no network, no
// Actions cache. New AI SEO content comes from Outrank (see ./outrank.ts).
const DATA_PATH = join(process.cwd(), "src/data/blg-articles.json");

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

interface BLGArticle {
  id: string;
  title: string;
  slug: string;
  hero_image_url: string | null;
  meta_description: string;
  excerpt: string;
  created_at: string;
  seedKeyword: string;
  keywords: string[];
  content_html: string;
  content_markdown: string;
}

let blgPromise: Promise<ReturnType<typeof mapArticles>> | null = null;

export function fetchBLGArticles() {
  if (!blgPromise) {
    blgPromise = new Promise((resolve) => {
      let articles: BLGArticle[] = [];
      try {
        const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
        articles = Object.values(data.articles || {});
      } catch (e) {
        console.error("[BLG] Failed to read static archive src/data/blg-articles.json:", (e as Error).message);
      }
      console.log(`[BLG] ${articles.length} articles from static archive.`);
      resolve(mapArticles(articles));
    });
  }
  return blgPromise;
}

function mapArticles(articles: BLGArticle[]) {
  return articles
    .filter((article) => article && article.slug)
    .map((article) => ({
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
