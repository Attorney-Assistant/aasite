# Interactive Competitive Differentiation & Brand Consolidation

**Date:** 2026-03-18
**Status:** Draft

---

## Overview

Add interactive components across the Attorney Assistant website that showcase competitive differentiation through storytelling, and consolidate branding from the former "Intake 360" / "Impact Assistants" product names to a unified "Attorney Assistant" brand. Restructure the services section to lead with the 6 core problems solved.

## Goals

1. Make the site feel alive with interactive, scroll-driven storytelling
2. Communicate competitive differentiation through experience, not just copy
3. Unify all branding under "Attorney Assistant"
4. Restructure services around problems solved, not roles offered

---

## 1. Homepage Scrollytelling — "The Cost of Doing Nothing"

**Location:** Insert immediately after the `<!-- Unlock Your Firm's Full Potential -->` section (the 3 "Why Us" cards) and before the `<!-- Services Grid -->` section in `src/pages/index.astro`.

**Format:** A scroll-driven section spanning ~3 viewport heights. No external libraries — pure CSS transitions + vanilla JS.

### Act 1 — "Right now, your firm is leaking revenue"

- Section fades in with a dark navy background
- Animated counters appear showing the pain:
  - "3 missed calls today"
  - "47 min average intake time"
  - "$4,200 in marketing spend this month → only 12% of leads converted"
- Small animated phone icons with "missed call" badges pulse in
- Subtle red/warning accent tones on the numbers
- A clock graphic advances showing calls arriving at 9pm, 11pm — ringing out to voicemail

### Act 2 — "The overnight gap"

- Timeline visualization shows 6pm → 8am
- The bar goes dark/gray — "Your firm goes offline"
- Animated scenario: A lead fills out a form at 10:47pm. A "no response" indicator appears. By morning, text appears: "They've already called another firm."
- Counter animates: "Leads lost overnight this week: 5"
- This is the emotional gut-punch of the narrative

### Act 3 — "Now imagine every lead handled"

- Gold divider sweeps horizontally across the section
- Background transitions from dark gray to navy with gold accents
- Same metrics animate to transformed values:
  - "0 missed calls" (green check)
  - "5 min avg intake" (down from 47)
  - "38% conversion rate" (up from 12%)
- The 10:47pm lead scenario replays: "Answered in 90 seconds. Consultation booked for 9am."
- Overnight block glows gold: "24/7 coverage active"
- Tone shifts from stressed grays/reds to confident navy/gold

### Technical approach

- New component: `src/components/Scrollytelling.astro`
- The component creates its **own** IntersectionObserver instance (separate from the global `.reveal` observer in BaseLayout) with per-act sentinel `<div>`s and a threshold array of `[0, 0.25, 0.5, 0.75]` to trigger acts at specific scroll positions
- Numbers use a counting animation (requestAnimationFrame-based counter with ease-out: `1 - Math.pow(1 - progress, 3)`)
- CSS transitions handle opacity, transform, and color shifts
- The section is self-contained — no impact on surrounding layout
- **`prefers-reduced-motion` fallback:** All 3 acts render statically as visible content with no animations. Counters show final values. The section becomes a standard scrollable layout.
- **`<noscript>` fallback:** All content is in the DOM with a CSS class that hides it by default; a `<noscript><style>` block overrides the hidden state so everything is visible without JS.

---

## 2. Services Page — Interactive Day Timeline

**Location:** Replaces the current two-card layout on `src/pages/services/index.astro`. Sits below the problem-based navigation grid (see Section 4).

### Component: `src/components/DayTimeline.astro`

A horizontal timeline showing a law firm's day with 8 key moments (not every hour — only the moments that tell the story).

**Collapsed state:**
- 8 time blocks rendered as colored bars along a horizontal axis with time labels
- A toggle button at the top: "Without Attorney Assistant" / "With Attorney Assistant"
  - Toggle is a `<button>` with `aria-pressed` attribute
