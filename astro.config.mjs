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
        !page.includes("/storybook") &&
        !page.includes("/apply/hidden-applications") &&
        !page.includes("/apply/receptionist") &&
        !page.includes("/apply/legal-staffline-assistant") &&
        !page.includes("/lp/smb-exclusive") &&
        !page.includes("/lp/staffline-ctv") &&
        !page.includes("/lp/staffline-intake") &&
        !page.includes("/lp/staffline-staffing") &&
        !page.includes("/lp/daryl-and-cheryl-fb") &&
        !page.includes("/lp/scorecard") &&
        !page.includes("/lp/case-management") &&
        !page.includes("/lp/records-retrieval") &&
        !page.includes("/lp/back-office") &&
        !page.includes("/thank-you-booking-late2026") &&
        !page.includes("/apply/medical-record-retrieval-specialist") &&
        !page.includes("/apply/legal-assistant") &&
        !page.includes("/apply/immigration-legal-assistant") &&
        !page.includes("/apply/sales-specialist") &&
        !page.includes("/apply/bilingual-sales-specialist") &&
        !page.includes("/apply/bilingual-legal-intake-specialist") &&
        !page.includes("/apply/bilingual-legal-assistant") &&
        !page.includes("/apply/legal-intake-specialist") &&
        !page.includes("/case-studies") &&
        !page.includes("/nashville-resources") &&
        !page.includes("/thank-you"),
    }),
    mdx(),
  ],
  build: {
    format: "directory", // produces /about/index.html
  },
});
