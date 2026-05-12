# Simple Campaign Lead-Magnet Landing Pages — Design

**Date:** 2026-05-12
**Status:** Design — pending implementation plan
**Stakeholders:** Nicole (product), Claude Code (implementation)
**Source brief:** `handoff/04_CLAUDE_CODE_BUILD_PROMPT.md` in the Simple Campaign project folder
**Companion docs:** `handoff/01_HUBSPOT_SETUP.md` (the source of truth for HubSpot custom properties, forms, meetings, workflows, and lists)

## 1. Overview

Two interactive lead-magnet landing pages and two booking thank-you pages, all integrated with HubSpot Forms + Meetings + Workflows. Both LPs are single-page client-side state machines that capture qualifying CRM data, render personalized results inline, gate the deliverable behind an email form, and route the contact into a HubSpot workflow that emails the PDF and creates a deal on meeting-book.

| LP | Path | Lead magnet | Reveal mechanic | Meeting routing |
|----|------|-------------|-----------------|-----------------|
| Benchmark | `/lp/simple/benchmark` | 2026 Law Firm Operations Benchmark PDF | Quartile bars vs. industry | Round-robin → AA Operations Directors |
| Villain | `/lp/comic/biggest-villain` | Per-villain Mission Briefing PDF (smart content) | Comic-styled villain reveal with $ leak | Contact-routed by `biggest_villain` |

The HubSpot side (forms, meetings, workflows, lists, smart content) is being stood up in parallel by Nicole per the handoff doc. This spec covers the code side — the LPs and the two new thank-you pages.

## 2. Scope

**In scope**

- Two Astro LPs at `src/pages/lp/simple/benchmark.astro` and `src/pages/lp/comic/biggest-villain.astro`
- Two new booking thank-you pages: `src/pages/thank-you-booking-simple-plain.astro` and `src/pages/thank-you-booking-simple-comic.astro`
- A shared config file `src/config/forms.ts` (already created) holding HubSpot Form IDs, Meeting URLs, and PDF asset URL
- Villain illustration assets copied + optimized into `public/images/lp/villains/`
- Benchmark PDF preview thumbnails — placeholder until Manus delivers (TODO)

**Out of scope (explicit non-goals)**

- HubSpot configuration (forms, meetings, workflows, smart content, lists) — Nicole owns this per `handoff/01_HUBSPOT_SETUP.md`
- The actual benchmark report PDF + per-villain Mission Briefing PDFs — Manus is producing them; LP delivery happens via HubSpot Workflow emails, not the LP itself
- "Save and resume" / mid-quiz progress persistence — single session, no localStorage
- A/B variants on copy or scoring — ship v1
- Mid-quiz back button — one-way flow on the Villain quiz preserves cinematic momentum
- Share-this-result mechanic on the Villain reveal — possible v2
- Retargeting pixel firing on the LP itself — covered server-side by Workflow 3 + existing HubSpot retargeting lists

## 3. Architecture

### 3.1 Page model

Each LP is **one self-contained Astro file** following the convention of the existing `/lp/simple/*.astro` and `/lp/comic/*.astro` pages — CSS in a `<style>` block, JS in `<script is:inline>`, data tables (quiz questions, benchmark thresholds) inline. No shared partials. Layouts handle header/footer suppression, geo-gating, HubSpot tracking, Meta Pixel, GTM, and PostHog — these are pre-wired in `SimpleCampaignLayout` and `ComicCampaignLayout` so the LPs only own their own body.

### 3.2 State machine

Each LP wraps its content in a single `<main>` element with a `data-stage` attribute. CSS hides all `[data-stage]` sections except the one matching the current value:

```css
main[data-stage="intro"] [data-stage]:not([data-stage="intro"]) { display: none; }
main[data-stage="micro-form"] [data-stage]:not([data-stage="micro-form"]) { display: none; }
/* etc. */
```

Transitions set the wrapper's `data-stage` attribute via JS, then smooth-scroll to the new section's anchor. No URL/history mutation — the back button still leaves the LP entirely.

### 3.3 HubSpot Forms integration pattern

