import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { fetchAllBlogPosts } from "@lib/blog";

export async function GET(context: APIContext) {
  let posts: any[] = [];
  try {
    posts = (await fetchAllBlogPosts()) || [];
  } catch {}

  return rss({
    title: "Attorney Assistant Blog",
    description: "Legal industry insights, tips, and best practices from Attorney Assistant.",
    site: context.site!.toString(),
    items: posts.map((post: any) => ({
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
