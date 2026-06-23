# Comic Design System — Design Spec

**Date:** 2026-06-23
**Status:** Approved (delivery model + stack), pending spec review

## Goal

A standalone, portable **React** component library that captures the Attorney
Assistant "comic book" theme — derived from the Nashville landing page, the
`lp/comic/*` villain pages, and the boardwalk hero — packaged so Claude's
`/design-sync` can ingest it into a claude.ai **Design System** project for the
whole org.

## Delivery & Location

- Lives in a self-contained subfolder **`comic-ui/`** inside this repo (own
  `package.json`, `node_modules`, build). Committed with the site; does **not**
  wire into the live Astro pages.
- **React + TypeScript** components.
- **Styling:** design tokens as CSS custom properties (`tokens.css`) + per
  component **CSS Modules**. No runtime styling dependency.
- **No Storybook** (lean). Component documentation/preview is the `/design-sync`
  `@dsCard` preview HTML — that is what populates the claude.ai pane.

## `/design-sync` compatibility (the real target)

From the `DesignSync` tool contract:
- It reads **tokens + React components directly**.
- The pane's visual cards come from per-component **preview HTML files**, each
  starting with a first-line marker: `<!-- @dsCard group="…" -->`. The app
  compiles these into `_ds_manifest.json`.
- A **render-check** validates each card renders (not blank, not "thin," and
  variants are visually **distinct**).
- Upload is **incremental** (plan → write) into a claude.ai Design System project.

Implications for this build:
- Every component ships a **self-contained preview HTML** card that inlines the
  tokens + that component's CSS so it renders standalone. (CSS variables make
  this clean.)
- Each card has a `@dsCard group="…"` marker; cards are grouped into pane sections.
- Each preview shows **distinct variants** so it passes the render-check.
- Upload is driven by `/design-sync` + the `DesignSync` tool, not a manual deploy.

## Design Tokens (extracted from the existing comic pages)

- **Colors:** navy `#0e2236`, navy-deep `#061320`, navy-mid `#1a3a5c`,
  gold `#F9A630`, gold-bright `#FBD46D`, red `#E04A2C`, red-bright `#FF6B45`,
  blue `#5087dd`, steel `#c0c8d4`, steel-dim `#6f7a8a`, paper `#FFF9EE`, ink `#111`.
- **Fonts:** Bangers (display), Sora 600–800 (subhead), Inter 400–700 (body) —
  loaded via Google Fonts.
- **Type scale:** display `clamp(56px,9vw,132px)`, display-md `clamp(34px,5vw,60px)`,
  display-sm `clamp(28px,4vw,44px)`, lede `clamp(19px,2.2vw,26px)`.
- **Signature text-shadow:** triple offset — `3px 3px 0 <red|white>, 6px 6px 0 navy-deep`.
- **Box-shadow offsets:** `2/4/6px` for elements; layered frames `10px,10px` + `20px,20px`.
- **Card rotation:** alternating `±0.4–0.6deg`.
- **Radii, spacing, z-index, transitions** captured as tokens.
- **Keyframes:** `bat-pendulum`, `bat-pulse`, `arrow-bob`, `scroll-reveal`,
  `speedlines`, `cta-pulse`, `antenna-blink`.

## Component Inventory (grouped for the pane)

**Foundations**
- Colors (swatch card), Typography (scale + shadow treatments), Elevation/Shadows.

**Components**
- `ComicButton` — gold offset CTA, hover lift; variants primary/secondary/ghost, sizes sm/md/lg.
- `ComicEyebrow` — rotated red/gold pill label.
- `ComicLabel` (POW badge) — stage-pow style.
- `ComicCard` — rotated card, halftone interior, hover lift.
- `ComicPanel` — white box, gold border, layered red/navy shadow, star "tape" corners.
- `UrgencyBanner` — blue-bordered "squeeze" callout with POW label.
- `ComicDisplay` / `ComicHeading` — triple-shadow headline type.

**Layout**
- `ComicSection` — halftone overlay + section typography + optional stage label.
- `ComicContainer` — max-width wrapper.
- `HeroLayout` — two-column hero grid.

**Decorative / Animated**
- `BatSignal` — pendulum + glow pulse (uses `bat-signal.svg`).
- `Skyline` — masked silhouette (`skyline.svg`).
- `HalftoneOverlay` — dot-grid overlay.
- `Speedlines` — animated speed-line bars.
- `BurstBadge` — comic burst (`burst-*.svg`).
- `ScrollReveal` — IntersectionObserver reveal wrapper with stagger.

## Package Structure

```
comic-ui/
  package.json  tsconfig.json  README.md
  src/
    tokens/        tokens.css, tokens.ts
    fonts.css
    assets/        bat-signal.svg, skyline.svg, burst-1..4.svg, info-box.svg, icon1..3.svg
    components/<Name>/{ Name.tsx, Name.module.css, index.ts }
    index.ts       (barrel export)
  design-sync/
    <group>/<component>.html   (@dsCard preview cards, self-contained)
```

## Assets & Fonts

- Copy the comic SVGs from `public/images/lp/law-firm-reset/` into `comic-ui/src/assets/`.
- Fonts via Google Fonts; preview cards include the `<link>` so they render accurately.

## Build / Tooling

- TypeScript throughout. Optional Vite/tsup library build (ESM + types) for importability;
  the primary deliverable is the sync-ready bundle (components + tokens + preview cards).
- Minimal lint/format config.

## Out of Scope

- Wiring components into the live Astro site.
- The page-specific `woman-hero` illustration (art, not a component).
- The Nashville multi-stage form / contract-flow logic (page-specific behavior).

## Risks / Open Items

- Render-check requires visually **distinct** variants — each preview must show
  differentiated examples.
- Fonts must load inside preview cards for accurate rendering.
- `/design-sync` upload requires the user's claude.ai login + a target Design
  System project (created during sync).

## Implementation Phasing

1. Scaffold `comic-ui/` (package, tsconfig, tokens, fonts, assets).
2. Foundations cards (colors, type, elevation).
3. Core components (Button, Eyebrow, Label, Card, Panel, UrgencyBanner, Display/Heading).
4. Layout (Section, Container, HeroLayout).
5. Decorative/animated (BatSignal, Skyline, Halftone, Speedlines, BurstBadge, ScrollReveal).
6. Per-component `@dsCard` preview HTML + render-check pass.
7. `/design-sync` upload to a claude.ai Design System project.
