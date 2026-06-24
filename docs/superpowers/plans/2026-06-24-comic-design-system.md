# Comic Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone React + TypeScript "comic book" component library in `comic-ui/`, packaged so Claude's `/design-sync` ingests its tokens, components, and per-component preview cards into a claude.ai Design System.

**Architecture:** Self-contained package; design tokens as CSS custom properties (`tokens.css`) + per-component CSS Modules; each component ships a self-contained `@dsCard` preview HTML (inlines tokens + CSS) that renders standalone and passes the design-sync render-check. No Storybook.

**Tech Stack:** React 18, TypeScript, Vite (library build), CSS Modules, Google Fonts (Bangers/Sora/Inter).

## Global Constraints

- Package root: `comic-ui/` inside this repo; self-contained (own `package.json`/`node_modules`).
- No Storybook. The design-sync **preview HTML cards** are the documentation surface.
- Every preview card's first line is `<!-- @dsCard group="…" -->` and is **self-contained** (inlines `tokens.css` + the component CSS + the Google-Fonts `<link>`), so it renders with no build step.
- Preview cards must show **visually distinct variants** (render-check rejects blank/thin/identical).
- Token values are exact, from the catalog. Colors: navy `#0e2236`, navy-deep `#061320`, navy-mid `#1a3a5c`, gold `#F9A630`, gold-bright `#FBD46D`, red `#E04A2C`, red-bright `#FF6B45`, blue `#5087dd`, steel `#c0c8d4`, steel-dim `#6f7a8a`, paper `#FFF9EE`, ink `#111`.
- Signature heading text-shadow: `3px 3px 0 var(--comic-red), 6px 6px 0 var(--comic-navy-deep)`.
- Comic offset box-shadow scale: `2/4/6px`; layered frames `10px 10px 0 <c1>, 20px 20px 0 <c2>`.
- Fonts: Bangers (display), Sora 600–800 (subhead), Inter 400–700 (body).
- Card `@dsCard` groups: `Comic / Foundations`, `Comic / Components`, `Comic / Layout`, `Comic / Decorative`.
- Verification per task = `npm run build` (tsc + vite) succeeds AND each new preview card renders in a browser (non-blank, distinct variants). There are no jest unit tests — these are presentational components; the render-check is the test.

---

### Task 1: Scaffold the `comic-ui` package

**Files:**
- Create: `comic-ui/package.json`, `comic-ui/tsconfig.json`, `comic-ui/vite.config.ts`, `comic-ui/.gitignore`, `comic-ui/README.md`
- Create: `comic-ui/src/index.ts` (empty barrel for now), `comic-ui/src/fonts.css`
- Create: `comic-ui/src/assets/` ← copy SVGs from `public/images/lp/law-firm-reset/` (`bat-signal.svg`, `skyline.svg`, `burst-1..4.svg`, `info-box.svg`, `icon1..3.svg`)

**Interfaces:**
- Produces: a buildable empty package; `npm run build` runs `tsc --noEmit && vite build`.

- [ ] **Step 1: Create `comic-ui/package.json`**

```json
{
  "name": "comic-ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/comic-ui.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "dev": "vite build --watch"
  },
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

- [ ] **Step 2: Create `comic-ui/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `comic-ui/vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: "src/index.ts", name: "ComicUI", fileName: "comic-ui", formats: ["es"] },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] },
  },
});
```

- [ ] **Step 4: Create `comic-ui/.gitignore`**

```
node_modules/
dist/
```

- [ ] **Step 5: Create `comic-ui/src/fonts.css`** (also pasted inline into every preview card)

```css
@import url("https://fonts.googleapis.com/css2?family=Bangers&family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap");
```

- [ ] **Step 6: Create `comic-ui/src/index.ts`** (empty barrel)

```ts
export {};
```

- [ ] **Step 7: Copy comic SVG assets**

```bash
mkdir -p comic-ui/src/assets
cp public/images/lp/law-firm-reset/bat-signal.svg public/images/lp/law-firm-reset/skyline.svg \
   public/images/lp/law-firm-reset/burst-1.svg public/images/lp/law-firm-reset/burst-2.svg \
   public/images/lp/law-firm-reset/burst-3.svg public/images/lp/law-firm-reset/burst-4.svg \
   public/images/lp/law-firm-reset/info-box.svg public/images/lp/law-firm-reset/icon1.svg \
   public/images/lp/law-firm-reset/icon2.svg public/images/lp/law-firm-reset/icon3.svg \
   comic-ui/src/assets/
```

- [ ] **Step 8: Install + build**

