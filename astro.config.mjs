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
        !page.includes("/apply/receptionist") &&
        !page.includes("/apply/legal-impact-assistant") &&
        !page.includes("/apply/medical-record-retrieval-specialist") &&
        !page.includes("/apply/legal-assistant") &&
        !page.includes("/apply/immigration-legal-assistant") &&
        !page.includes("/apply/sales-specialist") &&
        !page.includes("/case-studies") &&
        !page.includes("/thank-you"),
    }),
    mdx(),
  ],
  build: {
    format: "directory", // produces /about/index.html
  },
});
