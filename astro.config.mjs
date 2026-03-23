import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://attorneyassistant.com",
  output: "static",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("undefined"),
    }),
    mdx(),
  ],
  build: {
    format: "directory", // produces /about/index.html
  },
});