Run: `cd comic-ui && npm install && npm run build`
Expected: install succeeds; build succeeds (empty lib, no type errors).

- [ ] **Step 9: Commit**

```bash
git add comic-ui/package.json comic-ui/tsconfig.json comic-ui/vite.config.ts comic-ui/.gitignore comic-ui/README.md comic-ui/src
git commit -m "feat(comic-ui): scaffold standalone React design-system package"
```

---

### Task 2: Design tokens (`tokens.css` + `tokens.ts`)

**Files:**
- Create: `comic-ui/src/tokens/tokens.css`, `comic-ui/src/tokens/tokens.ts`, `comic-ui/src/tokens/index.ts`
- Modify: `comic-ui/src/index.ts` (export tokens)

**Interfaces:**
- Produces: CSS custom properties under `:root` (consumed by every component CSS Module) and a typed `tokens` object (consumed by JS that needs raw values).

- [ ] **Step 1: Create `comic-ui/src/tokens/tokens.css`**

```css
:root {
  /* color */
  --comic-navy: #0e2236;
  --comic-navy-deep: #061320;
  --comic-navy-mid: #1a3a5c;
  --comic-gold: #F9A630;
  --comic-gold-bright: #FBD46D;
  --comic-red: #E04A2C;
  --comic-red-bright: #FF6B45;
  --comic-blue: #5087dd;
  --comic-steel: #c0c8d4;
  --comic-steel-dim: #6f7a8a;
  --comic-paper: #FFF9EE;
  --comic-ink: #111111;
  --comic-white: #ffffff;
  /* type */
  --comic-font-display: 'Bangers', 'Impact', sans-serif;
  --comic-font-subhead: 'Sora', sans-serif;
  --comic-font-body: 'Inter', -apple-system, sans-serif;
  --comic-display: clamp(56px, 9vw, 132px);
  --comic-display-md: clamp(34px, 5vw, 60px);
  --comic-display-sm: clamp(28px, 4vw, 44px);
  --comic-lede: clamp(19px, 2.2vw, 26px);
  /* effects */
  --comic-shadow-text: 3px 3px 0 var(--comic-red), 6px 6px 0 var(--comic-navy-deep);
  --comic-shadow-sm: 2px 2px 0 var(--comic-navy-deep);
  --comic-shadow-md: 4px 4px 0 var(--comic-navy-deep);
  --comic-shadow-lg: 6px 6px 0 var(--comic-navy-deep);
  --comic-shadow-frame: 10px 10px 0 var(--comic-red), 20px 20px 0 var(--comic-navy-deep);
  --comic-radius: 10px;
  --comic-radius-lg: 14px;
}
```

- [ ] **Step 2: Create `comic-ui/src/tokens/tokens.ts`**

```ts
export const colors = {
  navy: "#0e2236", navyDeep: "#061320", navyMid: "#1a3a5c",
  gold: "#F9A630", goldBright: "#FBD46D",
  red: "#E04A2C", redBright: "#FF6B45",
  blue: "#5087dd", steel: "#c0c8d4", steelDim: "#6f7a8a",
  paper: "#FFF9EE", ink: "#111111", white: "#ffffff",
} as const;

export const fonts = {
  display: "'Bangers', 'Impact', sans-serif",
  subhead: "'Sora', sans-serif",
  body: "'Inter', -apple-system, sans-serif",
} as const;

export const tokens = { colors, fonts } as const;
```

- [ ] **Step 3: Create `comic-ui/src/tokens/index.ts`**

```ts
export * from "./tokens";
export const tokensCssHref = "./tokens.css";
```

- [ ] **Step 4: Update `comic-ui/src/index.ts`**

```ts
export * from "./tokens";
```

- [ ] **Step 5: Build + commit**

Run: `cd comic-ui && npm run build` → Expected: PASS

```bash
git add comic-ui/src
git commit -m "feat(comic-ui): design tokens (css variables + typed object)"
```

---

### Task 3: Component pattern reference — `ComicButton` (full implementation)

This task establishes the exact pattern every later component follows: `Name.tsx` + `Name.module.css` + `index.ts` + a self-contained `@dsCard` preview HTML.

**Files:**
- Create: `comic-ui/src/components/ComicButton/ComicButton.tsx`, `ComicButton.module.css`, `index.ts`
- Create: `comic-ui/design-sync/components/comic-button.html`
- Modify: `comic-ui/src/index.ts`

**Interfaces:**
- Produces: `ComicButton(props: { variant?: 'primary'|'secondary'|'ghost'; size?: 'sm'|'md'|'lg' } & React.ButtonHTMLAttributes<HTMLButtonElement>)`.

