# Interactive Differentiation & Brand Consolidation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add interactive storytelling components (scrollytelling, day timeline, ROI calculator, stat counters), restructure services around 6 core problems, and consolidate branding from "Intake 360"/"Impact Assistants" to unified "Attorney Assistant".

**Architecture:** New Astro components with inline `<script>` blocks for interactivity. All vanilla JS + CSS transitions. Data lives in component frontmatter. No new npm dependencies.

**Tech Stack:** Astro, Tailwind CSS v3, vanilla JavaScript, IntersectionObserver API

**Spec:** `docs/superpowers/specs/2026-03-18-interactive-differentiation-design.md`

---

### Task 1: Brand Consolidation — Components & Layouts

**Files:**
- Modify: `src/components/SEO.astro:14` (default description)
- Modify: `src/components/ComparisonTable.astro:20` (subtitle text)
- Modify: `src/layouts/BaseLayout.astro:49` (structured data description)

> **Note:** Header.astro and Footer.astro are _not_ modified in this task — they will be fully restructured in Task 6 (services dropdown reorganization), which supersedes any interim label changes.

- [ ] **Step 1: Update SEO.astro default description**

In `src/components/SEO.astro`, line 14, change:
```
"Attorney Assistant provides expert legal support services including Intake 360 and Impact Assistants to help law firms streamline operations."
```
to:
```
"Attorney Assistant provides expert legal support services — dedicated assistants and 24/7 intake — to help law firms streamline operations and convert more leads."
```

- [ ] **Step 2: Update ComparisonTable.astro subtitle**

In `src/components/ComparisonTable.astro`, line 20, change the subtitle text:
```
"a tailored combination of Impact Assistants and per-task services"
```
to:
```
"a tailored combination of dedicated assistants and per-task services"
```

- [ ] **Step 3: Update BaseLayout.astro structured data**

In `src/layouts/BaseLayout.astro`, line 49, change the description in the JSON-LD from mentioning "Intake 360 and Impact Assistants" to:
```
"Expert legal support services helping law firms streamline operations with dedicated assistants and 24/7 intake solutions."
```