All three forms (Benchmark Micro, Benchmark Email Gate, Villain Email Gate) embed via HubSpot's `hbspt.forms.create()` JS API rather than iframe so we get the `onFormReady`, `onFormSubmit`, and `onFormSubmitted` callbacks. The `forms/v2.js` loader script is added to each LP, gated behind the existing `window.__hsGeoReady` Promise so it doesn't load for blocked regions.

All three forms are configured server-side to show an inline thank-you message (per Nicole's HubSpot config) so the `onFormSubmitted` callback fires reliably and we can override its UI by transitioning our own stage.

Form IDs and meeting URLs are imported from `src/config/forms.ts`:

```ts
import { HUBSPOT_PORTAL_ID, FORM_IDS, MEETING_URLS, ASSET_URLS } from '@config/forms';
```

### 3.4 Tracking events

Stage transitions and form submissions fire matching PostHog + dataLayer events:

```js
function trackStage(lp, stage, extra = {}) {
  if (typeof posthog !== 'undefined') {
    posthog.capture(`${lp} LP Stage`, { stage, ...extra });
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `${lp.toLowerCase()}_lp_stage`, stage, ...extra });
}
```

Called with `lp = 'Benchmark'` or `lp = 'Villain'`. The `reveal` event on the Villain LP also includes `biggest_villain`, `threat_level`, and `estimated_annual_leak`.

A `Villain Quiz Completed` event fires immediately before the `reveal` stage so we can attribute drop-off between quiz completion and email gate.

## 4. Page 1 — Benchmark LP

**File:** `src/pages/lp/simple/benchmark.astro`
**Layout:** `SimpleCampaignLayout` (existing dark-navy + brand-gold aesthetic, DM Serif/DM Sans, geo-gated)

### 4.1 Stage flow

```
intro → micro-form → scorecard → email-gate → thank-you
```

### 4.2 Stage details

**intro**

- Eyebrow: `INDEPENDENT INDUSTRY DATA`
- H1: "Where does your firm rank?" (DM Serif, brand-gold gradient on "rank")
- Subhead: "The 2026 Law Firm Operations Benchmark. 15 metrics. 7 operational pillars. Your firm scored against the field."
- Visual: a static preview quartile bar (3 colored segments + a mock indicator), pure CSS
- CTA: `Take the 90-second self-assessment →` → advance to `micro-form`

**micro-form**

HubSpot form `Simple Campaign — Benchmark Micro-Form` (ID `FORM_IDS.benchmarkMicroForm`). The form is intentionally email-less — it's a trust-builder. HubSpot links the anonymous submission to the eventual contact via the `hubspotutk` cookie when the email gate is submitted on the same page.

Field internal names captured on submit (these match the HubSpot property names exactly):

| HubSpot internal name | Type | Notes |
|-----------------------|------|-------|
| `firm_attorney_count` | dropdown | Solo / 2-5 / 6-15 / 16-50 / 51+ |
| `monthly_lead_volume` | dropdown | <25 / 25-75 / 76-200 / 201-500 / 500+ |
| `practice_area` | dropdown | existing HubSpot property |
| `voicemail_rate_` | number (0–100) | trailing underscore is intentional (HubSpot strips the `%`) |
| `records_tat_days` | number (0–180) | optional ("skip" checkbox in form) |

On `onFormSubmit`, read all five values from the `$form` DOM, stash in a JS `state.benchmark = {}` object, then `trackStage('Benchmark', 'micro-form-submitted', state.benchmark)` and advance to `scorecard`.

**scorecard**

Renders client-side. Two quartile bars + three context cards.

**Quartile bar component** — pure HTML/CSS, no chart library. For each quartile metric:

```
┌──────────────────────────────────────────────────────────┐
│ Voicemail rate during business hours                    │
│ ┌──────┬─────────────────────────┬───────────────────┐  │
│ │ ≤5%  │ 6–25%                   │ 26–100%           │  │
│ │ sage │ tan                     │ coral             │  │
│ └──────┴─────────────────────────┴───────────────────┘  │
│         ▲ your firm: 18%                                │
│  ▲ 1% AA-supported target                               │
│                                                          │
│ Median tier — top performers operate below 5%.          │
└──────────────────────────────────────────────────────────┘
```

Implementation: each band is a flex child sized by `flex: <span>` so the bands' relative widths reflect their threshold spans. The user-value indicator is positioned absolutely with `left: calc(<value>/<max> * 100%)`. The AA-target indicator is a second marker on the same axis. The interpretation text below is selected by passing the value through `BENCHMARKS[metric].interpretation(value)`.

The two quartile metrics rendered:

| Metric | Bands (lower is better) | AA target |
|--------|--------------------------|-----------|
| `voicemail_rate_` | ≤5 sage / ≤25 tan / ≤100 coral | 1 |
| `records_tat_days` | ≤45 sage / ≤90 tan / ≤180 coral | 30 — *only rendered if user provided a value* |

Color tokens (from spec):

```css
--quartile-top: #7EA67C;    /* sage  */
--quartile-median: #D4B280; /* tan   */
--quartile-bottom: #E89991; /* coral */
--quartile-aa: #F9A630;     /* gold marker */
```

Context cards (non-quartile, just labeled values): Firm Attorney Count, Monthly Lead Volume, Practice Area. Cards are styled with the same dark-card pattern as `/lp/simple/intake.astro` (gold-border-on-hover, `bg-brand-25`/`bg-brand-gold/5` tint).

Below the bars + cards: an "unlock the full report" prompt with copy:

> You just saw 2 of your firm's 15 benchmark scores. The full 2026 Law Firm Operations Benchmark Report includes all 15 metrics, the 4-stage maturity model, and the top performer playbook.

CTA → advance to `email-gate`.

**email-gate**

HubSpot form `Simple Campaign — Benchmark Email Gate` (ID `FORM_IDS.benchmarkEmailGate`). UTMs are captured at page load and populated into hidden fields in `onFormReady`:

```js
const utms = (() => {
  const p = new URLSearchParams(location.search);
  return ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
    .reduce((acc, k) => (acc[k] = p.get(k) || '', acc), {});
})();
```

The form's `lead_magnet` hidden field already defaults to `Benchmark` server-side. On `onFormSubmitted`, advance to `thank-you`.

**thank-you**

- Headline: "Your report is on the way. Check your inbox."
- Subhead: brief reassurance ("HubSpot Workflow 1 emails the full PDF within ~60 seconds")
- HubSpot Meetings widget — `MEETING_URLS.benchmarkOperationsReview` — embedded using the same `.meetings-iframe-container` + geo-gated loader pattern as `src/pages/lp/simple/intake.astro:255`
- Below the widget: 3 PDF page-preview thumbnails (pages 4, 7, 11 from `ASSET_URLS.benchmarkReportPdf`) — placeholder gradient cards with `TODO(nicole)` comments until Manus delivers preview images. Implementation can optionally render them at build time by piping the PDF through `pdftoppm` (Poppler) in a build script — defer that decision to implementation.

## 5. Page 2 — Villain LP

**File:** `src/pages/lp/comic/biggest-villain.astro`
**Layout:** `ComicCampaignLayout` (existing, loads Bangers + Sora, geo-gated, noindex default). Add `Inter` to the layout's Google Fonts link (or load on this page only) — comic-one-pager uses all three.

### 5.1 Two visual modes

The page renders inside `<main data-stage="…" data-mode="…">`. Two `data-mode` values toggle the look:

| Mode | Stages | Look |
|------|--------|------|
| `clean` | `context-quiz` | Solid navy bg, no halftone, no Bangers. Clean white question cards, Sora question text, Inter answer rows. |
| `comic` | all other stages | Full comic-one-pager treatment: scoped halftone overlay, Bangers + red drop-shadow on H1s, POW/BAM/KAPOW comic badges, slightly rotated cards, speed-lines on transitions. |

Mode flips at the `transition` stage with a 600ms crossfade. The halftone overlay is a scoped element inside the wrapper (not `body::before`) so it can be conditionally rendered.

### 5.2 Visual system reference

Lift styling verbatim from `/Users/nicole/Documents/Claude/Projects/Simple Campaign/comic-one-pager/index.html`:

- Fonts: Bangers (headlines + badges), Sora (subheads + question text), Inter (body)
- Halftone overlay: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)` at `background-size: 8px 8px`, mix-blend `screen`
- H1 drop-shadow: `text-shadow: 3px 3px 0 #E04A2C, 6px 6px 0 #061320`
- POW/BAM badge styling: Bangers, gold or red bg, rotated ±2-3deg, hard navy drop-shadow
- Villain cards: `±0.6deg` rotation alternating, halftone overlay inside each card via `::before`, gold-border-on-hover lifting the card
- Gold-bordered rescue cards on the deploy CTA section