- [ ] **Step 1: `ComicButton.module.css`**

```css
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--comic-font-display); letter-spacing: 0.08em;
  border: none; border-radius: var(--comic-radius); cursor: pointer;
  background: var(--comic-gold); color: var(--comic-navy-deep);
  box-shadow: var(--comic-shadow-lg); transform: rotate(-1deg);
  transition: transform .15s, box-shadow .15s, background .15s;
}
.btn:hover { transform: rotate(-1deg) translate(-3px, -3px); box-shadow: 9px 9px 0 var(--comic-navy-deep); background: var(--comic-gold-bright); }
.sm { padding: 10px 18px; font-size: 18px; }
.md { padding: 16px 24px; font-size: 24px; }
.lg { padding: 18px 30px; font-size: 28px; }
.secondary { background: var(--comic-blue); color: var(--comic-white); }
.secondary:hover { background: #6b9ce6; }
.ghost { background: transparent; color: var(--comic-gold); box-shadow: none; border: 2px solid var(--comic-gold); }
.ghost:hover { background: rgba(249,166,48,0.12); box-shadow: none; }
```

- [ ] **Step 2: `ComicButton.tsx`**

```tsx
import styles from "./ComicButton.module.css";

export interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ComicButton({ variant = "primary", size = "md", className = "", ...props }: ComicButtonProps) {
  const cls = [styles.btn, styles[size], variant !== "primary" ? styles[variant] : "", className]
    .filter(Boolean).join(" ");
  return <button className={cls} {...props} />;
}
```

- [ ] **Step 3: `comic-ui/src/components/ComicButton/index.ts`**

```ts
export * from "./ComicButton";
```

- [ ] **Step 4: Update `comic-ui/src/index.ts`** (add line)

```ts
export * from "./components/ComicButton";
```

- [ ] **Step 5: `comic-ui/design-sync/components/comic-button.html`** (self-contained preview card)

```html
<!-- @dsCard group="Comic / Components" -->
<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap">
<style>
  /* tokens (inlined) */
  :root{--comic-navy-deep:#061320;--comic-gold:#F9A630;--comic-gold-bright:#FBD46D;--comic-blue:#5087dd;--comic-white:#fff;--comic-radius:10px;}
  body{background:#0e2236;display:flex;gap:24px;flex-wrap:wrap;align-items:center;padding:48px;font-family:'Bangers',sans-serif;}
  .btn{display:inline-flex;align-items:center;gap:10px;font-family:'Bangers',sans-serif;letter-spacing:.08em;border:none;border-radius:var(--comic-radius);cursor:pointer;background:var(--comic-gold);color:var(--comic-navy-deep);box-shadow:6px 6px 0 var(--comic-navy-deep);transform:rotate(-1deg);padding:16px 24px;font-size:24px;}
  .secondary{background:var(--comic-blue);color:var(--comic-white);}
  .ghost{background:transparent;color:var(--comic-gold);box-shadow:none;border:2px solid var(--comic-gold);}
</style></head><body>
  <button class="btn">Primary →</button>
  <button class="btn secondary">Secondary →</button>
  <button class="btn ghost">Ghost →</button>
</body></html>
```

- [ ] **Step 6: Build + render check**

Run: `cd comic-ui && npm run build` → Expected: PASS
Open `comic-ui/design-sync/components/comic-button.html` in a browser → Expected: three visibly distinct buttons (gold/blue/outline) on navy.

- [ ] **Step 7: Commit**

```bash
git add comic-ui/src/components/ComicButton comic-ui/design-sync/components/comic-button.html comic-ui/src/index.ts
git commit -m "feat(comic-ui): ComicButton + preview card (establishes component pattern)"
```

---

### Task 4: Foundations preview cards (Colors, Typography, Elevation)

These are design-sync cards only (no React component needed) — they document the tokens visually.

**Files:**
- Create: `comic-ui/design-sync/foundations/colors.html`, `typography.html`, `elevation.html`

**Interfaces:**
- Consumes: token values from Task 2 (copied inline).

- [ ] **Step 1: `colors.html`** — `<!-- @dsCard group="Comic / Foundations" -->` then a grid of all 12 token swatches, each labeled with name + hex (use the exact hex values from Global Constraints).
- [ ] **Step 2: `typography.html`** — `<!-- @dsCard group="Comic / Foundations" -->` showing Bangers display at `--comic-display-md` with the signature text-shadow, Sora lede, Inter body — each labeled.
- [ ] **Step 3: `elevation.html`** — `<!-- @dsCard group="Comic / Foundations" -->` showing the offset shadows (sm/md/lg) and the layered frame shadow on sample boxes.
- [ ] **Step 4: Render check** — open all three; confirm distinct, non-blank.
- [ ] **Step 5: Commit**