- [ ] **Step 4: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed` with only the pre-existing sitemap error.

- [ ] **Step 5: Commit**

```bash
git add src/components/SEO.astro src/components/ComparisonTable.astro src/layouts/BaseLayout.astro
git commit -m "rebrand: remove Intake 360/Impact Assistants from components and layouts"
```

---

### Task 2: Brand Consolidation — Pages

**Files:**
- Modify: `src/pages/index.astro:22` (meta description)
- Modify: `src/pages/about.astro:105-127` (body copy)
- Modify: `src/pages/contact.astro:88-92` (form dropdown labels)
- Modify: `src/pages/faq.astro` (~25 instances across FAQ data arrays + hero)
- Modify: `src/pages/our-story.astro:110` (body copy)
- Modify: `src/pages/webinars.astro:8` (body copy)
- Modify: `src/pages/services/intake-360.astro` (badge, title references)
- Modify: `src/pages/services/impact-assistants.astro` (badge, title, body)
- Modify: `src/pages/services/index.astro` (strategic combination section, CTA)

Replacement rules:
- "Intake 360" → "our intake service", "24/7 intake", or "Attorney Assistant's intake solution" (context-dependent)
- "Impact Assistants" → "dedicated legal support", "your Attorney Assistant team", "dedicated assistants"
- "Impact Assistant" (singular) → "dedicated assistant", "your assistant"

- [ ] **Step 1: Update index.astro meta description**

Change the `description` prop in BaseLayout from mentioning "Intake 360 and Impact Assistants" to:
```
"Expert legal support services helping law firms streamline operations with dedicated assistants and 24/7 intake. Trusted by 200+ law firms."
```

- [ ] **Step 2: Update about.astro body copy**

Find and replace references to "Impact Assistants" and "Intake 360" in the "What We Do" and "Our Approach" sections (lines ~106-127). Replace with descriptive language:
- "dedicated Impact Assistants who integrate with your team" → "dedicated assistants who integrate with your team"
- "per-task services like Intake 360" → "per-task services like 24/7 intake"
- "a strategic mix of Impact Assistants and per-task services" → "a strategic mix of dedicated assistants and per-task services"

- [ ] **Step 3: Update contact.astro form dropdown labels**

In `src/pages/contact.astro`, lines 88-92, update only the visible label text of the dropdown options (keep `value` attributes unchanged to avoid breaking HubSpot form processing):
```html
<option value="intake-360">24/7 Intake Services</option>
<option value="impact-assistants">Dedicated Legal Support</option>
<option value="both">Both Services</option>
<option value="other">Other / Not Sure</option>
```

- [ ] **Step 4: Update faq.astro — all FAQ data arrays**

This is the most extensive change (~25 instances). Update all three FAQ data arrays (`gettingStarted`, `assistants`, `operations`):

In `gettingStarted`:
- Q: "What is an Impact Assistant?" → "What is a dedicated assistant?"
- A: Replace "Impact Assistants" with "dedicated assistants" throughout
- Q: "Do I need to choose between Impact Assistants and per-task services?" → "Do I need to choose between dedicated assistants and per-task services?"

In `assistants`:
- Category label: "Your Impact Assistant" → "Your Dedicated Assistant"
- All Q&A: Replace every "Impact Assistant" with "dedicated assistant" and "Impact Assistants" with "dedicated assistants"

In `operations`:
- All Q&A: Replace "Impact Assistants" with "dedicated assistants" and "Impact Assistant" with "dedicated assistant"
- "Our Intake 360 service" → "Our intake service"

Also update:
- Hero subtitle: "hiring an Impact Assistant" → "working with Attorney Assistant"
- BaseLayout description: same change

- [ ] **Step 5: Update our-story.astro and webinars.astro**

In `src/pages/our-story.astro`, line 110, change:
- "dedicated Impact Assistants and intake" → "dedicated assistants and intake"

In `src/pages/webinars.astro`, line 8, change:
- "The Future of Intake: Intake 360" → "The Future of Legal Intake"

- [ ] **Step 6: Update services/intake-360.astro**

- Change badge text from "Intake 360" to "24/7 Intake"
- Change page title from "Intake 360" to "24/7 Intake Services"
- Replace body copy references to "Intake 360" with "our intake service" or "Attorney Assistant's intake solution"

- [ ] **Step 7: Update services/impact-assistants.astro**

- Change badge text from "Impact Assistants" to "Dedicated Legal Support"
- Change page title from "Impact Assistants" to "Dedicated Legal Support"
- Replace body copy references throughout

- [ ] **Step 8: Update services/index.astro body copy**

Replace "Intake 360" and "Impact Assistants" in the strategic combination section and CTA body text. The full restructure of this page happens in Task 6.

- [ ] **Step 9: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 10: Verify no remaining instances**

Run: `grep -ri "intake 360\|impact assistant" src/ --include="*.astro" --include="*.ts" -l`
Expected: No results (storybook files excluded — those are Task 3).

- [ ] **Step 11: Commit**

```bash
git add src/pages/
git commit -m "rebrand: consolidate all pages to unified Attorney Assistant branding"
```

---

### Task 3: Brand Consolidation — Storybook

**Files:**
- Modify: `src/stories/Hero.stories.ts`
- Modify: `src/stories/Typography.stories.ts`
- Modify: `src/stories/BrandOverview.mdx`
- Modify: `src/stories/Cards.stories.ts`

- [ ] **Step 1: Update all storybook files**

Find and replace "Intake 360" and "Impact Assistant(s)" in all 4 story files with descriptive alternatives per the replacement rules.

- [ ] **Step 2: Commit**

```bash
git add src/stories/
git commit -m "rebrand: update storybook examples to unified branding"
```

---

### Task 4: Scrollytelling Component

**Files:**
- Create: `src/components/Scrollytelling.astro`
- Modify: `src/pages/index.astro` (insert component between "Why Us" and "Services Grid")

- [ ] **Step 1: Create Scrollytelling.astro**

Create `src/components/Scrollytelling.astro` with:

**Frontmatter:** No props needed — content is self-contained.

**HTML structure:**
```
<section class="scrollytelling relative bg-brand-950 grain-overlay overflow-hidden">
  <!-- noscript fallback: show all acts statically -->
  <noscript><style>.scrollytelling .act { opacity: 1 !important; transform: none !important; }</style></noscript>

  <!-- Act 1: "Right now, your firm is leaking revenue" -->
  <div class="act act-1" data-act="1">
    <div class="act-sentinel"></div>  <!-- IntersectionObserver target -->
    <div class="container-wide py-20 md:py-28 text-center relative z-10">
      <h2>Right now, your firm is leaking revenue</h2>
      <!-- 3 counter cards in a grid -->
      <!-- Counter: "3 missed calls today" with phone icon + red accent -->
      <!-- Counter: "47 min average intake time" with clock icon -->
      <!-- Counter: "$4,200 marketing spend → only 12% converted" -->
      <!-- Night timeline: 9pm, 11pm call icons going to voicemail -->
    </div>
  </div>

  <!-- Act 2: "The overnight gap" -->
  <div class="act act-2" data-act="2">
    <div class="act-sentinel"></div>
    <div class="container-wide py-20 md:py-28 text-center relative z-10">
      <h2>The overnight gap</h2>
      <!-- 6pm-8am timeline bar, dark/gray -->
      <!-- 10:47pm scenario: form submitted, no response, "They called another firm" -->
      <!-- Counter: "Leads lost overnight: 5" -->
    </div>
  </div>

  <!-- Act 3: "Now imagine every lead handled" -->
  <div class="act act-3" data-act="3">
    <div class="act-sentinel"></div>
    <div class="container-wide py-20 md:py-28 text-center relative z-10">
      <!-- Gold divider sweep animation -->
      <h2>Now imagine every lead handled</h2>
      <!-- Same 3 counters but with transformed values: 0, 5 min, 38% -->
      <!-- 10:47pm replay: "Answered in 90 seconds. Consultation booked." -->
      <!-- Overnight block glows gold: "24/7 coverage active" -->
    </div>
  </div>