Color tokens from the one-pager:

```css
--navy: #0e2236;
--navy-deep: #061320;
--navy-mid: #1a3a5c;
--gold: #F9A630;
--gold-bright: #FBD46D;
--red: #E04A2C;
--red-bright: #FF6B45;
--steel: #c0c8d4;
--steel-dim: #6f7a8a;
```

### 5.3 Stage flow

```
intro → context-quiz → transition → villain-quiz → reveal → email-gate → thank-you
```

### 5.4 Stage details

**intro** (comic mode)

- Issue masthead: `Mission Briefing · Issue №02 · 2026`
- Red rotated eyebrow: `CASE FILE OPEN`
- H1 (Bangers + red drop-shadow): "Find your firm's biggest villain."
- Subhead (Sora): "Every law firm is fighting at least one. Take the 3-minute diagnostic. We'll name your biggest threat — and the rescue plan."
- CTA: `Start the diagnostic →` → advance to `context-quiz`
- **Rogues gallery** below the hero — all 7 villain silhouettes in a grid, each in a comic card with POW badge, villain name (Bangers), M.O. paragraph (verbatim from the comic-one-pager), and a stat line. Lift the M.O. + stat copy directly from `comic-one-pager/index.html` lines 535-589.

**context-quiz** (clean mode)

