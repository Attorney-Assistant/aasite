import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { fetchAllBlogPosts } from "@lib/blog";

export async function GET(context: APIContext) {
  let posts: any[] = [];
  try {
    posts = (await fetchAllBlogPosts()) || [];
  } catch {}

  // Filter to posts with valid dates and slugs
  const validPosts = posts.filter((post: any) => {
    if (!post.slug || !post.title) return false;
    const d = new Date(post.publishedDate);
    return !isNaN(d.getTime());
  });

  return rss({
    title: "Attorney Assistant Blog",
    description: "Legal industry insights, tips, and best practices from Attorney Assistant.",
    site: context.site!.toString(),
    items: validPosts.map((post: any) => ({
      title: post.title,
      pubDate: new Date(post.publishedDate),
      description: post.excerpt || "",
      link: `/blog/${post.slug}/`,
      author: post.authorName,
      categories: post.tags?.map((t: any) => t.name) || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