- Without mode: blocks are colored red (problem hours) or gray (inactive hours)
- With mode: blocks are colored gold (covered) or navy (active)
- The 6pm–8am overnight span is a single wide block — prominently red in "without" mode, prominently gold in "with" mode
- Non-scenario gaps between the 8 blocks are rendered as thin neutral spacers to maintain timeline proportionality

**Expanded state (click any time block):**
- Clicked block expands below the timeline bar to show a split-panel comparison
- Left side (gray/red): the problem scenario
- Right side (navy/gold): the AA solution
- Only one block can be expanded at a time — clicking another collapses the first
- Expand/collapse uses `max-height` transition with `aria-expanded` on the trigger button
- Each block trigger is a `<button>` for keyboard accessibility

**The 8 time-block scenarios:**

| Time | Without AA | With AA |
|------|-----------|---------|
| 7:30am | Staff arrives to 6 overnight voicemails. Starts returning calls manually. 2 leads already called competitors. | All 6 leads already qualified. Intake complete. Appointments booked. |
| 9:00am | Receptionist juggling 4 simultaneous calls. 2 go to voicemail. | All calls answered live. Leads qualified in real-time. |
| 10:00am | Paralegal spends 45 min on intake paperwork for one client. | Intake data already captured and organized. Paralegal works on case. |
| 12:30pm | Lead from Tuesday still hasn't received follow-up call. | All follow-ups completed within 5 minutes of initial contact. |
| 2:00pm | Attorney manually reviews which leads to prioritize. | Qualified leads scored and prioritized. Attorney focuses on best cases. |
| 5:30pm | Office closes. Phones go to generic voicemail. | Seamless handoff. Live coverage continues. |
| 9:30pm | Potential client calls after seeing a TV ad. Gets voicemail. Calls competitor. | Live answer. Lead qualified. Consultation booked for morning. |
| 11:45pm | Website form submitted. Auto-reply sent. No follow-up until morning. | Form triggers immediate call-back. Lead converted same night. |

**Technical approach:**
- Vanilla JS for toggle and expand/collapse interactions
- CSS Grid for the timeline layout (8 columns with proportional widths based on time spans)
- `max-height` transitions for smooth expand/collapse (0 → auto via JS-measured height)
- Mobile: timeline stacks vertically, blocks are full-width tap targets
- Each scenario is defined as a data array in component frontmatter for easy editing
- **`<noscript>` fallback:** All scenarios render expanded in a static two-column layout (Without / With). Toggle defaults to showing both states.

---

## 3. Smaller Interactive Touches

### 3a. Animated Stat Counters — About Page

**Location:** The stats/metrics section on `src/pages/about.astro`.

- Numbers count up from 0 to their final value when scrolled into view
- Uses requestAnimationFrame with ease-out easing: `value * (1 - Math.pow(1 - progress, 3))`
- Duration: ~2 seconds per counter
- Triggers once via IntersectionObserver (can use the existing global observer), does not replay
- Final values are present in the DOM at all times as `data-target` attributes — the animation is purely visual. Screen readers see the final value.

### 3b. Problem → Solution Hover Reveals — Service Pages

**Location:** Feature grid sections on individual service pages.

- Each feature card gets a subtle content reveal on hover (desktop) or tap (mobile)
- Default state: the feature title + icon (current design)
- Hover/tap state: a one-sentence "problem → solution" statement fades in below the description
- Example: "Document Management" → reveals "Stop losing hours to disorganized files. We keep your case files organized so nothing falls through the cracks."
- **Desktop:** CSS `:hover` triggers the reveal via `opacity` and `max-height` transition on a hidden `<div>` within the card
- **Mobile:** A small JS handler adds/removes a `.is-active` class on tap. Tapping a different card closes the previous one. Uses event delegation on the grid container — single event listener, not per-card.
- The reveal content is authored as a `data-reveal` attribute or a hidden `<div>` within each card