3 one-per-screen dropdowns with a "1 of 3 · Quick context" indicator at top:

1. Firm Attorney Count — dropdown
2. Monthly Lead Volume — dropdown
3. Practice Area — dropdown (options sourced from the existing HubSpot `practice_area` property values)

Each "Next" advances to the next question. After Q3, advance to `transition`. Answers are stashed in `state.context = { firm_attorney_count, monthly_lead_volume, practice_area }`.

**transition** (mode flip — 1.2s auto-advance)

Full-bleed dramatic intermezzo. The mode attribute switches from `clean` to `comic`. Halftone fades in over 600ms, navy deepens, Bangers headline `NOW LET'S FIND YOUR VILLAIN…`, animated speed-lines sweep in. No CTA. After 1.2s, advance to `villain-quiz`.

**villain-quiz** (comic mode)

10 questions, one per screen. Indicator: `Mission · Question N of 10` (Bangers, red, top of screen).

- Question text: Sora 700, white
- Answer options: comic-styled buttons — gold-bordered, hard navy drop-shadow, hover rotates them slightly
- Question 3 (records TAT) gets an extra "Skip — not PI/mass tort" link below the options (per spec)

**Quiz state object** (closure-scoped JS):

```js
const state = {
  context: { firm_attorney_count: '', monthly_lead_volume: '', practice_area: '' },
  scores: { PH: 0, AB: 0, VK: 0, DP: 0, SS: 0, AA: 0, HG: 0 },
  answers: [],
  qIndex: 0,
};
```

On each answer click: merge the selected option's `score` map into `state.scores`, push the answer onto `state.answers`, increment `qIndex`. After Q10, run `calculateResult()` + `estimateAnnualLeak()` (both verbatim from the build prompt), fire `Villain Quiz Completed` event, advance to `reveal`.

**Threat-level thresholds** (must match HubSpot property options exactly):

| Total score | Threat level |
|-------------|--------------|
| 0–10        | `Mild`       |
| 11–25       | `Serious`    |
| 26–45       | `Critical`   |
| 46+         | `Existential`|

The JS scoring function uses the literal strings `Mild`, `Serious`, `Critical`, `Existential` — these are the HubSpot dropdown option values for the `threat_level` property.