</section>
```

**Styles (scoped `<style>` block):**
- `.act` starts with `opacity: 0; transform: translateY(40px)` — transitions to visible when `.is-active` class is added
- `.act-sentinel` is a zero-height div used as the observer target
- Counter numbers use `font-heading` and large display sizes
- Act 1 uses `text-error-500` accents on numbers; Act 3 uses `text-brand-gold` and `text-success-500`
- The gold divider in Act 3 animates `width` from 0 to 100% with a `transition: width 1s ease-out`
- `@media (prefers-reduced-motion: reduce)` — all `.act` elements have `opacity: 1; transform: none`

**Script (inline `<script>`):**
- Creates its own IntersectionObserver with `threshold: [0, 0.25, 0.5, 0.75]` and `rootMargin: '0px 0px -10% 0px'`
- Observes each `.act-sentinel` element
- When sentinel intersects at ≥25%, adds `.is-active` to the parent `.act`
- Counter animation function: `animateCounter(element, target, duration=2000)` using requestAnimationFrame with ease-out `1 - Math.pow(1 - t, 3)`
- Counters start animating when their act becomes active
- Each counter reads its target from `data-target` attribute; the displayed text is the final value (for a11y)

- [ ] **Step 2: Implement the full component**

Write the complete component code with all 3 acts, styled counters, timeline visualizations, and the JS observer/counter logic. Key implementation details:

- Counter cards: Use the existing `.card` class with colored top borders (red for Act 1, gold for Act 3)
- Night timeline in Act 1: A horizontal bar with time markers at 9pm and 11pm, phone icons with red "missed" badges
- Act 2 overnight bar: A `div` styled as a horizontal bar from "6pm" to "8am" labels, dark gray fill
- The 10:47pm scenario: A card-like element showing a form submission with timestamp, then a "no response" state, then "They called another firm"
- Act 3 gold divider: `<div class="divider-sweep">` that animates `scaleX(0)` to `scaleX(1)` with `transform-origin: left`
- Act 3 overnight block: Same bar as Act 2 but with `bg-brand-gold` and a glow shadow

- [ ] **Step 3: Insert component into homepage**

In `src/pages/index.astro`, add `import Scrollytelling from "@components/Scrollytelling.astro";` to frontmatter, then insert `<Scrollytelling />` between the closing `</section>` of "Unlock Your Firm's Full Potential" and the opening comment `<!-- Services Grid -->`.

- [ ] **Step 4: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 5: Commit**

```bash
git add src/components/Scrollytelling.astro src/pages/index.astro
git commit -m "feat: add scrollytelling component to homepage"
```

---

### Task 5: Day Timeline Component

**Files:**
- Create: `src/components/DayTimeline.astro`

- [ ] **Step 1: Create DayTimeline.astro**

Create `src/components/DayTimeline.astro` with:

**Frontmatter:** Define the 8 scenarios as a data array:
```typescript
const scenarios = [
  { time: "7:30am", label: "Morning Arrival", without: "Staff arrives to 6 overnight voicemails...", with: "All 6 leads already qualified..." },
  { time: "9:00am", label: "Peak Call Volume", without: "Receptionist juggling 4 calls...", with: "All calls answered live..." },
  // ... all 8 from spec
];
```

**HTML structure:**
```
<div class="day-timeline">
  <!-- Toggle -->
  <div class="flex justify-center mb-8">
    <button class="timeline-toggle" aria-pressed="false" id="timeline-toggle">
      <span class="toggle-option toggle-without">Without Attorney Assistant</span>
      <span class="toggle-option toggle-with">With Attorney Assistant</span>
    </button>
  </div>

  <!-- Timeline bar (desktop: horizontal, mobile: vertical) -->
  <div class="timeline-bar" role="list">
    {scenarios.map((s, i) => (
      <div class="timeline-block" data-index={i}>
        <button class="timeline-trigger" aria-expanded="false" aria-controls={`detail-${i}`}>
          <span class="time-label">{s.time}</span>
          <div class="block-bar"></div>
        </button>
        <div class="timeline-detail" id={`detail-${i}`} hidden>
          <div class="detail-without"><h4>Without</h4><p>{s.without}</p></div>
          <div class="detail-with"><h4>With Attorney Assistant</h4><p>{s.with}</p></div>
        </div>
      </div>
    ))}
  </div>

  <!-- noscript: show all expanded -->
  <noscript><style>.timeline-detail { display: grid !important; } .timeline-detail[hidden] { display: grid !important; }</style></noscript>