### 3c. ROI Teaser — Contact Page

**Location:** Above or beside the HubSpot contact form on `src/pages/contact.astro`.

A simple 3-field mini calculator:
- **Monthly marketing spend** (dropdown: $2k, $5k, $10k, $15k, $20k+)
- **Leads per month** (dropdown: 10, 25, 50, 100, 200+)
- **Current conversion rate** (dropdown: 5%, 10%, 15%, 20%, 25%+)

**Output:** A single highlighted stat: "With Attorney Assistant, you could be converting **X more leads per month**, worth an estimated **$Y in additional monthly revenue**."

**Exact formula:**
```
improvedRate = min(currentRate * 2.5, 0.45)
additionalLeads = leads * (improvedRate - currentRate)
additionalRevenue = additionalLeads * 3500
```
Where `3500` is a configurable average case value constant at the top of the script. The 2.5x multiplier and 0.45 cap are also named constants for easy tuning.

- Output updates instantly on any dropdown change (no submit button)
- Not meant to be precise — meant to create urgency before they fill out the form
- No form submission, no data capture — purely motivational
- **`<noscript>` fallback:** Show a static message: "Most firms see a 2-3x improvement in lead conversion. Book a call to see what's possible for your firm."

---

## 4. Services Restructure — Problem-First Navigation

### Current structure (role-based):
```
/services/
  index.astro          → Two cards: Intake 360 + Impact Assistants
  intake-360.astro
  impact-assistants.astro
  admin-support.astro
  executive-assistant.astro
  legal-receptionist.astro
  marketing-support.astro
  virtual-legal-assistants.astro
```

### New structure (problem-first index, keep existing pages for SEO):

**Services index page** redesign:
- Hero: "We Solve the Problems That Cost Your Firm Money"
- Below hero: 6 problem cards in a 2×3 or 3×2 grid, each linking to the relevant service page
- Below the grid: the Interactive Day Timeline (Section 2)
- Below timeline: existing CTA banner

**The 6 problem cards:**

| Problem | Card Title | Links To | Page Exists? |
|---------|-----------|----------|-------------|
| Lost revenue from missed/mishandled leads | Stop Losing Leads | `/services/lead-recovery` | New page needed |
| Broken intake processes that kill conversion | Fix Your Intake | `/services/intake-360` | Exists (rebrand) |
| Lack of speed & consistency in follow-up | Never Miss a Follow-Up | `/services/lead-follow-up` | New page needed |
| Gaps in availability (nights, weekends, overflow) | 24/7 Coverage | `/services/after-hours` | New page needed |
| Operational inefficiencies | Streamline Operations | `/services/admin-support` | Exists |
| Poor alignment between marketing & results | Maximize Your Marketing ROI | `/services/marketing-support` | Exists (enhance) |

### New service pages needed (3):

**`/services/lead-recovery`** — Focused on the cost of missed and mishandled leads. Includes stats on how quickly leads go cold, competitor response times, and how AA ensures every lead is captured and handled.

**`/services/lead-follow-up`** — Speed-to-lead and consistency. Shows the data on follow-up timing (5-minute rule), how most firms fail at this, and how AA automates and accelerates the process.

**`/services/after-hours`** — Nights, weekends, overflow. The overnight gap story. How competitors close at 5pm while AA keeps converting. Emphasizes the 10:47pm scenario.

### Existing pages — SEO & redirect strategy:
- `intake-360.astro` → Rebrand content, keep URL for SEO. No redirect needed since the URL is still live and linked from the "Fix Your Intake" problem card.
- `impact-assistants.astro` → Rebrand to "Dedicated Legal Support". Keep URL for SEO backlinks. Add a cross-link to relevant problem pages.
- `admin-support.astro` → Reframe around operational inefficiency problem. URL unchanged.
- `marketing-support.astro` → Reframe around marketing/results alignment. URL unchanged.
- `executive-assistant.astro` → Keep as-is, link from relevant problem cards as supplementary.
- `legal-receptionist.astro` → Keep, link from "24/7 Coverage" and "Lead Recovery" pages.
- `virtual-legal-assistants.astro` → Keep, link from "Streamline Operations" page.
- **No redirects** — all existing URLs continue to work and serve content. The new problem-based pages are additions, not replacements.
- **No canonical tag changes** needed since old and new pages have distinct content and purposes.

