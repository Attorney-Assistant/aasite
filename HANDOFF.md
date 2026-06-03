# Site Scaffolding — Handoff & Requirements

Reference doc for spinning up a sister site using the **exact same architecture** as `attorneyassistant.com`. Hand this to whoever (or whatever) builds the next site so it inherits the same build chain, CMS plumbing, tracking, and deploy flow.

---

## 1. Tech stack (pinned versions)

| Layer | Tool | Version |
|---|---|---|
| Framework | Astro (SSG, `output: "static"`) | ^4.15.0 |
| Styling | Tailwind CSS | ^3.4.0 |
| Tailwind plugins | `@tailwindcss/typography` | ^0.5.19 |
| Astro integrations | `@astrojs/tailwind`, `@astrojs/sitemap@3.1.0`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/check` | per `package.json` |
| Build tooling | `tsx`, `sharp` (image opt), `xml2js` (WP import) | per `package.json` |
| Storybook (optional) | `storybook@^8.4` + `@storybook/html-vite` | per `package.json` |
| Node | 20 (set in CI) | — |

`astro.config.mjs` must use `output: "static"`, `build.format: "directory"` (produces `/about/index.html`-style URLs), and the sitemap integration with a `filter` excluding utility/noindex routes.

---

## 2. Hosting & deploy chain

**Host:** Hostinger (Apache/LiteSpeed) — production root `public_html/`.

**CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`).

### Workflow triggers
1. `push` to `main` → build + deploy
2. `pull_request` to `main` → build only (no deploy)
3. `schedule: '0 11 * * *'` → daily rebuild at 6 AM EST to pick up new CMS content
4. `repository_dispatch: hubspot_blog_update` → webhook from HubSpot on new blog publish
5. `workflow_dispatch` → manual trigger

### Workflow steps
1. Checkout
2. Setup Node 20
3. `npm install`
4. `npm run build` (runs review fetch + image optimization + `astro build` + sitemap rename + storybook build)
5. **FTP deploy** via `SamKirkland/FTP-Deploy-Action@v4.3.5` (only on `push` to `main`)

### Required GitHub repo secrets
- `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR` (defaults to `/public_html/`)
- `HUBSPOT_ACCESS_TOKEN` — HubSpot private app token (scopes: CMS Pages, CMS Blog, HubDB)
- `GOOGLE_MAPS_API` — Google Places API key (for reviews)
- `BABYLOVEGROWTH` — BabyLoveGrowth.ai API key (only if using AI blog)
- `FB_PIXEL_DATA_ACCESS_TOKEN`, `FB_CAREERS_PIXEL_DATA_ACCESS_TOKEN` — Meta CAPI server-side tokens
- `POSTHOG_API_KEY` — PostHog project API key
- `SITE_URL` — canonical site URL (e.g. `https://newcompany.com`)

### HubSpot → site webhook (auto-rebuild on publish)
HubSpot workflow posts to GitHub:
```
POST https://api.github.com/repos/{org}/{repo}/dispatches
Authorization: token <PAT-with-repo-scope>
{ "event_type": "hubspot_blog_update" }
```

---

## 3. Content sources (build-time fetches)

| Source | Purpose | File | Env var |
|---|---|---|---|
| HubSpot Blog API | Blog posts, tags | `src/lib/hubspot.ts` | `HUBSPOT_ACCESS_TOKEN` |
| HubSpot HubDB | Testimonials, dynamic landing pages | `src/lib/hubspot.ts` | same |
| BabyLoveGrowth.ai | AI-generated SEO blog articles | `src/lib/babylovegrowth.ts` | `BABYLOVEGROWTH` |
| Google Places API | Reviews | `scripts/fetch-google-reviews.mjs` → writes `scripts/output/google-reviews.json` | `GOOGLE_PLACES_API_KEY` |
| WordPress XML (one-time) | Legacy page migration | `scripts/parse-wp-xml.ts` → writes `scripts/output/wp-xml-*.json` | none |

### Unified blog merger
`src/lib/blog.ts` merges HubSpot + BLG posts at build time, tags each with `source`, sorts by `publishedDate` desc, caches the promise (single fetch per build).

### HubDB tables (HubSpot)
- **Landing Pages** — table ID `197972231`, rendered by `src/pages/lp/[slug].astro`
- **Testimonials** — table ID `199622291`

Hard-coded table IDs live in `src/lib/hubspot.ts` constants — **update these for the new HubSpot portal**.

---

## 4. Routing model