</div>
```

**Styles:**
- Toggle button: pill shape with two segments, active segment gets `bg-brand-navy text-white` (without mode) or `bg-brand-gold text-brand-900` (with mode)
- `.block-bar`: colored rectangles — `bg-error-300` (without) or `bg-brand-gold` (with), toggled by class
- `.timeline-detail`: grid with 2 columns for the split comparison; `max-height` transition for expand/collapse
- Desktop: CSS Grid with 8 proportional columns
- Mobile (`@media max-width: 768px`): flex column, full-width blocks

**Script:**
- Toggle click handler: toggles `aria-pressed`, swaps `.is-with` class on `.day-timeline`, updates all bar colors
- Block click handler (event delegation on `.timeline-bar`): finds clicked `.timeline-trigger`, toggles `aria-expanded`, shows/hides `.timeline-detail`, collapses any other open block
- Expand uses JS-measured `scrollHeight` set to `max-height` for smooth transition

- [ ] **Step 2: Implement the full component**

Write the complete component with all 8 scenarios, toggle logic, expand/collapse, and responsive layout.

- [ ] **Step 3: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`. Note: this only verifies the component has no syntax errors — it is not yet imported by any page. Visual/functional verification happens after Task 6 integrates it into the services index.

- [ ] **Step 4: Commit**

```bash
git add src/components/DayTimeline.astro
git commit -m "feat: add interactive day timeline component"
```

---

### Task 6: Services Restructure — Index Page & New Pages

**Files:**
- Modify: `src/pages/services/index.astro` (full rewrite)
- Create: `src/pages/services/lead-recovery.astro`
- Create: `src/pages/services/lead-follow-up.astro`
- Create: `src/pages/services/after-hours.astro`
- Modify: `src/components/Header.astro` (services dropdown)
- Modify: `src/components/Footer.astro` (services links)