### Header/Footer navigation update:
- Services dropdown reorganized: top-level items become the 6 problem cards; existing role-based pages become secondary items or are linked from within problem pages
- Footer services section updated to reflect problem-first ordering

---

## 5. Brand Consolidation — "Attorney Assistant" Unified

### Scope
Remove all references to "Intake 360" and "Impact Assistants" as standalone product names. Everything is now simply "Attorney Assistant" or described by what it does (e.g., "our intake service", "dedicated legal support").

### Files requiring changes (18 source files, ~59 instances):

**Components (4 files):**
- `Header.astro` — Nav labels for service links
- `Footer.astro` — Footer link labels
- `SEO.astro` — Default meta description
- `ComparisonTable.astro` — Column header text

**Layouts (1 file):**
- `BaseLayout.astro` — Structured data description

**Pages (8 files):**
- `index.astro` — Meta description, any body copy
- `about.astro` — Body copy references
- `contact.astro` — Form option labels
- `faq.astro` — Extensive FAQ content (~18 instances)
- `our-story.astro` — Body copy
- `webinars.astro` — Body copy
- `services/intake-360.astro` — Page title, hero, body copy
- `services/impact-assistants.astro` — Page title, hero, body copy

**Service index (1 file):**
- `services/index.astro` — Full restructure (Section 4)

**Storybook (4 files):**
- `src/stories/Hero.stories.ts`
- `src/stories/Typography.stories.ts`
- `src/stories/BrandOverview.mdx`
- `src/stories/Cards.stories.ts`

### Replacement rules:
- "Intake 360" → describe the function: "our intake service", "24/7 intake", "Attorney Assistant's intake solution"
- "Impact Assistants" → "dedicated legal support", "your Attorney Assistant team", "dedicated assistants"
- "Impact Assistant" (singular) → "dedicated assistant", "your assistant"
- Never use "Intake 360" or "Impact Assistants" as a standalone product brand

---

## 6. Technical Notes

### No external dependencies
All interactive components use vanilla JS + CSS transitions. No React, no animation libraries, no additional npm packages.

### Performance
- Scrollytelling creates its own IntersectionObserver instance with custom thresholds (separate from the global `.reveal` observer)
- Stat counters and hover reveals can use the existing global observer where threshold: 0.1 is sufficient
- Number counting animations use requestAnimationFrame
- All animations respect `prefers-reduced-motion` media query
- Timeline data is in component frontmatter — no runtime API calls

### Accessibility
- All interactive elements are keyboard navigable (Tab, Enter, Space)
- Timeline toggle is a `<button>` with `aria-pressed`
- Expandable hour blocks use `<button>` triggers with `aria-expanded`
- Animated counters have final values in the DOM at all times (`data-target` attributes); animation is visual-only
- Scrollytelling content is fully readable without animations (static fallback)
- ROI calculator dropdowns are native `<select>` elements

### Graceful degradation
- **`prefers-reduced-motion`:** All animations disabled, content renders statically in final state
- **JavaScript disabled:** `<noscript><style>` blocks ensure all content is visible. Scrollytelling acts show statically. Timeline shows all scenarios expanded. ROI calculator shows static fallback message.

### Mobile
- Scrollytelling: same scroll behavior, single-column layout
- Day Timeline: vertical stack, tap to expand blocks
- ROI Calculator: full-width layout, large tap targets
- Hover reveals: tap-based interaction with event delegation on grid container
