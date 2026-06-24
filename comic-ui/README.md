# comic-ui — Attorney Assistant comic-book design system

Standalone React + TypeScript component library housing all comic-book-themed UI primitives (burst badges, skyline headers, bat-signal CTAs, action panels, etc.) used across Attorney Assistant hero and campaign landing pages. Ships as a pure ES module via Vite library mode — consumable by the main Astro site or any future React app.

---

## Installation

This package is private and referenced by path from the Astro site. No npm publish required.

```ts
import { ComicButton, ComicCard, BurstBadge } from "comic-ui";
import "comic-ui/src/tokens/tokens.css";
```

> **Fonts** — Add the Google Fonts link to your host app's `<head>`. The design system relies on Bangers (display), Sora (headings/UI), and Inter (body):
>
> ```html
> <link rel="preconnect" href="https://fonts.googleapis.com" />
> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
> <link
>   href="https://fonts.googleapis.com/css2?family=Bangers&family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
>   rel="stylesheet"
> />
> ```

---

## Components

### Foundations (tokens)

Design tokens are in `src/tokens/tokens.css`. Import them once in your app root.

| Token file | Purpose |
|---|---|
| `tokens.css` | CSS custom properties — colors, spacing, shadows, z-index, animation |

### Components

| Component | Description |
|---|---|
| `ComicButton` | Primary CTA button — bold border, offset shadow, hover pop |
| `ComicEyebrow` | Small all-caps label for section intros |
| `ComicLabel` | Inline tag / badge for categorizing content |
| `ComicCard` | Content card with comic-panel border and shadow |
| `ComicPanel` | Full-bleed decorative panel divider |
| `UrgencyBanner` | Sticky or inline urgency strip (countdown / social proof) |
| `ComicDisplay` | Hero-scale display text in Bangers |
| `ComicHeading` | Section heading in Sora Bold |

### Layout

| Component | Description |
|---|---|
| `ComicContainer` | Max-width wrapper with responsive horizontal padding |
| `ComicSection` | Section wrapper with background variant + vertical rhythm |
| `HeroLayout` | Full-page hero skeleton (above-the-fold + below sections) |

### Decorative

| Component | Description |
|---|---|
| `BatSignal` | Animated spotlight / signal SVG accent |
| `Skyline` | City skyline SVG silhouette for hero backgrounds |
| `HalftoneOverlay` | CSS halftone dot-pattern overlay |
| `Speedlines` | Radial motion-lines SVG for action emphasis |
| `BurstBadge` | Starburst shape badge for calls-to-action |
| `ScrollReveal` | Intersection-Observer wrapper that fades children in on scroll |

---

## design-sync

The `comic-ui/design-sync/` folder holds per-component `@dsCard` preview cards consumed by Claude's `/design-sync` command. Cards are organized into four subdirectories matching the groups above:

```
design-sync/
  foundations/   colors.html  typography.html  elevation.html
  components/    comic-button.html  comic-card.html  ...
  layout/        comic-container.html  comic-section.html  hero-layout.html
  decorative/    bat-signal.html  burst-badge.html  ...
```

To upload the design system to claude.ai, run `/design-sync` from inside `comic-ui/`:

```bash
cd comic-ui
# then in Claude Code:
/design-sync
```

Each card uses the `<!-- @dsCard group="Comic / <Group>" -->` annotation so cards land in the correct group in the claude.ai Design System viewer.

---

## Build

```bash
cd comic-ui
npm run build   # tsc --noEmit && vite build
```

Output lands in `comic-ui/dist/` as `comic-ui.js` (ES module) + `index.d.ts`.
