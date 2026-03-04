# Attorney Assistant — Marketing Website

Production-ready static marketing website for Attorney Assistant, built with **Astro**, **Sanity CMS**, **Tailwind CSS**, and **TypeScript**.

## Why Astro?

Astro was chosen as the SSG because it:

- **Ships zero JavaScript by default** — pages are pure static HTML
- **Generates one HTML file per route** (`/about/index.html`, `/blog/my-post/index.html`)
- **First-class content site support** — built-in sitemap, RSS, and image optimization
- **Islands architecture** — add interactivity only where needed without a full SPA
- **Fast builds** — parallel data fetching and incremental compilation
- **Strong TypeScript support** — end-to-end type safety

## Architecture Overview

```
WordPress (legacy) ──migration scripts──▶ Sanity CMS ──GROQ API──▶ Astro SSG ──static HTML──▶ Cloudflare/GitHub Pages
```

Content editors manage content in Sanity Studio. On every build (triggered by git push or Sanity webhook), Astro fetches all content via GROQ queries, generates static HTML pages, and deploys them.

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- A Sanity.io project ([create one free](https://www.sanity.io/get-started))

### 1. Clone & Install

```bash
git clone <repo-url>
cd attorney-assistant
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Sanity credentials:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
SITE_URL=https://attorneyassistant.com
```

**Getting Sanity credentials:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (or create one)
3. Copy the **Project ID** from the project dashboard
4. Go to **API** → **Tokens** → **Add API token** with Viewer permissions
5. Copy the token value

### 3. Run Locally

```bash
# Start the Astro dev server
npm run dev

# In a separate terminal, start Sanity Studio
npm run sanity:dev
```

- Site: http://localhost:4321
- Sanity Studio: http://localhost:3333

### 4. Build for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

Output goes to `dist/`.

## Project Structure

```
├── .github/workflows/     # CI/CD pipeline
├── docs/                  # Architecture documentation
├── public/                # Static assets (logo, favicon, robots.txt)
├── sanity/
│   └── schemas/           # Sanity content type schemas
│       └── objects/       # Reusable section schemas (hero, CTA, FAQ, etc.)
├── scripts/               # WordPress migration tools
│   ├── extract-routes.ts
│   ├── generate-redirects.ts
│   ├── export-wp-content.ts
│   └── route-mapping.json
├── src/
│   ├── components/        # Astro components (Header, Footer, BlogCard, etc.)
│   ├── layouts/           # Page layouts
│   ├── lib/
│   │   └── sanity.ts      # Sanity client, GROQ queries, fetch helpers
│   ├── pages/             # File-based routing
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro
│   │   │   └── category/[slug].astro
│   │   ├── services/
│   │   ├── landing/[slug].astro
│   │   ├── rss.xml.ts
│   │   └── ...
│   └── styles/
│       └── global.css     # Tailwind + design tokens
├── astro.config.mjs
├── sanity.config.ts
├── tailwind.config.mjs
└── package.json
```

## Content Management

### Content Types

| Type | Description | Route Pattern |
|------|-------------|---------------|
| **Blog Post** | Articles with author, categories, portable text body | `/blog/{slug}` |
| **Landing Page** | Campaign pages with flexible section blocks | `/landing/{slug}` |
| **Static Page** | Standard pages (About, Contact, etc.) | `/{slug}` |
| **Testimonial** | Reusable client testimonials | Embedded in other pages |
| **Author** | Blog post authors | Referenced by posts |
| **Category** | Blog categories | `/blog/category/{slug}` |

### Adding a Blog Post

1. Open Sanity Studio
2. Click **Blog Posts** → **Create new**
3. Fill in title, slug, excerpt, body (rich text), author, categories
4. Set SEO title and description
5. Click **Publish**
6. Trigger a site rebuild (push to main or use webhook)

### Adding a Page

Static pages (About, Services, etc.) are Astro files in `src/pages/`. To add a new static page:

1. Create `src/pages/your-page.astro`
2. Import and use `BaseLayout`
3. Add content directly in the template

For CMS-managed pages, create a `staticPage` document in Sanity and add a dynamic route.

### Landing Pages

Landing pages are fully CMS-driven. Each landing page has:
- Hero section with title, subtitle, image
- Flexible content sections (feature grids, CTAs, testimonials, FAQs, text+image)
- Global CTA button

Create a new Landing Page in Sanity Studio and it automatically generates at `/landing/{slug}`.

## WordPress Migration

Three scripts handle migration from the existing WordPress site:

### 1. Extract Routes

```bash
npm run migrate:extract-routes -- https://old-site.com/sitemap.xml
```

Outputs `scripts/output/routes.json` with all discovered URLs classified by type.

### 2. Map & Generate Redirects

Edit `scripts/route-mapping.json` to customize URL mapping, then:

```bash
npm run migrate:generate-redirects
```

Outputs `scripts/output/_redirects` (copy to `public/`) and `scripts/output/redirects.json`.

### 3. Export WordPress Content

```bash
npm run migrate:export-wp -- https://old-site.com
```

Exports posts, pages, and categories as JSON files ready for Sanity import. HTML content is preserved and will need conversion to Portable Text using `@sanity/block-tools`.

## Deployment

### GitHub Actions (default)

The CI/CD pipeline in `.github/workflows/deploy.yml`:
1. Installs dependencies
2. Builds the static site
3. Deploys to GitHub Pages

**Required GitHub Secrets:**

| Secret | Description |
|--------|-------------|
| `SANITY_PROJECT_ID` | Sanity project ID |
| `SANITY_DATASET` | Sanity dataset (usually `production`) |
| `SANITY_API_TOKEN` | Sanity read token |

**Optional GitHub Variables:**

| Variable | Description |
|----------|-------------|
| `SITE_URL` | Production URL (defaults to `https://attorneyassistant.com`) |

Set these at **Settings** → **Secrets and variables** → **Actions** in your GitHub repo.

### Cloudflare Pages (alternative)

Uncomment the Cloudflare deployment job in `deploy.yml` and add:
- `CLOUDFLARE_API_TOKEN` secret
- `CLOUDFLARE_ACCOUNT_ID` secret

### Sanity Webhook (auto-rebuild)

To trigger a rebuild when content changes in Sanity:
1. Go to **sanity.io/manage** → your project → **API** → **Webhooks**
2. Add a webhook pointing to your GitHub Actions workflow dispatch URL
3. Content changes will now trigger a fresh build

## Brand Assets

| Token | Value |
|-------|-------|
| Black | `#0b0000` |
| White | `#ffffff` |
| Gold | `#ffaa2b` |
| Blue | `#50a7dd` |
| Steel | `#588aa5` |
| Heading Font | Poppins |
| Body Font | Roboto |

Design tokens are defined in `tailwind.config.mjs` and available as `brand-*` classes.

## Build Artifacts

Every build produces:
- Static HTML pages (`/about/index.html`, `/blog/post-slug/index.html`, etc.)
- `robots.txt` with sitemap reference
- `sitemap-index.xml` (auto-generated by `@astrojs/sitemap`)
- `rss.xml` for blog syndication

## Development

```bash
npm run dev        # Astro dev server on :4321
npm run sanity:dev # Sanity Studio on :3333
npm run build      # Production build
npm run preview    # Preview production build
```
# aawebsite
