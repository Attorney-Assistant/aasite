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
        !page.includes("/thank-you") &&
        !page.includes("/thankyou") &&
        // Exclude redirect-only / legacy pages (these return 301, not 200)
        !page.includes("/attorney-assistant-home") &&
        !page.includes("/home-old") &&
        !page.includes("/virtual-legal-assistants") &&
        !page.includes("/admin-support") &&
        !page.includes("/legal-receptionist") &&
        !page.includes("/executive-assistant") &&
        !page.includes("/marketing-support") &&
        !page.includes("/intake-reception") &&
        !page.includes("/intake360") &&
        !page.includes("/new-book-a-call") &&
        !page.includes("/book-a-call") &&
        !page.includes("/calendly-booking-page") &&
        !page.includes("/checkout-") &&
        !page.includes("/order-confirmation") &&
        // Exclude internal/legacy WP pages not meant for indexing
        !page.includes("/intake-scripts") &&
        !page.includes("/practice-area-scripts") &&
        !page.includes("/download-pdfs") &&
        !page.includes("/pdfs-new") &&
        !page.includes("/recources-new") &&
        !page.includes("/resource-2025") &&
        !page.includes("/intake2025") &&
        !page.includes("/intake360-development") &&
        !page.includes("/remoteworkculture") &&
        !page.includes("/in-office") &&
        !page.includes("/how-we-generated") &&
        !page.includes("/guides-easy-access") &&
        !page.includes("/all-scripts-2025") &&
        !page.includes("/webinar-lp") &&
        !page.includes("/virtual-webinar") &&
        !page.includes("/webinar-thank-you") &&
        !page.includes("/webinar-book-your-free-intake-audit"),
    }),
    mdx(),
  ],
  build: {
    format: "directory", // produces /about/index.html
  },
});