```bash
git add comic-ui/design-sync/foundations
git commit -m "feat(comic-ui): foundations preview cards (colors, type, elevation)"
```

---

### Task 5: Core components — Eyebrow, Label, Card, Panel, UrgencyBanner, Display/Heading

Each follows the Task 3 pattern exactly (`.tsx` + `.module.css` + `index.ts` + `@dsCard` preview HTML in `design-sync/components/`, group `Comic / Components`), exported from `src/index.ts`. Build + render-check + commit after each.

**Per-component spec (exact CSS from the catalog):**

- [ ] **ComicEyebrow** — rotated pill. CSS: `background:var(--comic-red);color:#fff;padding:8px 16px;font-family:var(--comic-font-display);letter-spacing:0.12em;transform:rotate(-2deg);box-shadow:var(--comic-shadow-md);display:inline-block`. Prop `tone?: 'red'|'gold'` (gold → `background:var(--comic-gold);color:var(--comic-navy-deep)`). Preview: two eyebrows (red + gold).
- [ ] **ComicLabel** (POW badge) — `background:var(--comic-red);color:#fff;padding:6px 16px;font-family:var(--comic-font-display);letter-spacing:0.16em;transform:rotate(-3deg);box-shadow:3px 3px 0 var(--comic-gold)`. Preview: "STEP 1" / "URGENT!".
- [ ] **ComicCard** — `background:radial-gradient(ellipse at 50% 0%, rgba(249,166,48,0.10), transparent 70%), rgba(255,255,255,0.04);border:2px solid rgba(255,255,255,0.10);padding:30px 26px 28px;transform:rotate(-0.6deg);transition:transform .25s,border-color .25s,box-shadow .25s`. Hover: `transform:rotate(0) translateY(-6px);border-color:var(--comic-gold);box-shadow:var(--comic-shadow-lg)`. Children-driven. Preview: a card with heading + text on navy.
- [ ] **ComicPanel** — white framed box with star "tape" corners. CSS: `position:relative;background:#fff;border:4px solid var(--comic-gold);border-radius:var(--comic-radius-lg);box-shadow:var(--comic-shadow-frame);padding:32px`. Pseudo/spans for tape: two circles `width:44px;height:44px;border-radius:50%;background:var(--comic-red);color:#fff;font-family:var(--comic-font-display);font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:var(--comic-shadow-sm)` positioned top-left (`rotate(-12deg)`) and top-right (`rotate(12deg)`, gold bg). Content via children. Preview: a panel with placeholder content + ★ tapes.
- [ ] **UrgencyBanner** — `display:flex;gap:16px;align-items:center;background:rgba(80,135,221,0.12);border:2px solid var(--comic-blue);border-radius:4px;padding:16px 18px 16px 24px;box-shadow:5px 5px 0 var(--comic-navy-deep);transform:rotate(-0.4deg)`. Includes a ComicLabel slot + Sora body text. Props `label`, `children`. Preview: "URGENT! Conference pricing locks in…".
- [ ] **ComicDisplay** / **ComicHeading** — `font-family:var(--comic-font-display);text-transform:uppercase;line-height:0.95;color:#fff;text-shadow:var(--comic-shadow-text)`. `ComicDisplay` size `--comic-display`; `ComicHeading` size `--comic-display-md`. Prop `as?: keyof JSX.IntrinsicElements` (default h2). Preview: one of each on navy.

- [ ] **Final step: Commit** each component as it's completed (`feat(comic-ui): <Component> + preview card`).

---

### Task 6: Layout components — ComicContainer, ComicSection, HeroLayout

Same pattern; group `Comic / Layout`.

- [ ] **ComicContainer** — `max-width:1240px;margin:0 auto;padding:0 32px`. Prop `width?: 'wide'|'narrow'` (narrow → `max-width:760px`). Preview: a bordered container showing the bound.
- [ ] **ComicSection** — `position:relative;padding:96px 0;isolation:isolate` with a halftone `::after` (`background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);background-size:8px 8px;mix-blend-mode:screen`). Prop `tone?: 'navy'|'navy-deep'`. Preview: a section with a heading over the halftone.
- [ ] **HeroLayout** — `display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:48px;align-items:center` with `@media (max-width:960px){grid-template-columns:1fr}`. Slots `left`/`right`. Preview: copy block + art placeholder.
- [ ] **Commit** per component.

---

### Task 7: Decorative / animated — BatSignal, Skyline, HalftoneOverlay, Speedlines, BurstBadge, ScrollReveal

