# Attorney Assistant — Marketing Website

Production-ready static marketing site for [Attorney Assistant](https://attorneyassistant.com), built with **Astro**, **Tailwind CSS**, and **TypeScript**. Content is sourced from **HubSpot CMS** (blog posts, testimonials), **BabyLoveGrowth.ai** (AI-generated articles), and **Google Places API** (reviews) at build time.

## Architecture

```
HubSpot API ────┐
                ├──▶ Astro SSG ──static HTML──▶ Hostinger FTP
BabyLoveGrowth ─┤
Google API ─────┘
```

GitHub Actions builds and deploys on push to `main`, daily at 6 AM EST, on `repository_dispatch`, or manually.

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### 1. Clone & Install

```bash
git clone https://github.com/Attorney-Assistant/aasite.git
cd aasite
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token
BABYLOVEGROWTH=your_babylovegrowth_api_key
SITE_URL=https://attorneyassistant.com
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### 3. Run Locally

```bash
npm run dev
```

Site: http://localhost:4321

### 4. Build for Production

```bash
npm run build      # Fetches reviews, optimizes images, builds site + Storybook
npm run preview    # Preview the build locally
```

Output goes to `dist/` (site) and `dist/storybook/` (component library).

## Project Structure

```
├── .github/workflows/     # CI/CD pipeline (build + FTP deploy)
├── .storybook/            # Storybook configuration
├── public/
│   ├── brand/logos/        # Logo assets (SVG, PNG)
│   ├── brand/icons/        # Icon library (48 SVGs)
│   └── wp-content/         # Migrated WordPress images
├── scripts/
│   ├── fetch-google-reviews.mjs   # Google Places API → JSON
│   ├── optimize-images.mjs        # Image optimization pipeline
│   └── output/                    # Build-time data (JSON)
├── src/
│   ├── components/        # Astro components
│   ├── layouts/           # BaseLayout (SEO, structured data, GTM)
│   ├── lib/
│   │   ├── blog.ts            # Unified blog layer (merges all sources)
│   │   ├── hubspot.ts         # HubSpot API client
│   │   └── babylovegrowth.ts  # BabyLoveGrowth.ai API client
│   ├── pages/             # File-based routing
│   │   ├── blog/          # Blog (HubSpot + BabyLoveGrowth)
│   │   ├── services/      # Service pages
│   │   ├── landing/       # Landing pages
│   │   └── ...
│   ├── stories/           # Storybook stories
│   └── styles/
│       ├── global.css     # Tailwind + design tokens
│       └── wp-compat.css  # WordPress content compatibility
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Scripts

```bash
npm run dev              # Astro dev server on :4321
npm run build            # Full production build
npm run preview          # Preview production build
npm run storybook        # Storybook dev on :6006
npm run fetch:reviews    # Fetch Google Reviews
npm run optimize-images  # Optimize images in public/
```

## Deployment

### GitHub Actions

The CI/CD pipeline (`.github/workflows/deploy.yml`) runs on push to `main`:

1. Installs dependencies
2. Fetches Google Reviews via Places API
3. Optimizes images
4. Builds Astro site + Storybook
5. Deploys to FTP server

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HUBSPOT_ACCESS_TOKEN` | HubSpot private app token |
| `BABYLOVEGROWTH` | BabyLoveGrowth.ai API key |
| `GOOGLE_MAPS_API` | Google Places API key (for reviews) |
| `FTP_SERVER` | FTP deployment server (Hostinger) |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `SITE_URL` | Production URL (defaults to `https://attorneyassistant.com`) |

## Brand Tokens

| Token | Value |
|-------|-------|
| Navy | `#1a3a5c` |
| Gold | `#F9A630` |
| Blue | `#50a7dd` |
| Black | `#0b0000` |
| White | `#ffffff` |
| Steel | `#588aa5` |
| Heading Font | Sora |
| Body Font | System sans-serif |

Design tokens are defined in `tailwind.config.mjs` and available as `brand-*` utility classes. See the [Style Guide](/styleguide) or Storybook for the full component library.