| Route pattern | File | Notes |
|---|---|---|
| Static pages | `src/pages/<name>.astro` | one file per page |
| Service detail | `src/pages/services/<slug>.astro` | flat structure under `/services/` |
| Apply pages | `src/pages/apply/<role>.astro` | shared `ApplicationForm.astro` component |
| Blog index | `src/pages/blog/index.astro` | renders merged post list |
| Blog post | `src/pages/blog/[slug].astro` | `getStaticPaths` from unified source |
| Blog category | `src/pages/blog/category/[slug].astro` | from HubSpot tags |
| HubSpot LPs | `src/pages/lp/[slug].astro` | `getStaticPaths` calls `fetchLandingPageSlugs()` |
| Code-defined LPs | `src/pages/lp/<slug>.astro`, `src/pages/lp/comic/<slug>.astro`, `src/pages/lp/simple/<slug>.astro` | static, themed campaigns |
| Hero / events | `src/pages/hero/<slug>.astro` | comic-book themed event landings |
| Catch-all (legacy WP) | `src/pages/[...slug].astro` | renders allow-listed WP slugs from `wp-xml-pages.json` |
| 404 | `src/pages/404.astro` | wired via `.htaccess` `ErrorDocument 404 /404.html` |

### Redirects
`public/.htaccess` handles all 301s:
- Force HTTPS + non-www
- Vanity URL aliases for marketing campaigns
- Legacy WP path → new route map
- Case-normalization (e.g. `/Blog/*` → `/blog/*`)

The file ships as-is to Hostinger (no Astro build step touches it).

---

## 5. Layouts & design system

### Layouts (`src/layouts/`)
- `BaseLayout.astro` — site-wide shell: `<head>`, SEO, schema, tracking scripts, geo-gate, header, footer
- `ComicCampaignLayout.astro` — comic-book themed paid-ad LPs (no main nav, embedded booking widget)
- `SimpleCampaignLayout.astro` — minimalist campaign LP variant
- (Add new layouts only if a campaign style truly differs.)

### Brand tokens (`tailwind.config.mjs` + `src/styles/global.css`)
- **Colors:** `brand` palette (25–950 + `gold`/`gold-dark`/`gold-light` + `navy`/`steel`/`blue`), full gray/error/warning/success scales (Untitled UI style)
- **Fonts:** `font-heading`, `font-body`, `font-display`, `font-sans` — all reference CSS variables `--font-heading` / `--font-body` defined in `global.css` (single source of truth)
- **Container utilities:** `container-wide` and `container-narrow` (both `max-w-7xl` by convention)
- **Badge, card, button, divider** utility classes defined in `global.css`
- **Scroll reveal:** `.reveal` class with `transition-delay` inline style for stagger
- **Grain overlay:** `.grain-overlay` for premium-dark sections
- **WP compatibility:** `src/styles/wp-compat.css` makes legacy WP HTML render in-brand

### Reusable components (`src/components/`)
SEO/meta/tracking:
- `SEO.astro` — title/description/OG/Twitter/canonical/structured data (auto-breadcrumbs + WebPage schema)
- `MetaCAPI.astro` — server-side Meta Conversions API hook
- `CareersPixel.astro` — separate Meta Pixel for careers funnel
- `GeoGate.astro` — geo-restricts HubSpot tracking script load

Content blocks:
- `Hero.astro`, `CTABanner.astro`, `FeatureCard.astro`, `ServiceCard.astro`, `ProcessSteps.astro`, `DayTimeline.astro`, `Scrollytelling.astro`, `LogoScroller.astro`, `BlogCard.astro`, `TestimonialCard.astro`, `ComparisonTable.astro`, `ROICalculator.astro`, `YouTubeEmbed.astro`

Forms:
- `ApplicationForm.astro` — long careers application (Formspree submit, video upload via URL, country autocomplete, conditional Belize question)
- `HomeAuditForm.astro` — homepage lead-capture form
- `HubSpotForm.astro` — HubSpot form embed wrapper

Site chrome:
- `Header.astro`, `Footer.astro` — mega-menu nav with dropdown groups defined inline

---

## 6. Forms

Forms post to **Formspree** endpoints (per-form IDs). Submission flow:
1. Client-side validation on `data-required` attributes
2. POST to Formspree action URL
3. Fire `Lead` event to Meta Pixel + PostHog
4. Redirect to `/thank-you` (or campaign-specific variant)

Required env per new site:
- Per form: a Formspree endpoint URL passed as a prop (`formspreeAction`)
- For Meta CAPI: an access token per pixel

---

## 7. Tracking stack

