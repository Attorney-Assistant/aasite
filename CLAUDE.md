# Attorney Assistant — Marketing Website

## Architecture

- **Framework:** Astro (SSG, static output) with Tailwind CSS v3
- **Hosting:** Hostinger (Apache/LiteSpeed, `public_html/`)
- **CI/CD:** GitHub Actions builds on push to `main`, then FTP-deploys `dist/` to Hostinger via `SamKirkland/FTP-Deploy-Action`
- **Daily rebuild:** Scheduled at 6 AM EST (cron) to pick up new CMS content
- **Webhook rebuild:** `repository_dispatch` event `hubspot_blog_update` triggers rebuild on HubSpot blog publish

## Content Sources (build-time)

- **HubSpot CMS** — Blog posts (67+), tags, testimonials, landing pages (HubDB). Requires `HUBSPOT_ACCESS_TOKEN` env var.
- **BabyLoveGrowth.ai** — AI-generated SEO blog articles. Requires `BABYLOVEGROWTH` env var.
- **WordPress XML** — Legacy page content imported from `scripts/output/wp-xml-pages.json` (static, not live)
- **Google Places API** — Reviews fetched at build time via `scripts/fetch-google-reviews.mjs`

## Brand

- **Colors:** Navy `#1a3a5c`, Gold `#F9A630`, Blue `#50a7dd`
- **Fonts:** DM Serif Display (headings, `font-heading`), DM Sans (body, `font-body`)
- **Design tokens:** Dark premium aesthetic, grain-overlay textures, gold dividers, scroll reveal animations (`.reveal` class)

## Key Conventions

- **Containers:** `container-wide` (`max-w-7xl`) and `container-narrow` (also `max-w-7xl` — intentionally same width)
- **Landing pages:** Live under `/lp/` directory, excluded from navigation
- **Blog routing:** `/blog/[slug]` — unified layer merges HubSpot + BLG posts, sorted by date
- **Legacy pages:** Catch-all `[...slug].astro` renders remaining WP XML pages not yet migrated
- **Redirects:** `.htaccess` in `public/` handles legacy URL redirects (old WP paths → new routes)
- **Image optimization:** `scripts/optimize-images.mjs` converts PNG/JPG to WebP; skips `brand/logos`, `legacy`, `wp-content/uploads`

## Environment Variables

Set in `.env` locally and in GitHub repo secrets for CI:

- `HUBSPOT_ACCESS_TOKEN` — HubSpot private app token
- `BABYLOVEGROWTH` — BabyLoveGrowth API key
- `GOOGLE_PLACES_API_KEY` (secret name: `GOOGLE_MAPS_API`) — Google reviews
- `SITE_URL` — Canonical site URL (defaults to `https://attorneyassistant.com`)
- FTP secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`

## Tracking

- **Meta Pixel:** ID `819356476465129` — `Lead` events on form submissions
- **HubSpot:** Tracking script loaded globally
- **Google Tag Manager:** Loaded globally