- [ ] **Step 1: Rewrite services/index.astro**

Replace the current two-card layout with:
1. Hero: title "We Solve the Problems That Cost Your Firm Money", subtitle about custom solutions
2. Problem cards grid (3×2): 6 cards, each with an icon, problem title, one-sentence description, and link to the relevant service page. Use the existing `.card .card-hover` classes with `reveal` animations.
3. `<DayTimeline />` component (import from Task 5)
4. CTA banner (update body text to remove old brand names)

Problem cards:
| Title | Link | Icon |
|-------|------|------|
| Stop Losing Leads | /services/lead-recovery | phone |
| Fix Your Intake | /services/intake-360 | users |
| Never Miss a Follow-Up | /services/lead-follow-up | clock |
| 24/7 Coverage | /services/after-hours | globe |
| Streamline Operations | /services/admin-support | folder |
| Maximize Your Marketing ROI | /services/marketing-support | chart |

- [ ] **Step 2: Create lead-recovery.astro**

New page at `src/pages/services/lead-recovery.astro`. Follow the same structure as existing service pages (Hero → FeatureCard grid → How it works → CTA). Content focuses on:
- Hero: "Stop Losing Leads" / "Every missed call is revenue walking out the door"
- Stats: industry data on how fast leads go cold (5-minute rule, 78% of leads go to the first responder)
- Features: Live call answering, lead capture, CRM integration, call recording, real-time alerts
- Cross-links to: `/services/intake-360`, `/services/after-hours`

- [ ] **Step 3: Create lead-follow-up.astro**

New page at `src/pages/services/lead-follow-up.astro`. Content focuses on:
- Hero: "Never Miss a Follow-Up" / "Speed wins cases. Consistency closes them."
- Stats: follow-up timing data, conversion rate improvements
- Features: Automated follow-up sequences, 5-minute response guarantee, multi-channel outreach, status tracking
- Cross-links to: `/services/lead-recovery`, `/services/intake-360`

- [ ] **Step 4: Create after-hours.astro**

New page at `src/pages/services/after-hours.astro`. Content focuses on:
- Hero: "24/7 Coverage" / "Your competitors close at 5pm. You don't have to."
- The overnight gap story (echoing the scrollytelling narrative)
- Stats: percentage of leads that come in after hours, weekend conversion rates
- Features: Night/weekend coverage, overflow handling, holiday coverage, seamless handoff
- Cross-links to: `/services/lead-recovery`, `/services/lead-follow-up`

- [ ] **Step 5: Update Header.astro services dropdown**

Reorganize the Services dropdown items to lead with problems:
```typescript
items: [
  { href: "/services", label: "Overview", desc: "See all solutions" },
  { href: "/services/lead-recovery", label: "Stop Losing Leads", desc: "Capture every opportunity" },
  { href: "/services/intake-360", label: "Fix Your Intake", desc: "Streamline client intake" },
  { href: "/services/lead-follow-up", label: "Never Miss a Follow-Up", desc: "Speed and consistency" },
  { href: "/services/after-hours", label: "24/7 Coverage", desc: "Nights, weekends, overflow" },
  { href: "/services/admin-support", label: "Streamline Operations", desc: "Back-office efficiency" },
  { href: "/services/marketing-support", label: "Marketing ROI", desc: "Align spend with results" },
],
```

- [ ] **Step 6: Update Footer.astro services links**

Update the services section links to match the new problem-first structure.

- [ ] **Step 7: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 8: Commit**

```bash
git add src/pages/services/ src/components/Header.astro src/components/Footer.astro
git commit -m "feat: restructure services around 6 core problems, add 3 new pages"
```

---

### Task 7: ROI Calculator — Contact Page

**Files:**
- Create: `src/components/ROICalculator.astro`
- Modify: `src/pages/contact.astro` (insert component)

- [ ] **Step 1: Create ROICalculator.astro**

Create `src/components/ROICalculator.astro` with:

**HTML:** A card containing 3 native `<select>` dropdowns and a results display area.