| Service | Component | Config |
|---|---|---|
| Meta Pixel (client) | inline in `BaseLayout.astro` / `ApplicationForm.astro` | Pixel ID hard-coded — replace `819356476465129` |
| Meta Conversions API (server) | `MetaCAPI.astro` | tokens via secret |
| PostHog | inline in `BaseLayout.astro` | key via `POSTHOG_API_KEY`, autocapture + identified profiles, **geo-gated** |
| HubSpot Tracking | inline in `BaseLayout.astro` | portal ID hard-coded — replace |
| Google Tag Manager | inline in `BaseLayout.astro` | container ID hard-coded — replace |
| Google Tag Gateway (first-party) | `public/.htaccess` rewrite → `public/metrics/proxy.php` | maps `/metrics/*` to `gtm-wcb9jxdc.fps.goog` — replace endpoint for new GTG config |

Geo-gate: PostHog + HubSpot only load for visitors in allowed regions (defined in `GeoGate.astro`). Check before reusing — new market may need different rules.

---

## 8. SEO infrastructure

Built into `src/components/SEO.astro`:
- `<title>`, meta description, canonical
- Open Graph + Twitter Card (`summary` card; default OG image is the square logo, swap for a 1200×630 if you have one)
- JSON-LD: auto-built **BreadcrumbList** from URL path, auto **WebPage** schema, plus optional page-specific schema array
- Site-wide JSON-LD in `BaseLayout.astro`: `Organization` + `LocalBusiness` (NAP, hours, social profiles), `WebSite` w/ `SearchAction`

Sitemap: `@astrojs/sitemap` runs at build, then `npm run build` copies `dist/sitemap-0.xml` → `dist/sitemap.xml` so it's available at a clean URL.

`public/robots.txt` + `public/llms.txt` + `public/llms-full.txt` ship as-is.

---

## 9. Build scripts (`scripts/`)

| Script | Purpose | When it runs |
|---|---|---|
| `fetch-google-reviews.mjs` | Pulls Google Places reviews → `scripts/output/google-reviews.json` | Every `npm run build` |
| `optimize-images.mjs` | Converts PNG/JPG → WebP (skips `brand/logos`, `legacy`, `wp-content/uploads`) using `sharp` | Every `npm run build` |
| `parse-wp-xml.ts` | One-time WP XML import → `scripts/output/wp-xml-pages.json` etc. | Manual: `npm run migrate:parse-xml` |
| `test-fb-capi.mjs`, `test-fb-main-capi.mjs` | Local Meta CAPI sandbox tests | Manual |

Migration helper scripts (only relevant if importing from WP): `extract-routes`, `generate-redirects`, `export-wp-content`, `download-wp-images`, `setup-hubdb-testimonials`.

For a fresh non-WP site, you can skip everything in the `migrate:*` family and delete `scripts/output/wp-xml-*.json` + `src/pages/[...slug].astro`.

---

## 10. Public assets (`public/`)

Ship as-is to Hostinger root:
- `.htaccess` — all redirects (see §4)
- `robots.txt`, `llms.txt`, `llms-full.txt`, `favicon.svg`, `logo.svg`
- `googlef3de13252192f54f.html` — Google Search Console verification (replace per site)
- `brand/` — logos in multiple variants (color/black/white × square/long/tall, PNG/SVG/WebP)
- `icons/` — UI iconography (heroicon-style SVGs)
- `images/` — marketing imagery
- `team/` — headshot photos
- `metrics/proxy.php` — Google Tag Gateway first-party PHP proxy
- `wp-content/` — legacy WP uploads (drop if not migrating from WP)
- Campaign asset folders (e.g. `forever-task-map/`, `law-firm-tool-matrix/`) — drop unless reused

---

## 11. CMS requirements (HubSpot portal setup)

To replicate the data layer, the HubSpot portal for the new site needs:

1. **Private app** with scopes:
   - `cms.blogs.read`, `cms.knowledge_base.articles.read`
   - `cms.tags.read`
   - `hubdb` (read)
   - Generate token → set as `HUBSPOT_ACCESS_TOKEN`

2. **Blog**
   - Standard HubSpot blog with tags
   - Posts must have: title, slug, body HTML, meta description, featured image, publish date, author

3. **HubDB tables**
   - **Landing Pages table** — columns to match what `fetchLandingPageBySlug` expects: `slug`, `hero_title`, `hero_subtitle`, `hero_image`, `style` (`gold`/`blue`/`dark`/`light`), feature blocks, testimonials FK, CTA, `seo_title`, `seo_description`
   - **Testimonials table** — quote, name, firm, photo, rating
   - Note both table IDs and **update `LANDING_PAGES_TABLE_ID` and `TESTIMONIALS_TABLE_ID` constants in `src/lib/hubspot.ts`**

4. **Workflow** (optional, for auto-rebuild on publish)
   - Trigger: Blog post status → Published
   - Action: Webhook POST to GitHub repo `/dispatches` with `event_type: hubspot_blog_update`