**reveal** (comic mode, full drama)

Layout (responsive — silhouette + assessment side-by-side on desktop, stacked on mobile):

- Top banner: `YOUR FIRM'S BIGGEST VILLAIN` (Bangers, red drop-shadow, full-width)
- Left column: villain silhouette PNG (from `/images/lp/villains/<slug>.png`), full-bleed in its column, gold-glow CSS drop-shadow behind
- Right column:
  - Villain name (Bangers, large, gold-bright text shadow)
  - 2-3 sentence threat-assessment copy in comic voice (one variant per villain, adapted from the one-pager M.O. paragraphs — to be drafted at implementation time)
  - Damage estimate card:
    - Label: `THE DAMAGE`
    - Number: Bangers, large, with red drop-shadow — formatted with `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(leak)` for display
    - Caption: "Estimated annual leak from the {{villain}} at a firm your size."
- Threat-level meter: 4-segment bar (Mild / Serious / Critical / Existential), filled segments highlighted gold, level label in Bangers below the bar
- Secondary threats: 2 smaller cards side-by-side showing villain #2 and #3 — silhouette thumbnail, name, M.O. one-liner
- Bottom CTA: `Deploy Attorney Assistant against the {{VILLAIN_NAME}} →` → advance to `email-gate`

**Villain code → display name → slug** (used throughout the LP):

| Code | Display name | Asset slug | Source PNG |
|------|--------------|------------|------------|
| PH | The Voicemail Phantom | `voicemail-phantom` | Villains 2 D.png |
| AB | The After-Hours Ambush | `after-hours-ambush` | Villains 2 G.png |
| VK | The Records Vault Keeper | `records-vault-keeper` | Villains 2 A.png |
| DP | The Drowning Paralegal | `drowning-paralegal` | Villains 2 E.png |
| SS | The Silence Saboteur | `silence-saboteur` | Villains 2 C.png |
| AA | The Admin Avalanche | `admin-avalanche` | Villains 2 B.png |
| HG | The Hiring Ghost | `hiring-ghost` | Villains 2 F.png |

**email-gate** (comic mode, quieter)

HubSpot form `Simple Campaign — Villain Email Gate` (ID `FORM_IDS.villainEmailGate`). Hidden fields populated in `onFormReady`:

| HubSpot internal name | Source value | Format notes |
|-----------------------|--------------|--------------|
| `biggest_villain` | `VILLAIN_NAMES[result.biggestVillain]` | exact display-name string |
| `secondary_villains` | top 2 runner-ups, comma-joined display names | e.g. `"The Drowning Paralegal, The Admin Avalanche"` |
| `threat_level` | `result.threatLevel` | one of `Mild`/`Serious`/`Critical`/`Existential` |
| `estimated_annual_leak` | `leak` (number) | **plain integer, no currency symbol, no commas** (the HubSpot property is Number) |
| `firm_attorney_count` | `state.context.firm_attorney_count` | dropdown value |
| `monthly_lead_volume` | `state.context.monthly_lead_volume` | dropdown value |
| `practice_area` | `state.context.practice_area` | dropdown value |
| `utm_source` etc. | parsed from URL | as in Benchmark LP |

The form's `lead_magnet` hidden field already defaults to `Villain` server-side. On `onFormSubmitted`, advance to `thank-you`.

**thank-you** (comic mode, victorious)

- Bangers headline: `YOUR MISSION BRIEFING IS EN ROUTE.`
- Subhead: "Check your inbox. The {{VILLAIN_NAME}} doesn't stand a chance."
- HubSpot Meetings widget — `MEETING_URLS.villainDeployRescueCall`. Routing by `biggest_villain` happens server-side via HubSpot Contact Routing (handoff doc Phase 3), so the LP doesn't need to know which closer to assign.
- Below: a single Mission Briefing PDF cover preview (placeholder until Manus delivers per-villain covers — generic cover for now, swap later)

## 6. Thank-You Pages (booking confirmations)

Two new pages, one per meeting type. HubSpot will be configured to redirect to these as the post-booking destination (Nicole sets this in HubSpot once the pages are live).