Same pattern; group `Comic / Decorative`. Keyframes live in each component's CSS Module (and inlined in previews). Use the asset SVGs from `src/assets`.

- [ ] **BatSignal** — wraps `bat-signal.svg`; `transform-origin:34% 97%;animation:comic-bat-pendulum 10s ease-in-out infinite` with `@keyframes comic-bat-pendulum{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(30deg)}}` + a glow layer `animation:comic-bat-pulse 3s ease-in-out infinite` (`@keyframes comic-bat-pulse{0%,100%{transform:scale(0.92);opacity:.55}50%{transform:scale(1.1);opacity:.95}}`). Prop `size?` (px). Preview: animated signal on navy.
- [ ] **Skyline** — `skyline.svg` as `background`, `mask-image:linear-gradient(to top,#000 60%,transparent 100%);opacity:0.55`. Preview: skyline strip on navy.
- [ ] **HalftoneOverlay** — absolutely-positioned dot grid (`radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);background-size:8px 8px;mix-blend-mode:screen`). Prop `opacity?`. Preview: overlay over a colored block.
- [ ] **Speedlines** — repeating-linear-gradient bars with `@keyframes comic-speedlines{from{opacity:0;transform:translateY(-50%) scaleX(.5)}to{opacity:.5;transform:translateY(-50%) scaleX(1)}}`. Preview: speedlines behind a label.
- [ ] **BurstBadge** — wraps a `burst-*.svg` with centered children text. Prop `burst?: 1|2|3|4`. Preview: a burst with "NEW!".
- [ ] **ScrollReveal** — wrapper using IntersectionObserver to toggle `is-visible`; CSS `opacity:0;transform:translateY(30px);transition:.6s cubic-bezier(0.22,1,0.36,1)` → visible resets. Prop `delay?`. Preview: a box that reveals (note: in the card it can start visible; include a "replay" note in the preview comment).
- [ ] **Commit** per component.

---

### Task 8: Barrel, README, and full build

**Files:**
- Modify: `comic-ui/src/index.ts` (ensure every component + tokens exported)
- Modify: `comic-ui/README.md` (usage: install, import, token CSS, list of components + groups)

- [ ] **Step 1:** Confirm `src/index.ts` re-exports all components and tokens.
- [ ] **Step 2:** Write `README.md` — install, `import { ComicButton } from "comic-ui"`, `import "comic-ui/src/tokens/tokens.css"`, and the component/group index.
- [ ] **Step 3:** `cd comic-ui && npm run build` → Expected: PASS, `dist/` emits types.
- [ ] **Step 4: Commit**

```bash
git add comic-ui/src/index.ts comic-ui/README.md
git commit -m "feat(comic-ui): barrel exports + README"
```

---

### Task 9: design-sync upload (interactive — requires user's claude.ai login)

**Files:** none new — uses the `comic-ui/design-sync/` preview cards + `comic-ui/src` source.

- [ ] **Step 1:** Confirm every preview card's first line is `<!-- @dsCard group="…" -->` and renders standalone (open each).
- [ ] **Step 2:** Run the `/design-sync` skill from `comic-ui/`. It pairs with the `DesignSync` tool: `list_projects` → choose/`create_project` → present the file plan → `finalize_plan` → `write_files` (components + tokens + preview cards). **The user approves the plan and the claude.ai project target interactively.**
- [ ] **Step 3:** Run the render-check; review `report_validate` counts (total/bad/thin/variantsIdentical). Fix any flagged card (usually: make variants more distinct, ensure fonts load) and re-sync that card.
- [ ] **Step 4:** Confirm the system appears under "Design systems" in the user's claude.ai org.

---

## Self-Review

- **Spec coverage:** Tokens (T2) ✓; Foundations cards (T4) ✓; Components — Button/Eyebrow/Label/Card/Panel/UrgencyBanner/Display/Heading (T3,T5) ✓; Layout — Container/Section/HeroLayout (T6) ✓; Decorative — BatSignal/Skyline/Halftone/Speedlines/BurstBadge/ScrollReveal (T7) ✓; preview cards w/ `@dsCard` (every component task) ✓; design-sync upload (T9) ✓; assets copied (T1) ✓; fonts (T1) ✓.
- **Placeholder scan:** Token/Button code is complete; T5–T7 give exact CSS values + variants + preview content per component following the T3 pattern (no "TBD").
- **Type consistency:** `ComicButton` props (`variant`/`size`) defined in T3; later components follow the same `Props extends React.*HTMLAttributes` + `className` merge pattern. Barrel exports reconciled in T8.