---

## 12. Environment variables (`.env.local`)

```
HUBSPOT_ACCESS_TOKEN=
BABYLOVEGROWTH=
GOOGLE_PLACES_API_KEY=
POSTHOG_API_KEY=
SITE_URL=https://newcompany.com
FB_PIXEL_DATA_ACCESS_TOKEN=
FB_CAREERS_PIXEL_DATA_ACCESS_TOKEN=
```

Mirror these as **GitHub repo secrets** (note `GOOGLE_PLACES_API_KEY` is named `GOOGLE_MAPS_API` in secrets for legacy reasons — keep the mismatch or update the workflow).

---

## 13. Items that **must** be replaced per site (find-and-replace checklist)

Search the codebase for each and swap in the new site's values:

- [ ] `attorneyassistant.com` — site URL (config, schema, OG, social links)
- [ ] `Attorney Assistant` — brand name (schema, OG titles, footer, header)
- [ ] `819356476465129` — Meta Pixel ID
- [ ] Meta Pixel for careers — separate ID in `CareersPixel.astro`
- [ ] HubSpot portal ID in tracking snippet (`js.hs-scripts.com/<portal>.js`)
- [ ] GTM container ID
- [ ] PostHog host (if self-hosted)
- [ ] `LANDING_PAGES_TABLE_ID` and `TESTIMONIALS_TABLE_ID` in `src/lib/hubspot.ts`
- [ ] Google Search Console verification file in `public/`
- [ ] Org schema in `BaseLayout.astro`: legal name, address, phone, email, hours, social profiles, founders
- [ ] Footer NAP block + social links
- [ ] Brand colors in `tailwind.config.mjs` (or keep brand palette and just swap `gold`/`navy`)
- [ ] Font CSS variables in `src/styles/global.css`
- [ ] Logo files in `public/brand/logos/` (replace all variants)
- [ ] `public/.htaccess` — strip all AA-specific redirects, keep HTTPS-force + 404 + Google Tag Gateway rule
- [ ] Hard-coded vanity slugs (e.g. `/lp/comic/admin`, `/intake`, etc.) — purge or rename
- [ ] `CLAUDE.md` — project description block at top
- [ ] Formspree form endpoints

---

## 14. Recommended starter steps for the new site

1. **Clone this repo** into a new repo for the sister site
2. **Delete** `src/pages/[...slug].astro`, `src/pages/lp/` static campaign pages you don't need, `scripts/output/wp-xml-*.json`, `public/wp-content/`, `scripts/parse-wp-xml.ts`, `package.json` `migrate:*` scripts
3. **Find-and-replace** every item in §13
4. **Wipe** `public/.htaccess` redirects (keep the HTTPS/non-www block and 404 line)
5. Set up new **HubSpot private app** + record `HUBSPOT_ACCESS_TOKEN`
6. Create the HubDB tables (Landing Pages, Testimonials) and update their IDs in `src/lib/hubspot.ts`
7. Stand up the **GitHub Actions secrets** (§2)
8. Push to `main` and verify the FTP deploy lands in Hostinger's `public_html/`
9. Verify DNS → Hostinger A record + HTTPS cert
10. Pull live: confirm sitemap, robots.txt, OG previews, tracking pixels fire, geo-gate, blog index renders

---

## 15. Known gotchas

- **CLAUDE.md font note is stale.** The doc says DM Serif/DM Sans, but the site actually uses Sora + Inter. Verify against `tailwind.config.mjs` and `global.css` when copying.
- **GitHub `main` branch is protected.** Direct pushes hit the protection rule with a warning but currently still go through (auto-bypass on this account). New site should decide: protected PR flow or direct push.
- **Sitemap rename** is a manual `cp` step in the build script — needed because `@astrojs/sitemap` emits `sitemap-0.xml` (chunked) but the canonical URL is `sitemap.xml`.
- **Storybook builds into `dist/storybook/`** and ships to prod. Either keep it or remove `storybook build -o dist/storybook` from the `build` script.
- **Lock files are gitignored** (`package-lock.json`, `yarn.lock`). Consider committing one for the new project to lock dependency versions.
- **`.resign/` is gitignored** — convention for nested sub-repos inside this scaffold.
- The `[...slug].astro` catch-all has a hard-coded allow-list of legacy WP slugs. Remove for greenfield sites.
- The **default OG image is square (2368×2368)** and the Twitter card is `summary` (not `summary_large_image`). If you have a proper 1200×630 OG card, swap the default in `SEO.astro` and switch the card type.

---

*Generated 2026-06-03 from the AttorneyAssistant scaffold at `/Users/nicole/Documents/AttorneyAssistant`.*