```html
<div class="card p-6 md:p-8 roi-calculator">
  <h3 class="font-heading text-lg text-gray-900 mb-1">See Your Growth Potential</h3>
  <p class="text-sm text-gray-500 mb-6">Estimate how Attorney Assistant could impact your firm.</p>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <div>
      <label for="roi-spend" class="label-base">Monthly Ad Spend</label>
      <select id="roi-spend" class="input-base">
        <option value="2000">$2,000</option>
        <option value="5000" selected>$5,000</option>
        <option value="10000">$10,000</option>
        <option value="15000">$15,000</option>
        <option value="20000">$20,000+</option>
      </select>
    </div>
    <div>
      <label for="roi-leads" class="label-base">Leads / Month</label>
      <select id="roi-leads" class="input-base">
        <option value="10">10</option>
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200+</option>
      </select>
    </div>
    <div>
      <label for="roi-rate" class="label-base">Conversion Rate</label>
      <select id="roi-rate" class="input-base">
        <option value="0.05">5%</option>
        <option value="0.10" selected>10%</option>
        <option value="0.15">15%</option>
        <option value="0.20">20%</option>
        <option value="0.25">25%+</option>
      </select>
    </div>
  </div>

  <div class="roi-result bg-brand-25 rounded-xl p-5 border border-brand-100 text-center">
    <p class="text-sm text-gray-500 mb-1">With Attorney Assistant, you could be converting</p>
    <p class="text-display-xs font-heading text-brand-navy">
      <span id="roi-leads-result">0</span> more leads/month
    </p>
    <p class="text-sm text-gray-500 mt-1">
      worth an estimated <span id="roi-revenue-result" class="font-semibold text-brand-gold">$0</span> in additional monthly revenue
    </p>
  </div>

  <noscript>
    <div class="bg-brand-25 rounded-xl p-5 border border-brand-100 text-center mt-4">
      <p class="text-sm text-gray-500">Most firms see a 2-3x improvement in lead conversion. Book a call to see what's possible for your firm.</p>
    </div>
  </noscript>
</div>
```

**Script:**
```javascript
const CONVERSION_MULTIPLIER = 2.5;
const RATE_CAP = 0.45;
const AVG_CASE_VALUE = 3500;

function calculate() {
  const leads = Number(document.getElementById('roi-leads').value);
  const rate = Number(document.getElementById('roi-rate').value);
  const improvedRate = Math.min(rate * CONVERSION_MULTIPLIER, RATE_CAP);
  const additionalLeads = Math.round(leads * (improvedRate - rate));
  const additionalRevenue = additionalLeads * AVG_CASE_VALUE;

  document.getElementById('roi-leads-result').textContent = additionalLeads;
  document.getElementById('roi-revenue-result').textContent =
    '$' + additionalRevenue.toLocaleString();
}

document.querySelectorAll('.roi-calculator select').forEach(function(el) {
  el.addEventListener('change', calculate);
});
calculate(); // initial calculation
```

- [ ] **Step 2: Insert into contact.astro**

Import `ROICalculator` and insert it above the contact form, inside the `md:col-span-3` column, before the `<h2>Send Us a Message</h2>`:

```astro
<div class="mb-8">
  <ROICalculator />
</div>
```

- [ ] **Step 3: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 4: Commit**

```bash
git add src/components/ROICalculator.astro src/pages/contact.astro
git commit -m "feat: add ROI calculator to contact page"
```

---

### Task 8: Animated Stat Counters — About Page

**Files:**
- Modify: `src/pages/about.astro` (add counter animation to stats if present, or add a stats section)

- [ ] **Step 1: Add stats section with animated counters to about.astro**

Insert after the closing `</section>` tag of the Mission section (around line 37 of about.astro) and before the Values `<section>` opening (around line 40). Add a stats bar:

```html
<section class="py-12 bg-brand-navy grain-overlay relative overflow-hidden">
  <div class="container-wide relative z-10">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <p class="text-display-sm md:text-display-md font-heading text-white counter" data-target="200" data-suffix="+">0</p>
        <p class="text-xs text-brand-200 mt-1 uppercase tracking-widest">Law Firms</p>
      </div>
      <div>
        <p class="text-display-sm md:text-display-md font-heading text-white counter" data-target="60" data-suffix="%+">0</p>
        <p class="text-xs text-brand-200 mt-1 uppercase tracking-widest">Cost Savings</p>
      </div>
      <div>
        <p class="text-display-sm md:text-display-md font-heading text-white counter" data-target="24" data-suffix="/7">0</p>
        <p class="text-xs text-brand-200 mt-1 uppercase tracking-widest">Coverage</p>
      </div>
      <div>
        <p class="text-display-sm md:text-display-md font-heading text-white counter" data-target="5" data-suffix=" min">0</p>
        <p class="text-xs text-brand-200 mt-1 uppercase tracking-widest">Response Time</p>
      </div>
    </div>
  </div>
</section>
```

**Script (inline at bottom of about.astro):**
```javascript
document.querySelectorAll('.counter').forEach(function(el) {
  var target = Number(el.dataset.target);
  var suffix = el.dataset.suffix || '';
  var observed = false;

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !observed) {
      observed = true;
      var start = performance.now();
      var duration = 2000;

      function step(now) {
        var t = Math.min((now - start) / duration, 1);
        var ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(el);
});
```

- [ ] **Step 2: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add animated stat counters to about page"
```

---

### Task 9: Problem → Solution Hover Reveals — Service Pages

**Files:**
- Modify: `src/components/FeatureCard.astro` (add reveal slot/mechanism)
- Modify: Service pages that use FeatureCard (add `data-reveal` content)

- [ ] **Step 1: Update FeatureCard.astro**

Add a hidden reveal div that shows on hover/tap:

After the description `<p>` tag, add:
```html
<slot name="reveal">
  {Astro.props.reveal && (
    <div class="feature-reveal">
      <p class="text-xs text-brand-600 font-medium leading-relaxed mt-2">{Astro.props.reveal}</p>
    </div>
  )}
</slot>
```

Add prop: `reveal?: string;` to the Props interface.

Add scoped styles:
```css
.feature-reveal {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

:global(.group:hover) .feature-reveal,
:global(.group.is-active) .feature-reveal {
  max-height: 100px;
  opacity: 1;
}
```

Add inline script for mobile tap handling:
```javascript
document.querySelectorAll('.feature-reveal').forEach(function(el) {
  var card = el.closest('.group');
  if (!card) return;
  card.addEventListener('click', function(e) {
    if (window.innerWidth >= 768) return; // desktop uses :hover
    document.querySelectorAll('.group.is-active').forEach(function(c) {
      if (c !== card) c.classList.remove('is-active');
    });
    card.classList.toggle('is-active');
  });
});
```

- [ ] **Step 2: Add reveal text to service page FeatureCards**

Update 2-3 service pages (start with `intake-360.astro`, `lead-recovery.astro`, `admin-support.astro`) to include `reveal` props on their FeatureCard components. Example:
```astro
<FeatureCard
  title="24/7 Live Answering"
  description="Trained intake specialists answer every call."
  icon="clock"
  reveal="Stop losing leads to voicemail. We answer every call in under 30 seconds, day or night."
/>
```

- [ ] **Step 3: Build and verify**

Run: `npx astro build 2>&1 | tail -5`
Expected: `✓ Completed`

- [ ] **Step 4: Commit**

```bash
git add src/components/FeatureCard.astro src/pages/services/
git commit -m "feat: add problem→solution hover reveals to feature cards"
```

---

### Task 10: Final Build Verification & Cleanup

**Files:** None new — verification only.

- [ ] **Step 1: Full build**

Run: `npx astro build 2>&1 | tail -10`
Expected: `✓ Completed` with only the pre-existing sitemap error.

- [ ] **Step 2: Verify brand consolidation is complete**

Run: `grep -ri "intake 360\|impact assistant" src/ --include="*.astro" --include="*.ts" --include="*.tsx" -l`
Expected: No results.

- [ ] **Step 3: Verify all new pages build**

Check that these URLs exist in dist/:
```bash
ls dist/services/lead-recovery/index.html dist/services/lead-follow-up/index.html dist/services/after-hours/index.html
```
Expected: All 3 files exist.

- [ ] **Step 4: Commit any remaining changes**

```bash
git status
# If any unstaged changes remain, stage and commit
```