### 6.1 `thank-you-booking-simple-plain.astro` (Operations Review)

- **Path:** `src/pages/thank-you-booking-simple-plain.astro` → `/thank-you-booking-simple-plain`
- **Layout:** `SimpleCampaignLayout` (dark-navy + brand-gold, matches the Benchmark LP visual treatment)
- **Content:**
  - Confirmation hero: "Your Operations Review with AA is confirmed — check your calendar."
  - "What to expect on the call" — 3-line bulleted list. Copy lifted from `handoff/07_PHASE4_EMAILS_HTML.html` (Email 7 / meeting-confirmation HTML) at implementation time.
  - Conversion events fire on page load:
    ```js
    posthog?.capture('Meeting Booked', { meeting_type: 'operations_review' });
    window.dataLayer.push({ event: 'meeting_booked', meeting_type: 'operations_review' });
    ```
  - GA4 / LinkedIn / Meta conversion pixel placeholders — `TODO(nicole)` comments, Nicole fills in pixel IDs after launch
- **Meta:** `noindex, nofollow` (via `SimpleCampaignLayout`'s default)

### 6.2 `thank-you-booking-simple-comic.astro` (Deploy AA Rescue Call)

- **Path:** `src/pages/thank-you-booking-simple-comic.astro` → `/thank-you-booking-simple-comic`
- **Layout:** `ComicCampaignLayout` with the comic-one-pager styling lifted in (Bangers + halftone + red drop-shadow), matching the Villain LP
- **Content:**
  - Confirmation hero: Bangers headline `THE RESCUE IS SCHEDULED.` + subhead "Your Deploy AA call is confirmed — check your calendar."
  - "What to expect on the call" — 3-line list, same source as above but adapted to comic voice
  - Conversion events:
    ```js
    posthog?.capture('Meeting Booked', { meeting_type: 'deploy_aa_rescue_call' });
    window.dataLayer.push({ event: 'meeting_booked', meeting_type: 'deploy_aa_rescue_call' });
    ```
  - GA4 / LinkedIn / Meta pixel placeholders — `TODO(nicole)`
- **Meta:** `noindex, nofollow`

### 6.3 Note on existing thank-you pages

The existing `/thank-you-booking-simple` and `/thank-you-booking-comic` pages are unchanged. They serve the shared campaign meeting widgets used by other `/lp/simple/*` and `/lp/comic/*` pages (per `memory/project_campaign_widgets.md`). The two new pages serve only the two new lead-magnet meeting types.

## 7. Assets

### 7.1 Villain illustrations

Copy at implementation time:

```bash
cp "/Users/nicole/Library/CloudStorage/OneDrive-EOLLLC(DBATurnKeyOps)/Marketing/Ads/The Villain Lineup/Villains 2/Villains 2 D.png" public/images/lp/villains/voicemail-phantom.png
# (same pattern for all 7, per the mapping table in §5.4)
```

Then run `node scripts/optimize-images.mjs` to generate WebP variants. The script's skip list doesn't include `public/images/lp/villains/` so it'll pick them up.

### 7.2 Benchmark PDF previews

Three thumbnail images at `public/images/lp/benchmark/page-{4,7,11}.{jpg,webp}`. Generation options:

- Build-time rasterization via `pdftoppm` on the live PDF at `ASSET_URLS.benchmarkReportPdf` — clean, always in sync, but adds a build dependency
- Manual export from Manus / Nicole, dropped into `public/images/lp/benchmark/` — simpler, but stale if PDF revs

Decision: implementation defaults to manual drop with `TODO(nicole)` placeholder cards rendering gradient + page numbers until the real images arrive.

## 8. Shared infrastructure file

`src/config/forms.ts` (already written — see file):

- `HUBSPOT_PORTAL_ID = '49161090'`
- `FORM_IDS` — three HubSpot form UUIDs
- `MEETING_URLS` — two custom-domain meeting URLs
- `ASSET_URLS` — benchmark report PDF URL

Verify each ID against HubSpot Marketing → Forms before launch per the file's `TODO(nicole)` comment. IDs were transcribed from chat and are Nicole's best-read mapping; mismatches would silently route form data to the wrong contact properties.

## 9. HubSpot dependencies (reference, not implemented in code)

These exist server-side per `handoff/01_HUBSPOT_SETUP.md`. The LP depends on them but doesn't configure them:

- **Custom contact properties** (Phase 1) — 9 new properties: `firm_attorney_count`, `monthly_lead_volume`, `voicemail_rate_`, `records_tat_days`, `operations_maturity_score`, `biggest_villain`, `secondary_villains`, `threat_level`, `estimated_annual_leak`
- **3 forms** (Phase 2) — IDs in `src/config/forms.ts`, all set to "Display inline thank-you message"
- **2 meeting types** (Phase 3) — Operations Review (round-robin) + Deploy AA Rescue Call (contact routing on `biggest_villain`), both will be updated to redirect to the new thank-you pages once live
- **5 workflows** (Phase 4) — Workflow 2 handles per-villain PDF delivery via smart content on `biggest_villain`; the LP only writes the property, the workflow takes over
- **Lists, smart content, Slack alerts** (Phases 5–6, 8) — independent of LP code

## 10. TODOs / Placeholders

All `TODO(nicole)` markers in the LP code:

- Benchmark report PDF page-preview thumbnails (3 images for pages 4, 7, 11)
- Per-villain Mission Briefing PDF cover preview (Villain thank-you)
- GA4 / LinkedIn / Meta conversion pixel IDs (both new thank-you pages)
- Form IDs in `src/config/forms.ts` — verify against HubSpot before launch
- Practice Area dropdown options — confirm the current set in HubSpot matches what the context-quiz renders

## 11. Acceptance criteria

- [ ] Both LPs render correctly at 320px wide and 1440px wide
- [ ] Benchmark scorecard renders within 200ms of micro-form submission
- [ ] Villain quiz completable in under 3 minutes
- [ ] All three form submissions land in HubSpot with the correct property values (verified in HubSpot Forms → Submissions; properties verified on the Contact record)
- [ ] Email gate forms pre-populate UTMs as hidden fields
- [ ] Villain Email Gate writes all 7 hidden fields correctly (`biggest_villain`, `secondary_villains`, `threat_level`, `estimated_annual_leak`, `firm_attorney_count`, `monthly_lead_volume`, `practice_area`)
- [ ] `threat_level` value matches HubSpot dropdown options exactly (case-sensitive)
- [ ] `estimated_annual_leak` writes as a plain integer (no currency symbol, no commas)
- [ ] HubSpot Meetings widget loads in the thank-you stage
- [ ] Villain-routed meeting routing works end-to-end (test by submitting with different villains)
- [ ] Both new thank-you pages fire `Meeting Booked` PostHog + dataLayer events
- [ ] Both LPs + both thank-you pages emit `noindex, nofollow`
- [ ] No console errors or warnings in the browser
- [ ] All 7 villain silhouettes load correctly and have WebP variants
- [ ] Mode flip on Villain LP (`clean` → `comic`) animates smoothly
- [ ] Astro build completes without errors

## 12. Out of scope / future considerations

- Share-this-result mechanic on the Villain reveal (v2)
- A/B variants on copy or scoring
- Build-time PDF rasterization (defer until Manus delivers final PDF)
- Save and resume / progress persistence
- Migrating existing `/lp/simple/*` and `/lp/comic/*` pages to this new pattern (they're fine as-is)

## 13. Open questions

None — all open items from brainstorming have been resolved:

- ✅ Visual system: A (existing layouts) + comic-one-pager treatment for Villain LP
- ✅ HubSpot strategy: 3 forms as specced, IDs locked
- ✅ Meeting widgets: 2 new types as specced, URLs locked
- ✅ Villain assets + A-G mapping locked
- ✅ `threat_level` vocabulary: Mild / Serious / Critical / Existential
- ✅ `estimated_annual_leak`: kept, written as plain integer
- ✅ Pre-quiz context: 3 questions in clean mode, then transition flip to comic mode
- ✅ Damage estimate: shown on reveal as $-formatted display; stored as integer
- ✅ Thank-you pages: two new dedicated pages
