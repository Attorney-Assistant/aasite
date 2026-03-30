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
      filter: (page) =>
        !page.includes("undefined") &&
        !page.includes("/styleguide") &&
        !page.includes("/signaturegenerator") &&
        !page.includes("/storybook") &&
        !page.endsWith("/thank-you") &&
        !page.endsWith("/thank-you/"),
    }),
    mdx(),
  ],
  build: {
    format: "directory", // produces /about/index.html
  },
});
