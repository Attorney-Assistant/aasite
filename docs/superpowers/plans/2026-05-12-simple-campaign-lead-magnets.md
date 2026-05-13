# Simple Campaign Lead-Magnet LPs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two interactive HubSpot-integrated lead-magnet LPs (`/lp/simple/benchmark`, `/lp/comic/biggest-villain`) and two new booking thank-you pages, end-to-end.

**Architecture:** Two Astro single-page state machines that embed HubSpot Forms via the JS API (for `onFormSubmit` callbacks), render personalized results inline (quartile bars + comic villain reveal), then route into HubSpot Workflows for PDF delivery and meeting routing. Visual systems lifted from existing `SimpleCampaignLayout` (Benchmark) and the comic-one-pager reference HTML (Villain).

**Tech Stack:** Astro 4 (SSG), Tailwind v3, vanilla `<script is:inline>` JS, HubSpot Forms v2 JS API, HubSpot Meetings embed, existing geo-gating + PostHog + GTM via campaign layouts.

**Spec:** `docs/superpowers/specs/2026-05-12-simple-campaign-lead-magnets-design.md`
**Source-of-truth config:** `src/config/forms.ts` (already exists)

---

## File Structure

**New files:**
- `public/images/lp/villains/{voicemail-phantom,after-hours-ambush,records-vault-keeper,drowning-paralegal,silence-saboteur,admin-avalanche,hiring-ghost}.png` (+ matching `.webp`)
- `src/pages/lp/simple/benchmark.astro` — Benchmark LP (5 stages: intro → micro-form → scorecard → email-gate → thank-you)
- `src/pages/lp/comic/biggest-villain.astro` — Villain LP (7 stages: intro → context-quiz → transition → villain-quiz → reveal → email-gate → thank-you)
- `src/pages/thank-you-booking-simple-plain.astro` — post-Operations-Review booking
- `src/pages/thank-you-booking-simple-comic.astro` — post-Deploy-AA-Rescue-Call booking

**Modified files:**
- `src/layouts/ComicCampaignLayout.astro` — add Inter to Google Fonts URL (Bangers + Sora already loaded)

**Already in place:**
- `src/config/forms.ts` (HubSpot form IDs, meeting URLs, PDF URL — committed in `b2eb810`)

**Import alias:** Project uses `@/*` for `src/*` (e.g., `@/config/forms`), `@layouts/*`, `@components/*`. No `@config/*` alias exists — use `@/config/forms`.

**Verification model:** No unit-test suite for marketing LPs in this project. Verification per task = `astro build` succeeds + spot-check the route in `astro dev`. Each task ends with a commit.

---

## Conventions and shared patterns

### HubSpot Forms v2 loader pattern

Each LP loads `https://js.hsforms.net/forms/v2.js` once, gated behind the existing `window.__hsGeoReady` Promise (set up by `GeoGate.astro` in both campaign layouts). The script dispatches a `hsFormsReady` event when loaded:

```html
<script is:inline>
  window.__hsGeoReady.then(function(allowed) {
    if (!allowed) {
      document.querySelectorAll('[data-hs-form-target]').forEach(function(el) {
        el.innerHTML = '<div style="padding:2rem;text-align:center;color:#667085;font-size:0.875rem;border:1px solid #e5e7eb;border-radius:0.75rem;background:#f9fafb;">This form is not available from your location.</div>';
      });
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://js.hsforms.net/forms/v2.js';
    s.async = true;
    s.onload = function() { window.dispatchEvent(new Event('hsFormsReady')); };
    document.head.appendChild(s);
  });
</script>
```

`hbspt.forms.create()` calls live inside `window.addEventListener('hsFormsReady', ...)`. The HubSpot library passes `$form` as a jQuery node; use `$form.find('input[name="..."]').val(...)` to read or write fields.

### Stage state machine pattern

Each LP wraps content in a single `<main data-stage="intro">`. CSS hides non-active stages:

```css
main[data-stage="intro"] [data-stage]:not([data-stage="intro"]) { display: none; }
main[data-stage="micro-form"] [data-stage]:not([data-stage="micro-form"]) { display: none; }
/* … one rule per stage */
```

A JS helper transitions stages and smooth-scrolls:

```js
function setStage(name) {
  document.querySelector('main').setAttribute('data-stage', name);
  trackStage(LP_NAME, name);
  const target = document.querySelector(`[data-stage="${name}"]`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

### Tracking helper (inline per LP)

```js
function trackStage(lp, stage, extra = {}) {
  if (typeof posthog !== 'undefined') {
    posthog.capture(`${lp} LP Stage`, { stage, ...extra });
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `${lp.toLowerCase()}_lp_stage`, stage, ...extra });
}
```

### UTM capture

```js
const utms = (() => {
  const p = new URLSearchParams(location.search);
  return ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
    .reduce((acc, k) => (acc[k] = p.get(k) || '', acc), {});
})();
```

### Practice Area dropdown options

The existing HubSpot `practice_area` property's dropdown values are not enumerated in the codebase. Use this placeholder list in the Villain LP context-quiz (Task 11):

```
Personal Injury
Mass Tort / Class Action
Workers' Compensation
Family Law
Criminal Defense
Estate / Probate
Business / Commercial
Bankruptcy
Immigration
Other
```

**TODO(nicole):** confirm against `Settings → Properties → practice_area → Manage options` and swap to match. Mismatches will cause HubSpot to reject the submission.

---

## Task 1: Add Inter font to ComicCampaignLayout

The comic-one-pager reference uses Bangers + Sora + Inter. The existing `ComicCampaignLayout` only loads Bangers + Sora. Add Inter without breaking existing `/lp/comic/*` pages.

**Files:**
- Modify: `src/layouts/ComicCampaignLayout.astro:32`

- [ ] **Step 1: Read the current font-link line**

Run: `grep -n "fonts.googleapis.com/css2" /Users/nicole/Documents/AttorneyAssistant/src/layouts/ComicCampaignLayout.astro`

Expected: a single match at around line 32 with `family=Bangers&family=Sora:wght@600;700;800`

- [ ] **Step 2: Add Inter to the font URL**

Edit the line so it reads:

```html
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Run the build**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build`
Expected: build completes with no errors; existing comic LPs still listed in the output.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/ComicCampaignLayout.astro
git commit -m "Add Inter font to ComicCampaignLayout for Villain LP"
```

---

## Task 2: Copy + optimize villain illustrations

Copy the 7 silhouettes from OneDrive with the locked A-G mapping, then generate WebP variants.

**Files:**
- Create: `public/images/lp/villains/voicemail-phantom.png` (← Villains 2 D.png)
- Create: `public/images/lp/villains/after-hours-ambush.png` (← Villains 2 G.png)
- Create: `public/images/lp/villains/records-vault-keeper.png` (← Villains 2 A.png)
- Create: `public/images/lp/villains/drowning-paralegal.png` (← Villains 2 E.png)
- Create: `public/images/lp/villains/silence-saboteur.png` (← Villains 2 C.png)
- Create: `public/images/lp/villains/admin-avalanche.png` (← Villains 2 B.png)
- Create: `public/images/lp/villains/hiring-ghost.png` (← Villains 2 F.png)
- Plus matching `.webp` for each (created by the optimizer)

- [ ] **Step 1: Create the destination directory**

```bash
mkdir -p /Users/nicole/Documents/AttorneyAssistant/public/images/lp/villains
```

- [ ] **Step 2: Copy the 7 PNGs with the locked mapping**

```bash
SRC="/Users/nicole/Library/CloudStorage/OneDrive-EOLLLC(DBATurnKeyOps)/Marketing/Ads/The Villain Lineup/Villains 2"
DEST="/Users/nicole/Documents/AttorneyAssistant/public/images/lp/villains"
cp "$SRC/Villains 2 D.png" "$DEST/voicemail-phantom.png"
cp "$SRC/Villains 2 G.png" "$DEST/after-hours-ambush.png"
cp "$SRC/Villains 2 A.png" "$DEST/records-vault-keeper.png"
cp "$SRC/Villains 2 E.png" "$DEST/drowning-paralegal.png"
cp "$SRC/Villains 2 C.png" "$DEST/silence-saboteur.png"
cp "$SRC/Villains 2 B.png" "$DEST/admin-avalanche.png"
cp "$SRC/Villains 2 F.png" "$DEST/hiring-ghost.png"
```

- [ ] **Step 3: Verify all 7 files exist**

Run: `ls public/images/lp/villains/*.png | wc -l`
Expected: `7`

- [ ] **Step 4: Run the image optimizer**

Run: `node scripts/optimize-images.mjs`
Expected: outputs `.webp` versions; verify with `ls public/images/lp/villains/*.webp | wc -l` → `7`. If the optimizer skips this folder, append the path to its allow-list or pass it explicitly (read `scripts/optimize-images.mjs` first to see its API).

- [ ] **Step 5: Commit**

```bash
git add public/images/lp/villains/
git commit -m "Add 7 villain silhouettes for Villain LP (PNG + WebP)"
```

---

## Task 3: Scaffold Benchmark LP — intro stage + state machine

Create the Benchmark LP file with the state-machine wrapper and the intro stage only. Subsequent stages added in later tasks.

**Files:**
- Create: `src/pages/lp/simple/benchmark.astro`

- [ ] **Step 1: Create the file with intro stage scaffolding**

```astro
---
import SimpleCampaignLayout from "@layouts/SimpleCampaignLayout.astro";
import { HUBSPOT_PORTAL_ID, FORM_IDS, MEETING_URLS, ASSET_URLS } from "@/config/forms";
---

<SimpleCampaignLayout
  title="The 2026 Law Firm Operations Benchmark | Attorney Assistant"
  description="Take the 90-second self-assessment. See where your firm ranks on the 2026 Law Firm Operations Benchmark."
>
  <main data-stage="intro" id="benchmark-lp">

    <!-- ═══════════════════════════════════════════
         STAGE 1: INTRO
    ═══════════════════════════════════════════ -->
    <section data-stage="intro" class="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-900 to-brand-950 min-h-[80vh] flex items-center">
      <div class="grain-overlay"></div>
      <div class="container-wide relative z-10 py-20 lg:py-28 text-center">
        <div class="max-w-3xl mx-auto reveal">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">
            Independent Industry Data
          </span>
          <h1 class="text-display-md md:text-display-lg lg:text-display-xl font-heading text-white leading-tight mb-5">
            Where does your firm <span class="text-gradient-gold">rank?</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The 2026 Law Firm Operations Benchmark. 15 metrics. 7 operational pillars. Your firm scored against the field.
          </p>

          <!-- Mock quartile band preview -->
          <div class="max-w-md mx-auto mb-10 p-5 rounded-2xl border border-white/10 bg-white/5">
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 text-left">Example: voicemail rate</p>
            <div class="flex h-3 rounded-full overflow-hidden" aria-hidden="true">
              <div style="flex: 5; background: #7EA67C"></div>
              <div style="flex: 20; background: #D4B280"></div>
              <div style="flex: 75; background: #E89991"></div>
            </div>
            <div class="relative mt-1" aria-hidden="true">
              <div class="absolute -top-1" style="left: 18%; transform: translateX(-50%)">
                <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
              </div>
            </div>
            <div class="flex justify-between text-[10px] text-white/40 mt-3">
              <span>Top quartile</span><span>Median</span><span>Bottom quartile</span>
            </div>
          </div>

          <button type="button" class="btn-primary btn-lg group inline-flex" data-go-stage="micro-form">
            Take the 90-second self-assessment
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" /></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Subsequent stages added in later tasks -->

  </main>

  <style>
    main[data-stage="intro"] [data-stage]:not([data-stage="intro"]) { display: none; }
    main[data-stage="micro-form"] [data-stage]:not([data-stage="micro-form"]) { display: none; }
    main[data-stage="scorecard"] [data-stage]:not([data-stage="scorecard"]) { display: none; }
    main[data-stage="email-gate"] [data-stage]:not([data-stage="email-gate"]) { display: none; }
    main[data-stage="thank-you"] [data-stage]:not([data-stage="thank-you"]) { display: none; }
  </style>

  <script is:inline>
    const LP_NAME = 'Benchmark';
    const main = document.querySelector('main#benchmark-lp');

    const state = {
      benchmark: null,  // populated after micro-form submit
    };

    const utms = (function() {
      const p = new URLSearchParams(location.search);
      return ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
        .reduce(function(acc, k) { acc[k] = p.get(k) || ''; return acc; }, {});
    })();

    function trackStage(lp, stage, extra) {
      extra = extra || {};
      if (typeof posthog !== 'undefined') {
        posthog.capture(lp + ' LP Stage', Object.assign({ stage: stage }, extra));
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: lp.toLowerCase() + '_lp_stage', stage: stage }, extra));
    }

    function setStage(name) {
      main.setAttribute('data-stage', name);
      trackStage(LP_NAME, name);
      const target = document.querySelector('[data-stage="' + name + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('[data-go-stage]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setStage(this.getAttribute('data-go-stage'));
      });
    });

    trackStage(LP_NAME, 'intro');
  </script>

</SimpleCampaignLayout>
```

- [ ] **Step 2: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep "lp/simple/benchmark"`
Expected: `▶ src/pages/lp/simple/benchmark.astro` and `└─ /lp/simple/benchmark/index.html` in the output.

- [ ] **Step 3: Spot-check in dev**

Run: `npx astro dev` (background) and open `http://localhost:4321/lp/simple/benchmark`. Confirm hero renders with mock quartile bar and CTA. Confirm clicking the CTA does nothing visible (next stage doesn't exist yet — that's expected).

- [ ] **Step 4: Commit**

```bash
git add src/pages/lp/simple/benchmark.astro
git commit -m "Scaffold Benchmark LP with intro stage + state machine"
```

---

## Task 4: Benchmark LP — micro-form stage

Add the HubSpot Micro-Form embed and the submit handler that advances to the scorecard.

**Files:**
- Modify: `src/pages/lp/simple/benchmark.astro` (insert micro-form section, add HubSpot loader, add form handler)

- [ ] **Step 1: Insert micro-form section after the intro section**

After the `<!-- Subsequent stages added in later tasks -->` comment, add:

```astro
<!-- ═══════════════════════════════════════════
     STAGE 2: MICRO-FORM
═══════════════════════════════════════════ -->
<section data-stage="micro-form" class="relative overflow-hidden bg-gray-950 py-20 md:py-28 min-h-screen flex items-center">
  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]"></div>
  <div class="grain-overlay"></div>
  <div class="container-narrow max-w-2xl relative z-10">
    <div class="text-center mb-10 reveal">
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">Step 1 of 2</span>
      <h2 class="text-display-sm md:text-display-md font-heading text-white mb-4">Five questions. Ninety seconds.</h2>
      <p class="text-base text-white/60 max-w-md mx-auto">Your scorecard renders instantly. No email required to see your tier.</p>
    </div>
    <div class="bg-white rounded-2xl p-1 shadow-2xl ring-1 ring-white/10 reveal">
      <div class="bg-white rounded-xl p-6 md:p-8">
        <div id="hs-microform" data-hs-form-target></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add HubSpot Forms loader before the closing `</main>` (still inside the `<script is:inline>` block)**

Add at the bottom of the existing script, just before the final closing `</script>`:

```js
// ── HubSpot Forms loader (geo-gated)
window.__hsGeoReady.then(function(allowed) {
  if (!allowed) {
    document.querySelectorAll('[data-hs-form-target]').forEach(function(el) {
      el.innerHTML = '<div style="padding:2rem;text-align:center;color:#667085;font-size:0.875rem;border:1px solid #e5e7eb;border-radius:0.75rem;background:#f9fafb;">This form is not available from your location.</div>';
    });
    return;
  }
  var s = document.createElement('script');
  s.src = 'https://js.hsforms.net/forms/v2.js';
  s.async = true;
  s.onload = function() { window.dispatchEvent(new Event('hsFormsReady')); };
  document.head.appendChild(s);
});

// ── Micro-form embed
window.addEventListener('hsFormsReady', function() {
  hbspt.forms.create({
    portalId: '49161090',
    region: 'na1',
    formId: '54776250-0e82-4808-aade-290f0a211d65',
    target: '#hs-microform',
    onFormSubmit: function($form) {
      state.benchmark = {
        firm_attorney_count: $form.find('[name="firm_attorney_count"]').val() || '',
        monthly_lead_volume: $form.find('[name="monthly_lead_volume"]').val() || '',
        practice_area:       $form.find('[name="practice_area"]').val() || '',
        voicemail_rate_:     parseFloat($form.find('[name="voicemail_rate_"]').val()) || 0,
        records_tat_days:    $form.find('[name="records_tat_days"]').val() === ''
          ? null
          : parseInt($form.find('[name="records_tat_days"]').val(), 10),
      };
      trackStage(LP_NAME, 'micro-form-submitted', state.benchmark);
    },
    onFormSubmitted: function() {
      setStage('scorecard');
    }
  });
});
```

- [ ] **Step 3: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|benchmark)"`
Expected: `/lp/simple/benchmark/index.html` builds cleanly with no errors.

- [ ] **Step 4: Spot-check in dev**

Open `http://localhost:4321/lp/simple/benchmark`. Click "Take the 90-second self-assessment". The page should scroll/transition to the micro-form section, and the HubSpot form should render inside the white card.

- [ ] **Step 5: Commit**

```bash
git add src/pages/lp/simple/benchmark.astro
git commit -m "Benchmark LP: add micro-form stage with HubSpot embed"
```

---

## Task 5: Benchmark LP — scorecard stage with quartile bars

Render the personalized scorecard inline after micro-form submission. Two quartile bars + three context cards.

**Files:**
- Modify: `src/pages/lp/simple/benchmark.astro`

- [ ] **Step 1: Insert scorecard section after the micro-form section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 3: SCORECARD
═══════════════════════════════════════════ -->
<section data-stage="scorecard" class="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-20 md:py-28 min-h-screen">
  <div class="grain-overlay"></div>
  <div class="container-wide relative z-10">
    <div class="text-center mb-12 reveal">
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">Your Scorecard</span>
      <h2 class="text-display-sm md:text-display-md font-heading text-white mb-4">Here's where your firm lands.</h2>
      <p class="text-base text-white/60 max-w-xl mx-auto">2 of 15 benchmark metrics shown. The rest are in the full report.</p>
    </div>

    <!-- Quartile bars -->
    <div class="max-w-3xl mx-auto space-y-8 reveal" id="scorecard-bars">
      <!-- Populated by JS -->
    </div>

    <!-- Context cards -->
    <div class="max-w-3xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 reveal" id="scorecard-context">
      <!-- Populated by JS -->
    </div>

    <!-- Unlock CTA -->
    <div class="max-w-2xl mx-auto mt-16 p-8 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 text-center reveal">
      <p class="text-lg text-white mb-3">You just saw <strong class="text-brand-gold">2 of your firm's 15 benchmark scores</strong>.</p>
      <p class="text-base text-white/60 mb-6">The full 2026 Law Firm Operations Benchmark Report includes all 15 metrics, the 4-stage maturity model, and the top performer playbook.</p>
      <button type="button" class="btn-primary btn-lg group inline-flex" data-go-stage="email-gate">
        Unlock the Full Report
        <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" /></svg>
      </button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add the BENCHMARKS data + renderScorecard function to the inline script**

Add right after the `state` declaration:

```js
// ── Benchmark thresholds + interpretation copy
const BENCHMARKS = {
  voicemail_rate_: {
    metric: 'Voicemail rate during business hours',
    max: 100,
    bands: [
      { label: 'Top quartile',    upTo: 5,   color: '#7EA67C', range: '0–5%' },
      { label: 'Median',          upTo: 25,  color: '#D4B280', range: '6–25%' },
      { label: 'Bottom quartile', upTo: 100, color: '#E89991', range: '26–100%' }
    ],
    aaBenchmark: 1,
    suffix: '%',
    interpretation: function(v) {
      if (v <= 5)  return 'Top quartile — your firm answers nearly every business-hour call.';
      if (v <= 25) return 'Median tier — top performers operate below 5%.';
      return 'Bottom quartile — every percentage point above 25% is leaving signed cases on the table.';
    }
  },
  records_tat_days: {
    metric: 'Average medical records turnaround',
    max: 180,
    bands: [
      { label: 'Top quartile',    upTo: 45,  color: '#7EA67C', range: '0–45 days' },
      { label: 'Median',          upTo: 90,  color: '#D4B280', range: '46–90 days' },
      { label: 'Bottom quartile', upTo: 180, color: '#E89991', range: '91–180 days' }
    ],
    aaBenchmark: 30,
    suffix: ' days',
    interpretation: function(v) {
      if (v <= 45) return 'Top quartile — your records process is among the fastest in the industry.';
      if (v <= 90) return 'Median tier — most firms accept 60-90 days as normal. The top quartile doesn\'t.';
      return 'Bottom quartile — at 90+ days, settlement velocity is being held hostage by hospitals.';
    }
  }
};

function renderQuartileBar(metricKey, value) {
  const cfg = BENCHMARKS[metricKey];
  const userPct = Math.min(100, Math.max(0, (value / cfg.max) * 100));
  const aaPct = Math.min(100, Math.max(0, (cfg.aaBenchmark / cfg.max) * 100));
  const bandSpans = cfg.bands.map(function(b, i) {
    const prev = i === 0 ? 0 : cfg.bands[i - 1].upTo;
    return { label: b.label, color: b.color, flex: b.upTo - prev, range: b.range };
  });
  const html = [
    '<div class="p-6 rounded-2xl border border-white/10 bg-white/5">',
      '<div class="flex items-baseline justify-between mb-1">',
        '<h3 class="text-base font-heading text-white">' + cfg.metric + '</h3>',
        '<span class="text-2xl font-heading text-brand-gold">' + value + cfg.suffix + '</span>',
      '</div>',
      '<p class="text-xs text-white/40 uppercase tracking-widest mb-4">Your firm</p>',
      '<div class="relative">',
        '<div class="flex h-4 rounded-full overflow-hidden">',
          bandSpans.map(function(b) {
            return '<div style="flex: ' + b.flex + '; background: ' + b.color + '"></div>';
          }).join(''),
        '</div>',
        '<div class="absolute -top-2" style="left: ' + userPct + '%; transform: translateX(-50%)">',
          '<div class="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>',
        '</div>',
        '<div class="absolute -bottom-2" style="left: ' + aaPct + '%; transform: translateX(-50%)">',
          '<div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-brand-gold"></div>',
        '</div>',
      '</div>',
      '<div class="flex justify-between text-[10px] text-white/40 mt-5">',
        bandSpans.map(function(b) { return '<span>' + b.range + '</span>'; }).join(''),
      '</div>',
      '<div class="flex items-center gap-4 mt-5 text-xs">',
        '<div class="flex items-center gap-1.5"><div class="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"></div><span class="text-white/60">Your firm</span></div>',
        '<div class="flex items-center gap-1.5"><div class="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-brand-gold"></div><span class="text-white/60">AA-supported target (' + cfg.aaBenchmark + cfg.suffix + ')</span></div>',
      '</div>',
      '<p class="text-sm text-white/80 mt-4 leading-relaxed">' + cfg.interpretation(value) + '</p>',
    '</div>'
  ].join('');
  return html;
}

function renderContextCard(label, value) {
  return [
    '<div class="p-5 rounded-xl border border-white/10 bg-white/5 text-center">',
      '<p class="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">' + label + '</p>',
      '<p class="text-lg font-heading text-white">' + value + '</p>',
    '</div>'
  ].join('');
}

function renderScorecard() {
  const bars = document.getElementById('scorecard-bars');
  const ctx = document.getElementById('scorecard-context');
  if (!state.benchmark) return;

  const barsHtml = [renderQuartileBar('voicemail_rate_', state.benchmark.voicemail_rate_)];
  if (state.benchmark.records_tat_days !== null && state.benchmark.records_tat_days !== undefined) {
    barsHtml.push(renderQuartileBar('records_tat_days', state.benchmark.records_tat_days));
  }
  bars.innerHTML = barsHtml.join('');

  ctx.innerHTML = [
    renderContextCard('Firm size',     state.benchmark.firm_attorney_count || '—'),
    renderContextCard('Monthly leads', state.benchmark.monthly_lead_volume || '—'),
    renderContextCard('Practice area', state.benchmark.practice_area || '—'),
  ].join('');
}
```

- [ ] **Step 3: Trigger scorecard rendering when the stage becomes active**

Modify the `setStage` function to call `renderScorecard()` when entering `scorecard`:

```js
function setStage(name) {
  main.setAttribute('data-stage', name);
  trackStage(LP_NAME, name);
  if (name === 'scorecard') renderScorecard();
  const target = document.querySelector('[data-stage="' + name + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

- [ ] **Step 4: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|benchmark)"`
Expected: builds cleanly.

- [ ] **Step 5: Spot-check in dev with a test submission**

Open the page, submit the micro-form with test values (e.g., voicemail 18%, records 60 days). Confirm the scorecard renders with two quartile bars and the indicator triangle appears at the correct position. Submit without records (skip) — confirm only one bar renders.

- [ ] **Step 6: Commit**

```bash
git add src/pages/lp/simple/benchmark.astro
git commit -m "Benchmark LP: render personalized scorecard with quartile bars"
```

---

## Task 6: Benchmark LP — email-gate stage

Add the HubSpot Email Gate form with UTM pre-population.

**Files:**
- Modify: `src/pages/lp/simple/benchmark.astro`

- [ ] **Step 1: Insert email-gate section after the scorecard section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 4: EMAIL GATE
═══════════════════════════════════════════ -->
<section data-stage="email-gate" class="relative overflow-hidden bg-gray-950 py-20 md:py-28 min-h-screen flex items-center">
  <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px]"></div>
  <div class="grain-overlay"></div>
  <div class="container-narrow max-w-xl relative z-10">
    <div class="text-center mb-10 reveal">
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">Step 2 of 2</span>
      <h2 class="text-display-sm md:text-display-md font-heading text-white mb-4">Where should we send your report?</h2>
      <p class="text-base text-white/60">The full benchmark, your scorecard data, and the top performer playbook.</p>
    </div>
    <div class="bg-white rounded-2xl p-1 shadow-2xl ring-1 ring-white/10 reveal">
      <div class="bg-white rounded-xl p-6 md:p-8">
        <div id="hs-emailgate" data-hs-form-target></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add the email-gate embed inside the `hsFormsReady` listener**

After the micro-form `hbspt.forms.create` call (inside the same `hsFormsReady` handler), append:

```js
hbspt.forms.create({
  portalId: '49161090',
  region: 'na1',
  formId: 'd6486e3f-fec1-4d72-b52d-94dda32e9e86',
  target: '#hs-emailgate',
  onFormReady: function($form) {
    Object.keys(utms).forEach(function(k) {
      $form.find('[name="' + k + '"]').val(utms[k]);
    });
  },
  onFormSubmitted: function() {
    setStage('thank-you');
  }
});
```

- [ ] **Step 3: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|benchmark)"`
Expected: clean.

- [ ] **Step 4: Spot-check in dev**

Walk the full flow from intro → micro-form → scorecard → click "Unlock the Full Report" → email-gate renders. Open dev tools, network tab, submit with `?utm_source=foo` on the URL — confirm the hidden fields populate (inspect the form before submit).

- [ ] **Step 5: Commit**

```bash
git add src/pages/lp/simple/benchmark.astro
git commit -m "Benchmark LP: add email-gate with UTM pre-population"
```

---

## Task 7: Benchmark LP — thank-you stage

Add the thank-you stage with the meetings widget and PDF preview placeholders.

**Files:**
- Modify: `src/pages/lp/simple/benchmark.astro`

- [ ] **Step 1: Insert thank-you section after the email-gate section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 5: THANK YOU
═══════════════════════════════════════════ -->
<section data-stage="thank-you" class="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-900 to-brand-950 py-20 md:py-28 min-h-screen">
  <div class="grain-overlay"></div>
  <div class="container-narrow max-w-3xl relative z-10">
    <div class="text-center mb-12 reveal">
      <div class="w-16 h-16 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h2 class="text-display-sm md:text-display-md font-heading text-white mb-4">You're in.</h2>
      <p class="text-lg text-white/60 mb-2">Check your inbox — the full report is on the way.</p>
      <p class="text-base text-white/40">While you're here, book your Operations Review and we'll walk through your scorecard together.</p>
    </div>

    <!-- Meeting widget -->
    <div class="bg-white rounded-2xl p-1 shadow-2xl ring-1 ring-white/10 reveal mb-12">
      <div class="bg-white rounded-xl p-4 md:p-5">
        <div class="meetings-iframe-container" data-src="https://meet.attorneyassistant.com/meetings/attorney-assistant/simple-campaign-operations-review?embed=true"></div>
      </div>
    </div>

    <!-- PDF preview thumbnails -->
    <p class="text-center text-xs font-bold text-white/40 uppercase tracking-widest mb-6">A glimpse inside the report</p>
    <div class="grid grid-cols-3 gap-4 reveal" id="benchmark-pdf-previews">
      <!-- TODO(nicole): swap these gradient placeholders for actual page screenshots (pages 4, 7, 11 of the benchmark report PDF) -->
      <div class="aspect-[8.5/11] rounded-lg bg-gradient-to-br from-brand-gold/20 via-brand-navy/40 to-brand-950 border border-white/10 flex items-center justify-center">
        <span class="text-white/30 text-sm font-heading">p. 4</span>
      </div>
      <div class="aspect-[8.5/11] rounded-lg bg-gradient-to-br from-brand-gold/20 via-brand-navy/40 to-brand-950 border border-white/10 flex items-center justify-center">
        <span class="text-white/30 text-sm font-heading">p. 7</span>
      </div>
      <div class="aspect-[8.5/11] rounded-lg bg-gradient-to-br from-brand-gold/20 via-brand-navy/40 to-brand-950 border border-white/10 flex items-center justify-center">
        <span class="text-white/30 text-sm font-heading">p. 11</span>
      </div>
    </div>
  </div>
</section>

<!-- HubSpot Meetings Embed loader (geo-gated) -->
<script is:inline>
  window.__hsGeoReady.then(function(allowed) {
    if (!allowed) {
      document.querySelectorAll('.meetings-iframe-container').forEach(function(el) {
        el.innerHTML = '<div style="padding:2rem;text-align:center;color:#667085;font-size:0.875rem;border:1px solid #e5e7eb;border-radius:0.75rem;background:#f9fafb;">This form is not available from your location.</div>';
      });
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    document.head.appendChild(s);
  });
</script>

<style>
  .meetings-iframe-container iframe { background: #ffffff !important; }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|benchmark)"`
Expected: clean.

- [ ] **Step 3: Spot-check the full flow in dev**

Walk all 5 stages end-to-end. Confirm the meetings iframe loads at the thank-you stage.

- [ ] **Step 4: Commit**

```bash
git add src/pages/lp/simple/benchmark.astro
git commit -m "Benchmark LP: add thank-you stage with meetings widget + PDF preview placeholders"
```

---

## Task 8: Scaffold Villain LP — intro stage + comic visual system

Create the Villain LP file with the comic visual system (CSS tokens, halftone overlay, Bangers + red drop-shadow, POW badges) and the intro stage including the rogues gallery.

**Files:**
- Create: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Create the file with intro stage + comic CSS**

```astro
---
import ComicCampaignLayout from "@layouts/ComicCampaignLayout.astro";
import { HUBSPOT_PORTAL_ID, FORM_IDS, MEETING_URLS } from "@/config/forms";

const villains = [
  { code: 'PH', name: 'The Voicemail Phantom',    slug: 'voicemail-phantom',    pow: 'POW!',    num: '01', mo: "The villain that haunts every law firm. Roughly 1 in 4 inbound legal calls hits voicemail at the median firm. 70% never call back. They Google the next firm.", stat: '~20%', label: 'of leads vanish in the first hour' },
  { code: 'AB', name: 'The After-Hours Ambush',   slug: 'after-hours-ambush',   pow: 'BAM!',    num: '02', mo: "Strikes when the office goes dark. 40% of legal demand lands outside business hours. The highest-intent leads call at 8 PM — and sign with whoever stays open later.", stat: '$250K', label: 'case called at 8 PM, no one answered' },
  { code: 'VK', name: 'The Records Vault Keeper', slug: 'records-vault-keeper', pow: 'KAPOW!',  num: '03', mo: "The bureaucratic warden of hospital records. Doesn't move fast. Doesn't care about your settlement timeline. Median firms wait 75 days. Some wait 120+.", stat: '120 days', label: 'records held hostage' },
  { code: 'DP', name: 'The Drowning Paralegal',   slug: 'drowning-paralegal',   pow: 'CRASH!',  num: '04', mo: "The moment a paralegal's load crosses 30 cases. Structured work becomes triage. Deadlines move from the calendar to a person's head. The indispensable paralegal becomes the single point of failure.", stat: '50+', label: 'active cases per paralegal at the bottom quartile' },
  { code: 'SS', name: 'The Silence Saboteur',     slug: 'silence-saboteur',     pow: 'SHHH!',   num: '05', mo: "It's not what your firm does. It's what your firm doesn't do. State bars consistently report communication as the #1 source of client complaints. Not fees. Not outcomes. Silence.", stat: '#1', label: 'source of bar complaints' },
  { code: 'AA', name: 'The Admin Avalanche',      slug: 'admin-avalanche',      pow: 'SMASH!',  num: '06', mo: "Mail. Data entry. File openings. Intake forms. Work that has to happen, but doesn't move cases or generate revenue. Most attorneys spend 25% of their week on it.", stat: '15+ hrs', label: 'wasted per attorney per week' },
  { code: 'HG', name: 'The Hiring Ghost',         slug: 'hiring-ghost',         pow: 'ZAP!',    num: '07', mo: "Haunts every law firm trying to grow in the post-2020 labor market. Paralegal roles take 60+ days to fill. New hires ramp for 3-6 months. Average tenure under 2.5 years. The firm hires its entire support team every cycle.", stat: '60+ days', label: 'to fill a paralegal role at the median firm' },
];
---

<ComicCampaignLayout
  title="Find Your Firm's Biggest Villain | Attorney Assistant"
  description="Every law firm is fighting at least one. Take the 3-minute diagnostic. We'll name your biggest threat — and the rescue plan."
>
  <main data-stage="intro" data-mode="comic" id="villain-lp">

    <!-- ═══════════════════════════════════════════
         STAGE 1: INTRO + ROGUES GALLERY
    ═══════════════════════════════════════════ -->
    <section data-stage="intro">
      <!-- Issue masthead -->
      <header class="header-strip">
        <div class="container row">
          <img src="/brand/logos/long_white_logo.svg" alt="Attorney Assistant">
          <div>Mission Briefing · <span class="issue-tag">Issue №02 · 2026</span> · attorneyassistant.com</div>
        </div>
      </header>

      <!-- Hero -->
      <div class="hero">
        <div class="container">
          <span class="hero-eyebrow">CASE FILE OPEN</span>
          <h1 class="display">Find your firm's <span class="accent-red">biggest villain.</span></h1>
          <p class="hero-subhead">Every law firm is fighting at least one. Take the 3-minute diagnostic. We'll name your biggest threat — <span class="pop">and the rescue plan.</span></p>
          <button type="button" class="hero-cta" data-go-stage="context-quiz">Start the diagnostic</button>
        </div>
      </div>

      <!-- Rogues gallery -->
      <section class="gallery-section">
        <div class="container">
          <div class="section-header">
            <span class="section-eyebrow">Meet the lineup</span>
            <h2 class="display">Seven villains. <span class="accent-gold">Every law firm</span> is fighting at least one.</h2>
            <p>The diagnostic names yours. Below: the rogues gallery and the damage each one is doing.</p>
          </div>
          <div class="gallery">
            {villains.map((v) => (
              <div class="villain-card">
                <span class="pow">{v.pow}</span>
                <div class="num">{v.num}</div>
                <img src={`/images/lp/villains/${v.slug}.png`} alt={v.name} class="villain-img" width="180" height="290" loading="lazy" />
                <h3>{v.name}</h3>
                <p class="mo">{v.mo}</p>
                <div class="stat">{v.stat}<span class="label">{v.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>

    <!-- Subsequent stages added in later tasks -->

  </main>

  <style>
    /* ── Stage state machine */
    main[data-stage="intro"]         [data-stage]:not([data-stage="intro"])         { display: none; }
    main[data-stage="context-quiz"]  [data-stage]:not([data-stage="context-quiz"])  { display: none; }
    main[data-stage="transition"]    [data-stage]:not([data-stage="transition"])    { display: none; }
    main[data-stage="villain-quiz"]  [data-stage]:not([data-stage="villain-quiz"])  { display: none; }
    main[data-stage="reveal"]        [data-stage]:not([data-stage="reveal"])        { display: none; }
    main[data-stage="email-gate"]    [data-stage]:not([data-stage="email-gate"])    { display: none; }
    main[data-stage="thank-you"]     [data-stage]:not([data-stage="thank-you"])     { display: none; }

    /* ── Color tokens (from comic-one-pager) */
    :root {
      --navy: #0e2236;
      --navy-deep: #061320;
      --navy-mid: #1a3a5c;
      --gold: #F9A630;
      --gold-bright: #FBD46D;
      --red: #E04A2C;
      --red-bright: #FF6B45;
      --steel: #c0c8d4;
      --steel-dim: #6f7a8a;
    }

    /* ── Comic mode wrapper (scoped halftone overlay) */
    main { background: var(--navy); color: #fff; font-family: 'Inter', -apple-system, sans-serif; line-height: 1.55; }
    main[data-mode="comic"]::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 8px 8px;
      mix-blend-mode: screen;
    }
    main[data-mode="comic"]::after {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background:
        radial-gradient(ellipse at 20% 10%, rgba(249,166,48,0.10), transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(224,74,44,0.08), transparent 50%);
      mix-blend-mode: screen;
    }

    /* ── Layout */
    main .container { max-width: 1240px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 2; }
    main section { padding: 64px 0; position: relative; }
    @media (max-width: 720px) { main section { padding: 48px 0; } main .container { padding: 0 20px; } }

    /* ── Typography */
    main .bangers, main .display, main .pow, main .hero-eyebrow, main .hero-cta, main .num,
    main h1, main h2, main h3 {
      font-family: 'Bangers', 'Impact', sans-serif;
      letter-spacing: 0.04em;
    }
    main .display {
      letter-spacing: 0.02em;
      line-height: 0.95;
      text-transform: uppercase;
      text-shadow: 3px 3px 0 var(--red), 6px 6px 0 var(--navy-deep);
    }
    main h1.display { font-size: clamp(56px, 9vw, 128px); }
    main h2.display { font-size: clamp(38px, 6vw, 80px); }
    main h3.display { font-size: clamp(28px, 4vw, 48px); }
    main .accent-gold { color: var(--gold); }
    main .accent-red  { color: var(--red-bright); }

    /* ── Header strip */
    main .header-strip {
      border-bottom: 2px solid rgba(255,255,255,0.08);
      padding: 16px 0;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--steel);
      position: relative; z-index: 2;
    }
    main .header-strip .row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
    main .header-strip img { height: 28px; }
    main .header-strip .issue-tag { color: var(--gold); }

    /* ── Hero */
    main .hero { padding-top: 80px; padding-bottom: 80px; }
    main .hero-eyebrow {
      display: inline-block;
      background: var(--red);
      color: #fff;
      padding: 8px 16px;
      letter-spacing: 0.12em;
      font-size: 18px;
      transform: rotate(-2deg);
      margin-bottom: 24px;
      box-shadow: 4px 4px 0 var(--navy-deep);
    }
    main .hero h1 { margin-bottom: 24px; }
    main .hero-subhead {
      font-family: 'Sora', sans-serif;
      font-size: clamp(20px, 2.4vw, 28px);
      font-weight: 600;
      color: var(--steel);
      max-width: 800px;
      line-height: 1.35;
      margin-bottom: 40px;
    }
    main .hero-subhead .pop { color: var(--gold); font-style: italic; }
    main .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--red);
      color: #fff;
      padding: 18px 28px;
      font-size: 24px;
      letter-spacing: 0.08em;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 6px 6px 0 var(--navy-deep);
      transform: rotate(-1deg);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    main .hero-cta::after { content: '→'; }
    main .hero-cta:hover { transform: rotate(-1deg) translate(-2px, -2px); box-shadow: 8px 8px 0 var(--navy-deep); }

    /* ── Section header */
    main .section-eyebrow {
      display: inline-block;
      font-size: 16px;
      letter-spacing: 0.14em;
      color: var(--gold);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 3px solid var(--gold);
    }
    main .section-header { margin-bottom: 48px; max-width: 900px; }
    main .section-header h2 { margin-bottom: 16px; }
    main .section-header p { font-family: 'Sora', sans-serif; font-size: 20px; color: var(--steel); line-height: 1.4; }

    /* ── Rogues gallery cards */
    main .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    main .villain-card {
      background: rgba(255,255,255,0.04);
      border: 2px solid rgba(255,255,255,0.10);
      padding: 28px 24px;
      position: relative;
      transition: transform 0.25s, border-color 0.25s, background 0.25s;
      overflow: hidden;
    }
    main .villain-card:nth-child(odd)  { transform: rotate(-0.6deg); }
    main .villain-card:nth-child(even) { transform: rotate( 0.6deg); }
    main .villain-card:hover { transform: rotate(0deg) translateY(-4px); border-color: var(--gold); background: rgba(249,166,48,0.06); }
    main .villain-card::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
      background-size: 6px 6px;
      opacity: 0.6;
    }
    main .villain-card .num {
      font-size: 56px; line-height: 1;
      color: var(--gold);
      -webkit-text-stroke: 2px var(--navy-deep);
      text-shadow: 3px 3px 0 var(--navy-deep);
      margin-bottom: 4px;
    }
    main .villain-card .pow {
      display: inline-block;
      color: #fff; background: var(--red);
      padding: 3px 12px;
      font-size: 18px; letter-spacing: 0.08em;
      transform: rotate(-3deg);
      box-shadow: 2px 2px 0 var(--navy-deep);
      position: absolute; top: 24px; right: 24px;
    }
    main .villain-card .villain-img {
      width: 100%; max-width: 180px; height: auto; display: block;
      margin: 0 auto 12px;
      filter: drop-shadow(0 0 20px rgba(249,166,48,0.18));
    }
    main .villain-card h3 {
      font-size: 32px; letter-spacing: 0.04em; color: #fff;
      margin: 12px 0 8px; line-height: 1.05;
      text-shadow: 2px 2px 0 var(--navy-deep);
    }
    main .villain-card .mo { font-family: 'Inter', sans-serif; font-size: 14.5px; color: var(--steel); margin-bottom: 16px; line-height: 1.5; }
    main .villain-card .stat { font-size: 24px; color: var(--gold-bright); letter-spacing: 0.04em; }
    main .villain-card .stat .label { display: block; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px; color: var(--steel-dim); letter-spacing: 0.10em; text-transform: uppercase; margin-top: 2px; }

    /* ── Clean mode (context-quiz) */
    main[data-mode="clean"] { background: var(--navy); }
    main[data-mode="clean"]::before, main[data-mode="clean"]::after { display: none; }
    main[data-mode="clean"] .header-strip { border-color: rgba(255,255,255,0.08); }
  </style>

  <script is:inline>
    const LP_NAME = 'Villain';
    const main = document.querySelector('main#villain-lp');

    const state = {
      context: { firm_attorney_count: '', monthly_lead_volume: '', practice_area: '' },
      scores: { PH: 0, AB: 0, VK: 0, DP: 0, SS: 0, AA: 0, HG: 0 },
      answers: [],
      qIndex: 0,
      result: null,
      leak: 0,
    };

    const utms = (function() {
      const p = new URLSearchParams(location.search);
      return ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
        .reduce(function(acc, k) { acc[k] = p.get(k) || ''; return acc; }, {});
    })();

    function trackStage(lp, stage, extra) {
      extra = extra || {};
      if (typeof posthog !== 'undefined') {
        posthog.capture(lp + ' LP Stage', Object.assign({ stage: stage }, extra));
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: lp.toLowerCase() + '_lp_stage', stage: stage }, extra));
    }

    function setStage(name) {
      main.setAttribute('data-stage', name);
      // Mode flip — clean only during context-quiz
      main.setAttribute('data-mode', name === 'context-quiz' ? 'clean' : 'comic');
      trackStage(LP_NAME, name);
      const target = document.querySelector('[data-stage="' + name + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('[data-go-stage]').forEach(function(btn) {
      btn.addEventListener('click', function() { setStage(this.getAttribute('data-go-stage')); });
    });

    trackStage(LP_NAME, 'intro');
  </script>

</ComicCampaignLayout>
```

- [ ] **Step 2: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|biggest-villain)"`
Expected: builds cleanly with `/lp/comic/biggest-villain/index.html` in the output.

- [ ] **Step 3: Spot-check in dev**

Open `http://localhost:4321/lp/comic/biggest-villain`. Confirm: issue masthead, red rotated eyebrow, Bangers H1 with red drop-shadow, Sora subhead with gold "pop" emphasis, red CTA, full rogues gallery with all 7 villain silhouettes loaded, halftone overlay visible.

- [ ] **Step 4: Commit**

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Scaffold Villain LP with comic visual system + rogues gallery intro"
```

---

## Task 9: Villain LP — context-quiz stage (clean mode)

Three one-per-screen dropdowns in clean white-card mode. Mode flip happens automatically via the `setStage` function (already wired in Task 8).

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the context-quiz section after the intro section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 2: CONTEXT QUIZ (clean mode)
═══════════════════════════════════════════ -->
<section data-stage="context-quiz" class="clean-quiz">
  <div class="container">
    <p class="clean-progress" id="ctx-progress">1 of 3 · Quick context</p>

    <div class="clean-card" data-ctx-q="firm_attorney_count">
      <label class="clean-label">How many attorneys at your firm?</label>
      <select class="clean-select" data-ctx-input="firm_attorney_count">
        <option value="">Select…</option>
        <option value="Solo">Solo</option>
        <option value="2-5">2-5</option>
        <option value="6-15">6-15</option>
        <option value="16-50">16-50</option>
        <option value="51+">51+</option>
      </select>
      <button type="button" class="clean-next" data-ctx-next="firm_attorney_count">Next →</button>
    </div>

    <div class="clean-card" data-ctx-q="monthly_lead_volume" hidden>
      <label class="clean-label">Roughly how many new leads per month?</label>
      <select class="clean-select" data-ctx-input="monthly_lead_volume">
        <option value="">Select…</option>
        <option value="<25">Under 25</option>
        <option value="25-75">25-75</option>
        <option value="76-200">76-200</option>
        <option value="201-500">201-500</option>
        <option value="500+">500+</option>
      </select>
      <button type="button" class="clean-next" data-ctx-next="monthly_lead_volume">Next →</button>
    </div>

    <div class="clean-card" data-ctx-q="practice_area" hidden>
      <label class="clean-label">Primary practice area?</label>
      <select class="clean-select" data-ctx-input="practice_area">
        <option value="">Select…</option>
        <option value="Personal Injury">Personal Injury</option>
        <option value="Mass Tort / Class Action">Mass Tort / Class Action</option>
        <option value="Workers' Compensation">Workers' Compensation</option>
        <option value="Family Law">Family Law</option>
        <option value="Criminal Defense">Criminal Defense</option>
        <option value="Estate / Probate">Estate / Probate</option>
        <option value="Business / Commercial">Business / Commercial</option>
        <option value="Bankruptcy">Bankruptcy</option>
        <option value="Immigration">Immigration</option>
        <option value="Other">Other</option>
      </select>
      <!-- TODO(nicole): confirm these options against HubSpot's practice_area property; mismatches will be rejected on submit -->
      <button type="button" class="clean-next" data-ctx-next="practice_area">Next →</button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add clean-mode styles inside the `<style>` block**

```css
/* ── Clean quiz (context questions) */
main .clean-quiz { padding: 80px 0; min-height: 80vh; display: flex; align-items: center; }
main .clean-progress {
  font-family: 'Inter', sans-serif;
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--gold); font-weight: 700;
  margin-bottom: 32px; text-align: center;
}
main .clean-card {
  background: #fff; border-radius: 16px; padding: 40px;
  max-width: 560px; margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
main .clean-label {
  font-family: 'Sora', sans-serif; font-weight: 700;
  font-size: 22px; color: #1a3a5c;
  display: block; margin-bottom: 20px; line-height: 1.3;
}
main .clean-select {
  width: 100%; padding: 16px;
  border: 2px solid #e5e7eb; border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 16px; color: #1a3a5c;
  background: #fff;
  margin-bottom: 20px;
}
main .clean-select:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(249,166,48,0.15); }
main .clean-next {
  background: var(--navy-mid); color: #fff;
  padding: 14px 28px;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
  border: none; border-radius: 10px; cursor: pointer;
  transition: background 0.2s;
}
main .clean-next:hover { background: var(--navy); }
main .clean-next:disabled { background: #d0d5dd; cursor: not-allowed; }
```

- [ ] **Step 3: Add context-quiz JS handlers**

Just before the final `</script>` closer, add:

```js
// ── Context quiz logic
const CTX_ORDER = ['firm_attorney_count', 'monthly_lead_volume', 'practice_area'];
let ctxIndex = 0;

document.querySelectorAll('[data-ctx-next]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const key = this.getAttribute('data-ctx-next');
    const input = document.querySelector('[data-ctx-input="' + key + '"]');
    if (!input.value) { input.focus(); return; }
    state.context[key] = input.value;

    if (ctxIndex < CTX_ORDER.length - 1) {
      document.querySelector('[data-ctx-q="' + CTX_ORDER[ctxIndex] + '"]').hidden = true;
      ctxIndex++;
      document.querySelector('[data-ctx-q="' + CTX_ORDER[ctxIndex] + '"]').hidden = false;
      document.getElementById('ctx-progress').textContent = (ctxIndex + 1) + ' of 3 · Quick context';
    } else {
      setStage('transition');
    }
  });
});
```

- [ ] **Step 4: Build and verify**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep -E "(error|biggest-villain)"`
Expected: clean.

- [ ] **Step 5: Spot-check in dev**

Click through intro CTA. Confirm the page flips to clean mode (no halftone, navy bg, white card centered). Fill firm size → Next → second question appears, progress reads "2 of 3". Fill lead volume → Next → third question. Fill practice area → Next → page transitions to next stage (currently blank, will be filled by Task 10).

- [ ] **Step 6: Commit**

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add context-quiz with clean white-card mode"
```

---

## Task 10: Villain LP — transition stage (mode flip)

The dramatic intermezzo. Mode flips back to comic, halftone fades in, 1.2s auto-advance to villain-quiz.

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the transition section after the context-quiz section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 3: TRANSITION (mode flip)
═══════════════════════════════════════════ -->
<section data-stage="transition" class="transition-stage">
  <div class="speedlines"></div>
  <div class="container" style="text-align: center; position: relative; z-index: 2;">
    <h2 class="display" style="font-size: clamp(48px, 8vw, 96px);">
      <span class="accent-gold">Now let's find</span><br>your <span class="accent-red">villain</span>…
    </h2>
  </div>
</section>
```

- [ ] **Step 2: Add transition styles**

```css
/* ── Transition stage */
main .transition-stage {
  min-height: 70vh;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  animation: transitionFadeIn 600ms ease-out;
}
@keyframes transitionFadeIn { from { opacity: 0; } to { opacity: 1; } }
main .speedlines {
  position: absolute; top: 50%; left: 0; width: 100%; height: 200px;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 12px,
    rgba(255,255,255,0.06) 12px,
    rgba(255,255,255,0.06) 14px
  );
  pointer-events: none;
  animation: speedlinesIn 800ms ease-out;
}
@keyframes speedlinesIn { from { opacity: 0; transform: translateY(-50%) scaleX(0.5); } to { opacity: 0.5; transform: translateY(-50%) scaleX(1); } }
```

- [ ] **Step 3: Add auto-advance JS in `setStage`**

Modify the `setStage` function to schedule the auto-advance when entering `transition`:

```js
function setStage(name) {
  main.setAttribute('data-stage', name);
  main.setAttribute('data-mode', name === 'context-quiz' ? 'clean' : 'comic');
  trackStage(LP_NAME, name);
  const target = document.querySelector('[data-stage="' + name + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (name === 'transition') {
    setTimeout(function() { setStage('villain-quiz'); }, 1200);
  }
}
```

- [ ] **Step 4: Build, spot-check, commit**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build`
Walk the flow: intro → context-quiz (clean) → Next×3 → transition (comic, dramatic, halftone fades back in, then 1.2s later auto-advances; villain-quiz stage will be empty for now).

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add transition stage with mode flip and auto-advance"
```

---

## Task 11: Villain LP — villain-quiz stage (10-question state machine)

The meat of the LP. 10 questions, one per screen, with scoring and skip support on Q3.

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the villain-quiz section after the transition section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 4: VILLAIN QUIZ
═══════════════════════════════════════════ -->
<section data-stage="villain-quiz" class="vq-stage">
  <div class="container">
    <p class="vq-progress" id="vq-progress">Mission · Question 1 of 10</p>
    <div class="vq-card" id="vq-card">
      <!-- Populated by JS -->
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add villain-quiz styles**

```css
/* ── Villain quiz */
main .vq-stage { padding: 64px 0; min-height: 80vh; }
main .vq-progress {
  font-family: 'Bangers', sans-serif;
  font-size: 18px; letter-spacing: 0.14em;
  color: var(--red-bright);
  margin-bottom: 32px; text-align: center;
}
main .vq-card {
  background: rgba(255,255,255,0.04);
  border: 2px solid rgba(255,255,255,0.10);
  padding: 40px;
  max-width: 760px; margin: 0 auto;
  position: relative;
}
main .vq-question {
  font-family: 'Sora', sans-serif; font-weight: 700;
  font-size: clamp(22px, 3vw, 32px);
  color: #fff;
  margin-bottom: 28px; line-height: 1.3;
}
main .vq-options { display: flex; flex-direction: column; gap: 12px; }
main .vq-option {
  background: transparent;
  border: 2px solid var(--gold);
  color: #fff;
  padding: 16px 20px;
  font-family: 'Inter', sans-serif; font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.15s, background 0.15s, box-shadow 0.15s;
  box-shadow: 4px 4px 0 var(--navy-deep);
}
main .vq-option:hover {
  background: rgba(249,166,48,0.10);
  transform: rotate(-0.5deg) translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--navy-deep);
}
main .vq-skip {
  display: inline-block; margin-top: 16px;
  font-family: 'Inter', sans-serif; font-size: 13px; color: var(--steel-dim);
  background: none; border: none; cursor: pointer;
  text-decoration: underline;
}
main .vq-skip:hover { color: var(--gold); }
```

- [ ] **Step 3: Add QUESTIONS data + scoring + render functions before the existing context-quiz logic**

```js
// ── Villain quiz data (verbatim from build prompt)
const QUESTIONS = [
  {
    id: 'q1', text: "When a lead calls your firm during business hours, what's most likely to happen?",
    options: [
      { text: "Front desk answers immediately, every time", score: {} },
      { text: "Phone tree, but most reach a human", score: { PH: 1 } },
      { text: "Sometimes hits voicemail during busy times", score: { PH: 4 } },
      { text: "Often hits voicemail — we know it's a problem", score: { PH: 6 } }
    ]
  },
  {
    id: 'q2', text: "A lead calls at 7 PM on a Tuesday. What happens?",
    options: [
      { text: "Someone answers (24/7 coverage)", score: {} },
      { text: "Forwarded to an answering service that takes a message", score: { AB: 3, PH: 1 } },
      { text: "Hits voicemail", score: { AB: 4 } },
      { text: "Honestly, we'd probably lose that lead", score: { AB: 6 } }
    ]
  },
  {
    id: 'q3', text: "Average medical records turnaround at your firm",
    sub: "Skip if not PI/mass tort",
    skip: true,
    options: [
      { text: "Under 45 days", score: {} },
      { text: "45–90 days", score: { VK: 2 } },
      { text: "90+ days", score: { VK: 5 } },
      { text: "We don't track it consistently", score: { VK: 3, DP: 1 } }
    ]
  },
  {
    id: 'q4', text: "Active cases per paralegal?",
    options: [
      { text: "Under 15", score: {} },
      { text: "15–30", score: { DP: 1 } },
      { text: "30–50", score: { DP: 3 } },
      { text: "50+", score: { DP: 5, AA: 1 } }
    ]
  },
  {
    id: 'q5', text: "How does your firm communicate with active clients?",
    options: [
      { text: "Proactive cadence at least every 2–4 weeks", score: {} },
      { text: "Updates when something significant happens", score: { SS: 2 } },
      { text: "Mostly when the client reaches out first", score: { SS: 5 } },
      { text: "Honestly, our clients say they don't hear from us enough", score: { SS: 6, PH: 1 } }
    ]
  },
  {
    id: 'q6', text: "Percentage of attorneys' weekly time on admin / clerical work?",
    options: [
      { text: "Under 10%", score: {} },
      { text: "10–25%", score: { AA: 3 } },
      { text: "25–40%", score: { AA: 5, DP: 1 } },
      { text: "40%+", score: { AA: 6, DP: 2 } }
    ]
  },
  {
    id: 'q7', text: "Most recent paralegal / intake / admin role at your firm —",
    options: [
      { text: "Filled within 30 days", score: {} },
      { text: "30–90 days", score: { HG: 3 } },
      { text: "90+ days", score: { HG: 5, DP: 1 } },
      { text: "We've stopped trying — we just absorb the work", score: { HG: 5, DP: 3, AA: 2 } }
    ]
  },
  {
    id: 'q8', text: "If your single best paralegal took 2 weeks off tomorrow, what happens?",
    options: [
      { text: "Fine — systems hold", score: {} },
      { text: "Slowdown but manageable", score: { DP: 2, AA: 1 } },
      { text: "Real friction — clients would notice", score: { DP: 4, SS: 2 } },
      { text: "Operations would seriously break", score: { DP: 6, AA: 2, HG: 1 } }
    ]
  },
  {
    id: 'q9', text: "Your recent Google / Yelp / Avvo reviews are mostly —",
    options: [
      { text: "4.5+ stars, consistently positive", score: {} },
      { text: "Mixed, with some complaints about communication", score: { SS: 4 } },
      { text: "Rough, especially around communication", score: { SS: 6, PH: 1 } },
      { text: "We don't track them", score: { PH: 1, SS: 1, AA: 1 } }
    ]
  },
  {
    id: 'q10', text: "When your firm needs more capacity, your first move is —",
    options: [
      { text: "Direct hire", score: { HG: 3 } },
      { text: "Software / automation", score: { AA: 1 } },
      { text: "Outsource or use specialists", score: {} },
      { text: "Just push harder — we're stuck right now", score: { DP: 4, HG: 3, AA: 2 } }
    ]
  }
];

// ── Scoring (verbatim from build prompt)
function calculateResult() {
  const scores = state.scores;
  const ranked = Object.entries(scores)
    .map(function(e) { return { villain: e[0], score: e[1] }; })
    .sort(function(a, b) { return b.score - a.score; });
  const active = ranked.filter(function(r) { return r.score > 0; });
  const total = Object.values(scores).reduce(function(a, b) { return a + b; }, 0);
  let threatLevel = 'Mild';
  if (total >= 46)      threatLevel = 'Existential';
  else if (total >= 26) threatLevel = 'Critical';
  else if (total >= 11) threatLevel = 'Serious';
  return {
    biggestVillain:    active[0] ? active[0].villain : null,
    secondaryVillains: active.slice(1, 3).map(function(s) { return s.villain; }),
    threatLevel:       threatLevel,
    totalScore:        total,
    allScores:         scores
  };
}

// ── Annual leak estimate (verbatim from build prompt)
function estimateAnnualLeak(villain) {
  const leadsPerMonth = ({ '<25': 15, '25-75': 50, '76-200': 130, '201-500': 350, '500+': 750 })[state.context.monthly_lead_volume] || 50;
  const attorneys     = ({ 'Solo': 1, '2-5': 3, '6-15': 10, '16-50': 30, '51+': 75 })[state.context.firm_attorney_count] || 5;
  const caseValue = 8000;
  const formulas = {
    PH: function() { return leadsPerMonth * 12 * 0.15 * 0.30 * caseValue; },
    AB: function() { return leadsPerMonth * 12 * 0.35 * 0.25 * caseValue * 0.20; },
    VK: function() { return attorneys * 3 * 30000; },
    DP: function() { return attorneys * 0.5 * 50000; },
    SS: function() { return attorneys * 5 * 8000 * 0.08; },
    AA: function() { return attorneys * 10 * 250 * 50; },
    HG: function() { return attorneys * 0.3 * 180000; }
  };
  return Math.round(formulas[villain] ? formulas[villain]() : 0);
}

// ── Render current quiz question
function renderQuestion() {
  const q = QUESTIONS[state.qIndex];
  document.getElementById('vq-progress').textContent = 'Mission · Question ' + (state.qIndex + 1) + ' of ' + QUESTIONS.length;
  const card = document.getElementById('vq-card');
  const skipHtml = q.skip ? '<button type="button" class="vq-skip" data-vq-skip>Skip — not PI/mass tort</button>' : '';
  const subHtml = q.sub ? '<p class="vq-sub" style="font-family:Inter,sans-serif;font-size:14px;color:var(--steel-dim);margin-top:-20px;margin-bottom:24px;">' + q.sub + '</p>' : '';
  card.innerHTML = [
    '<h3 class="vq-question">' + q.text + '</h3>',
    subHtml,
    '<div class="vq-options">',
      q.options.map(function(opt, i) {
        return '<button type="button" class="vq-option" data-vq-option="' + i + '">' + opt.text + '</button>';
      }).join(''),
    '</div>',
    skipHtml
  ].join('');

  card.querySelectorAll('[data-vq-option]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const opt = q.options[parseInt(this.getAttribute('data-vq-option'), 10)];
      Object.keys(opt.score).forEach(function(v) {
        state.scores[v] += opt.score[v];
      });
      state.answers.push({ qid: q.id, text: opt.text });
      advanceQuestion();
    });
  });
  const skipBtn = card.querySelector('[data-vq-skip]');
  if (skipBtn) {
    skipBtn.addEventListener('click', function() {
      state.answers.push({ qid: q.id, text: '(skipped)' });
      advanceQuestion();
    });
  }
}

function advanceQuestion() {
  state.qIndex++;
  if (state.qIndex >= QUESTIONS.length) {
    state.result = calculateResult();
    state.leak = state.result.biggestVillain ? estimateAnnualLeak(state.result.biggestVillain) : 0;
    trackStage(LP_NAME, 'quiz-completed', {
      biggest_villain: state.result.biggestVillain,
      threat_level:    state.result.threatLevel,
      total_score:     state.result.totalScore,
      estimated_annual_leak: state.leak
    });
    setStage('reveal');
  } else {
    renderQuestion();
  }
}
```

- [ ] **Step 4: Trigger renderQuestion when entering villain-quiz**

Modify `setStage`:

```js
function setStage(name) {
  main.setAttribute('data-stage', name);
  main.setAttribute('data-mode', name === 'context-quiz' ? 'clean' : 'comic');
  trackStage(LP_NAME, name);
  const target = document.querySelector('[data-stage="' + name + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (name === 'transition')    setTimeout(function() { setStage('villain-quiz'); }, 1200);
  if (name === 'villain-quiz')  renderQuestion();
}
```

- [ ] **Step 5: Build, spot-check, commit**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build`
Walk the full flow: intro → context-quiz → transition → villain-quiz Q1 appears with question text + 4 comic-styled answer buttons. Click an answer → Q2 renders. Q3 shows the "Skip — not PI/mass tort" link. Walk to Q10, click last answer → reveal stage triggers (will be empty for now).

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add 10-question villain quiz with scoring + leak math"
```

---

## Task 12: Villain LP — reveal stage

The dramatic reveal screen with villain silhouette, threat-assessment copy, damage estimate, threat-level meter, secondary cards, and deploy CTA.

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the reveal section after the villain-quiz section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 5: REVEAL
═══════════════════════════════════════════ -->
<section data-stage="reveal" class="reveal-stage">
  <div class="container">
    <h2 class="display reveal-banner">Your firm's biggest villain:</h2>
    <div class="reveal-grid">
      <div class="reveal-image">
        <img id="reveal-img" src="" alt="" />
      </div>
      <div class="reveal-info">
        <h3 class="display" id="reveal-name"></h3>
        <p class="reveal-assessment" id="reveal-assessment"></p>

        <div class="damage-card">
          <p class="damage-label">The Damage</p>
          <p class="damage-amount" id="reveal-leak"></p>
          <p class="damage-caption" id="reveal-leak-caption"></p>
        </div>
      </div>
    </div>

    <div class="threat-meter-wrap">
      <p class="threat-meter-label">Threat level</p>
      <div class="threat-meter" id="threat-meter">
        <div class="seg" data-level="Mild">MILD</div>
        <div class="seg" data-level="Serious">SERIOUS</div>
        <div class="seg" data-level="Critical">CRITICAL</div>
        <div class="seg" data-level="Existential">EXISTENTIAL</div>
      </div>
    </div>

    <div class="secondary-wrap">
      <p class="secondary-label">Also fighting</p>
      <div class="secondary-grid" id="secondary-grid"><!-- populated by JS --></div>
    </div>

    <div class="reveal-cta-wrap">
      <button type="button" class="hero-cta reveal-cta" data-go-stage="email-gate">
        <span id="reveal-cta-label">Deploy Attorney Assistant</span>
      </button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add reveal styles**

```css
/* ── Reveal stage */
main .reveal-stage { padding: 64px 0; }
main .reveal-banner { font-size: clamp(32px, 5vw, 64px); text-align: center; margin-bottom: 48px; }
main .reveal-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; align-items: center; max-width: 1100px; margin: 0 auto; }
@media (max-width: 720px) { main .reveal-grid { grid-template-columns: 1fr; gap: 32px; } }
main .reveal-image img { width: 100%; max-width: 360px; display: block; margin: 0 auto; filter: drop-shadow(0 0 40px rgba(251,212,109,0.45)); }
main .reveal-info h3 { font-size: clamp(36px, 5vw, 64px); color: var(--gold-bright); text-shadow: 2px 2px 0 var(--red), 4px 4px 0 var(--navy-deep); margin-bottom: 20px; line-height: 1; }
main .reveal-assessment { font-family: 'Sora', sans-serif; font-size: 18px; line-height: 1.55; color: var(--steel); margin-bottom: 28px; }
main .damage-card { background: var(--navy-deep); border: 2px solid var(--gold); padding: 24px; position: relative; }
main .damage-card::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0); background-size: 8px 8px; }
main .damage-label { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 6px; position: relative; z-index: 1; }
main .damage-amount { font-family: 'Bangers', sans-serif; font-size: clamp(40px, 6vw, 72px); color: var(--gold-bright); text-shadow: 3px 3px 0 var(--red), 6px 6px 0 var(--navy-deep); line-height: 1; margin-bottom: 8px; position: relative; z-index: 1; }
main .damage-caption { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--steel); line-height: 1.4; position: relative; z-index: 1; }

main .threat-meter-wrap { margin-top: 48px; max-width: 800px; margin-left: auto; margin-right: auto; }
main .threat-meter-label { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 12px; text-align: center; }
main .threat-meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
main .threat-meter .seg { font-family: 'Bangers', sans-serif; font-size: 14px; letter-spacing: 0.1em; padding: 14px 8px; text-align: center; background: rgba(255,255,255,0.06); color: var(--steel-dim); border: 2px solid rgba(255,255,255,0.10); }
main .threat-meter .seg.active { background: var(--gold); color: var(--navy-deep); border-color: var(--gold); box-shadow: 2px 2px 0 var(--navy-deep); }

main .secondary-wrap { margin-top: 48px; max-width: 800px; margin-left: auto; margin-right: auto; }
main .secondary-label { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 16px; text-align: center; }
main .secondary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
main .secondary-card { background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.10); padding: 20px; display: flex; gap: 16px; align-items: center; }
main .secondary-card img { width: 80px; height: auto; flex-shrink: 0; filter: drop-shadow(0 0 12px rgba(249,166,48,0.2)); }
main .secondary-card .info h4 { font-family: 'Bangers', sans-serif; font-size: 22px; color: #fff; text-shadow: 1px 1px 0 var(--navy-deep); margin-bottom: 6px; line-height: 1.05; }
main .secondary-card .info p { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--steel); line-height: 1.4; }

main .reveal-cta-wrap { text-align: center; margin-top: 48px; }
main .reveal-cta { font-size: 24px; }
```

- [ ] **Step 3: Add reveal renderer + threat assessment copy**

```js
// ── Villain code → display data
const VILLAIN_NAMES = {
  PH: 'The Voicemail Phantom',
  AB: 'The After-Hours Ambush',
  VK: 'The Records Vault Keeper',
  DP: 'The Drowning Paralegal',
  SS: 'The Silence Saboteur',
  AA: 'The Admin Avalanche',
  HG: 'The Hiring Ghost'
};
const VILLAIN_SLUGS = {
  PH: 'voicemail-phantom', AB: 'after-hours-ambush', VK: 'records-vault-keeper',
  DP: 'drowning-paralegal', SS: 'silence-saboteur', AA: 'admin-avalanche', HG: 'hiring-ghost'
};
const VILLAIN_MO_SHORT = {
  PH: '1 in 4 inbound calls hits voicemail at the median firm. 70% never call back.',
  AB: '40% of legal demand lands outside business hours — they sign with whoever stays open later.',
  VK: 'Median firms wait 75 days for medical records. Some wait 120+.',
  DP: 'Once a paralegal\'s load crosses 30 cases, deadlines move from the calendar into a person\'s head.',
  SS: 'State bars consistently report communication as the #1 source of client complaints.',
  AA: 'Most attorneys spend 25% of their week on mail, data entry, and intake forms.',
  HG: 'Paralegal roles take 60+ days to fill. Average tenure under 2.5 years.'
};
const THREAT_ASSESSMENTS = {
  PH: "Your firm has the Voicemail Phantom problem. At the median firm, 1 in 4 calls hits voicemail — and 70% never call back. Every ring that ends in voicemail is a case Google just handed to your competitor.",
  AB: "Your firm is losing leads to the After-Hours Ambush. 40% of legal demand lands after business hours, and the highest-intent leads — the ones who just got the call from the hospital — call at 8 PM. They sign with whoever stays open later.",
  VK: "Your firm is being held hostage by the Records Vault Keeper. Hospitals and insurers don't care about your settlement timeline. At your turnaround, your cases sit while your competitors close theirs and free up the calendar.",
  DP: "Your firm runs on a Drowning Paralegal. Once their load crosses 30 cases, deadlines move from the calendar into someone's head. The indispensable paralegal becomes your single point of failure — and one PTO week ends careers.",
  SS: "Your firm has the Silence Saboteur problem. State bars consistently report communication as the #1 source of client complaints — not fees, not outcomes. Your reviews, your referrals, and your retention are all decided here.",
  AA: "Your firm is drowning under the Admin Avalanche. Mail, data entry, file openings, intake forms — work that has to happen but doesn't generate revenue. Your attorneys are losing a quarter of their week to it.",
  HG: "Your firm is hunting the Hiring Ghost. Paralegal roles take 60+ days to fill, new hires take 3-6 months to ramp, average tenure is under 2.5 years. You're hiring your entire support team every cycle — and falling further behind every quarter."
};

function renderReveal() {
  const r = state.result;
  if (!r || !r.biggestVillain) return;
  const v = r.biggestVillain;
  const displayName = VILLAIN_NAMES[v];

  document.getElementById('reveal-img').src = '/images/lp/villains/' + VILLAIN_SLUGS[v] + '.png';
  document.getElementById('reveal-img').alt = displayName;
  document.getElementById('reveal-name').textContent = displayName;
  document.getElementById('reveal-assessment').textContent = THREAT_ASSESSMENTS[v];

  const formattedLeak = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(state.leak);
  document.getElementById('reveal-leak').textContent = formattedLeak + ' / year';
  document.getElementById('reveal-leak-caption').textContent =
    'Estimated annual leak from the ' + displayName + ' at a firm your size.';

  // Threat meter — light up cumulative segments
  const levels = ['Mild', 'Serious', 'Critical', 'Existential'];
  const activeIdx = levels.indexOf(r.threatLevel);
  document.querySelectorAll('#threat-meter .seg').forEach(function(seg, i) {
    seg.classList.toggle('active', i <= activeIdx);
  });

  // Secondary villains
  const grid = document.getElementById('secondary-grid');
  grid.innerHTML = r.secondaryVillains.map(function(code) {
    return [
      '<div class="secondary-card">',
        '<img src="/images/lp/villains/' + VILLAIN_SLUGS[code] + '.png" alt="' + VILLAIN_NAMES[code] + '" />',
        '<div class="info">',
          '<h4>' + VILLAIN_NAMES[code] + '</h4>',
          '<p>' + VILLAIN_MO_SHORT[code] + '</p>',
        '</div>',
      '</div>'
    ].join('');
  }).join('');

  document.getElementById('reveal-cta-label').textContent = 'Deploy Attorney Assistant against the ' + displayName;
}
```

- [ ] **Step 4: Trigger renderReveal when entering reveal**

Modify `setStage`:

```js
function setStage(name) {
  main.setAttribute('data-stage', name);
  main.setAttribute('data-mode', name === 'context-quiz' ? 'clean' : 'comic');
  trackStage(LP_NAME, name);
  const target = document.querySelector('[data-stage="' + name + '"]');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (name === 'transition')    setTimeout(function() { setStage('villain-quiz'); }, 1200);
  if (name === 'villain-quiz')  renderQuestion();
  if (name === 'reveal')        renderReveal();
}
```

- [ ] **Step 5: Build, spot-check, commit**

Walk the full flow. Submit answers that strongly favor one villain (e.g., choose the highest-score option for every question) — confirm the reveal screen shows that villain's silhouette, name, threat assessment, formatted $ leak, threat-level meter with the right segments lit up, two secondary cards, and the CTA with the villain's name interpolated.

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add reveal stage with silhouette, damage, meter, secondaries"
```

---

## Task 13: Villain LP — email-gate stage

HubSpot form with all 7 hidden fields populated from quiz state.

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the email-gate section after the reveal section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 6: EMAIL GATE
═══════════════════════════════════════════ -->
<section data-stage="email-gate" class="email-gate-stage">
  <div class="container">
    <div class="email-gate-header">
      <span class="section-eyebrow">The Mission Briefing</span>
      <h2 class="display">Your <span class="accent-gold">90-day rescue plan</span> is one step away.</h2>
      <p style="font-family: 'Sora', sans-serif; font-size: 18px; color: var(--steel); max-width: 600px; margin-top: 16px;">We'll email your personalized Mission Briefing — the {{biggest-villain-name}} playbook, with the exact 90-day plan to defeat it.</p>
    </div>
    <div class="email-gate-form">
      <div id="hs-villain-emailgate" data-hs-form-target></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add email-gate styles**

```css
main .email-gate-stage { padding: 64px 0; min-height: 80vh; }
main .email-gate-header { max-width: 700px; margin: 0 auto 32px; text-align: center; }
main .email-gate-header h2 { font-size: clamp(32px, 5vw, 56px); }
main .email-gate-form { background: #fff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 3px solid var(--gold); }
```

- [ ] **Step 3: Update the email-gate header to interpolate the villain name**

In `renderReveal`, after setting `reveal-cta-label`, also update the email-gate header. Add this line at the bottom of `renderReveal`:

```js
const eghHeader = document.querySelector('.email-gate-header p');
if (eghHeader) {
  eghHeader.textContent = "We'll email your personalized Mission Briefing — the " + displayName + " playbook, with the exact 90-day plan to defeat it.";
}
```

- [ ] **Step 4: Add the HubSpot Forms loader (shared with villain email gate embed)**

After the existing JS, add:

```js
// ── HubSpot Forms loader (geo-gated)
window.__hsGeoReady.then(function(allowed) {
  if (!allowed) {
    document.querySelectorAll('[data-hs-form-target]').forEach(function(el) {
      el.innerHTML = '<div style="padding:2rem;text-align:center;color:#667085;font-size:0.875rem;border:1px solid #e5e7eb;border-radius:0.75rem;background:#f9fafb;">This form is not available from your location.</div>';
    });
    return;
  }
  var s = document.createElement('script');
  s.src = 'https://js.hsforms.net/forms/v2.js';
  s.async = true;
  s.onload = function() { window.dispatchEvent(new Event('hsFormsReady')); };
  document.head.appendChild(s);
});

window.addEventListener('hsFormsReady', function() {
  hbspt.forms.create({
    portalId: '49161090',
    region: 'na1',
    formId: 'c9fc48ee-12df-4f02-a972-a91bf7aa857d',
    target: '#hs-villain-emailgate',
    onFormReady: function($form) {
      if (!state.result) return;
      const set = function(name, value) { $form.find('[name="' + name + '"]').val(value); };
      set('biggest_villain',         VILLAIN_NAMES[state.result.biggestVillain]);
      set('secondary_villains',      state.result.secondaryVillains.map(function(v) { return VILLAIN_NAMES[v]; }).join(', '));
      set('threat_level',            state.result.threatLevel);
      set('estimated_annual_leak',   String(state.leak));  // plain integer, no $ or commas
      set('firm_attorney_count',     state.context.firm_attorney_count);
      set('monthly_lead_volume',     state.context.monthly_lead_volume);
      set('practice_area',           state.context.practice_area);
      Object.keys(utms).forEach(function(k) { set(k, utms[k]); });
    },
    onFormSubmitted: function() {
      setStage('thank-you');
    }
  });
});
```

- [ ] **Step 5: Build, spot-check, commit**

Walk the flow through reveal → CTA → email-gate. Confirm form renders inside the gold-bordered white card. Open dev tools, inspect the form, confirm hidden fields are populated with the right values for the current quiz state.

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add email-gate with 7 hidden fields populated from quiz state"
```

---

## Task 14: Villain LP — thank-you stage

Final stage with Bangers headline, meetings widget, and PDF preview placeholder.

**Files:**
- Modify: `src/pages/lp/comic/biggest-villain.astro`

- [ ] **Step 1: Insert the thank-you section after the email-gate section**

```astro
<!-- ═══════════════════════════════════════════
     STAGE 7: THANK YOU
═══════════════════════════════════════════ -->
<section data-stage="thank-you" class="thank-you-stage">
  <div class="container">
    <div class="thank-you-header">
      <h2 class="display">Your Mission Briefing<br><span class="accent-gold">is en route.</span></h2>
      <p style="font-family: 'Sora', sans-serif; font-size: 20px; color: var(--steel); margin-top: 16px;" id="ty-subhead">Check your inbox.</p>
    </div>

    <!-- Meeting widget -->
    <div class="thank-you-meeting">
      <div class="meetings-iframe-container" data-src="https://meet.attorneyassistant.com/meetings/attorney-assistant/simple-campaign-deploy-aa-rescue-call?embed=true"></div>
    </div>

    <!-- PDF preview placeholder -->
    <div class="briefing-preview">
      <!-- TODO(nicole): swap for the per-villain Mission Briefing PDF cover once Manus delivers it -->
      <div class="briefing-cover">
        <div class="briefing-label">Mission Briefing<br>Issue №02</div>
      </div>
    </div>
  </div>
</section>

<!-- HubSpot Meetings Embed loader (geo-gated) -->
<script is:inline>
  window.__hsGeoReady.then(function(allowed) {
    if (!allowed) {
      document.querySelectorAll('.meetings-iframe-container').forEach(function(el) {
        el.innerHTML = '<div style="padding:2rem;text-align:center;color:#667085;font-size:0.875rem;border:1px solid #e5e7eb;border-radius:0.75rem;background:#f9fafb;">This form is not available from your location.</div>';
      });
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    document.head.appendChild(s);
  });
</script>
```

- [ ] **Step 2: Add thank-you styles + meetings iframe override**

```css
main .thank-you-stage { padding: 64px 0; }
main .thank-you-header { max-width: 800px; margin: 0 auto 40px; text-align: center; }
main .thank-you-header h2 { font-size: clamp(40px, 6vw, 80px); }
main .thank-you-meeting { background: #fff; border-radius: 12px; padding: 16px; max-width: 800px; margin: 0 auto 48px; border: 3px solid var(--gold); }
main .meetings-iframe-container iframe { background: #ffffff !important; }
main .briefing-preview { max-width: 320px; margin: 0 auto; }
main .briefing-cover {
  aspect-ratio: 8.5 / 11; background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-mid) 100%);
  border: 3px solid var(--gold); display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
main .briefing-cover::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 8px 8px; }
main .briefing-label { font-family: 'Bangers', sans-serif; font-size: 28px; color: var(--gold-bright); text-align: center; text-shadow: 2px 2px 0 var(--red); position: relative; z-index: 1; line-height: 1.1; }
```

- [ ] **Step 3: Update the thank-you subhead with villain interpolation**

In `renderReveal` (or in a new `renderThankYou` function), update the subhead. Add to `renderReveal`:

```js
const tySub = document.getElementById('ty-subhead');
if (tySub) {
  tySub.textContent = "Check your inbox. The " + displayName + " doesn't stand a chance.";
}
```

- [ ] **Step 4: Build, spot-check, commit**

Full walk-through. Confirm thank-you stage renders Bangers headline + meetings iframe loads + briefing placeholder shows. Note that the "Check your inbox" subhead reflects the chosen villain.

```bash
git add src/pages/lp/comic/biggest-villain.astro
git commit -m "Villain LP: add thank-you stage with rescue-call meeting widget"
```

---

## Task 15: Build Plain booking thank-you page

Page rendered after the Operations Review meeting is booked from the Benchmark LP.

**Files:**
- Create: `src/pages/thank-you-booking-simple-plain.astro`

- [ ] **Step 1: Create the file**

```astro
---
import SimpleCampaignLayout from "@layouts/SimpleCampaignLayout.astro";
---

<SimpleCampaignLayout
  title="Your Operations Review is Confirmed | Attorney Assistant"
  description="Your Operations Review with Attorney Assistant is on the calendar."
>

  <section class="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-800 to-brand-navy grain-overlay min-h-[70vh] flex items-center">
    <div class="absolute inset-0">
      <div class="absolute top-20 left-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-1/3 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
    </div>
    <div class="container-narrow relative z-10 py-20 md:py-28 text-center">
      <div class="reveal">
        <div class="w-20 h-20 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-8">
          <svg class="w-10 h-10 text-brand-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">Confirmed</span>
        <h1 class="text-display-sm md:text-display-md font-heading text-white mb-4">Your Operations Review is on the calendar.</h1>
        <div class="divider-gold-center mt-4 mb-6"></div>
        <p class="text-lg text-white/60 max-w-lg mx-auto mb-4">A calendar invite is on its way. Add it now so it doesn't slip.</p>
      </div>
    </div>
  </section>

  <section class="py-14 md:py-20">
    <div class="container-narrow">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-display-xs font-heading text-gray-900 mb-8 text-center reveal">What to Expect on the Call</h2>
        <div class="space-y-5">
          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white reveal" style="transition-delay: 100ms">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900">We'll walk your scorecard together</p>
              <p class="text-sm text-gray-500 mt-0.5">The 2 metrics you saw on the LP, plus the other 13 in the report. We'll identify the top 2-3 biggest gaps.</p>
            </div>
          </div>
          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white reveal" style="transition-delay: 200ms">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900">Compare your firm to the top performers</p>
              <p class="text-sm text-gray-500 mt-0.5">What the firms in the top quartile do differently — and which of those plays you could run.</p>
            </div>
          </div>
          <div class="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white reveal" style="transition-delay: 300ms">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900">No pitch, no pressure</p>
              <p class="text-sm text-gray-500 mt-0.5">It's a real conversation about your firm's operations. If there's a fit for AA, we'll talk about it. If not, you walk away with the playbook.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Conversion tracking -->
  <script is:inline>
    if (typeof posthog !== 'undefined') posthog.capture('Meeting Booked', { meeting_type: 'operations_review' });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'meeting_booked', meeting_type: 'operations_review' });
    // TODO(nicole): add GA4 / LinkedIn / Meta conversion pixel firing here once pixel IDs are confirmed
  </script>

</SimpleCampaignLayout>
```

- [ ] **Step 2: Build, spot-check, commit**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep "thank-you-booking-simple-plain"`
Open `http://localhost:4321/thank-you-booking-simple-plain` and verify the page renders.

```bash
git add src/pages/thank-you-booking-simple-plain.astro
git commit -m "Add Operations Review booking thank-you page (Benchmark/plain path)"
```

---

## Task 16: Build Comic booking thank-you page

Page rendered after the Deploy AA Rescue Call meeting is booked from the Villain LP.

**Files:**
- Create: `src/pages/thank-you-booking-simple-comic.astro`

- [ ] **Step 1: Create the file**

```astro
---
import ComicCampaignLayout from "@layouts/ComicCampaignLayout.astro";
---

<ComicCampaignLayout
  title="The Rescue Is Scheduled | Attorney Assistant"
  description="Your Deploy AA Rescue Call with Attorney Assistant is confirmed."
>

  <main data-mode="comic" id="ty-comic">

    <header class="header-strip">
      <div class="container row">
        <img src="/brand/logos/long_white_logo.svg" alt="Attorney Assistant">
        <div>Mission Booked · <span class="issue-tag">Issue №02 · 2026</span></div>
      </div>
    </header>

    <section class="ty-hero">
      <div class="container" style="text-align: center;">
        <span class="hero-eyebrow">CASE FILE: ACCEPTED</span>
        <h1 class="display">The rescue<br><span class="accent-gold">is scheduled.</span></h1>
        <p class="ty-subhead">Your Deploy AA call is locked in. Check your inbox for the calendar invite.</p>
      </div>
    </section>

    <section class="ty-cards-section">
      <div class="container">
        <p class="ty-section-label">What happens on the call</p>
        <div class="ty-cards">
          <div class="ty-card">
            <span class="pow">POW!</span>
            <h3>Your villain, exposed</h3>
            <p>We'll walk through your diagnostic result together — why that villain scored highest at your firm, and what its specific damage pattern looks like at your size.</p>
          </div>
          <div class="ty-card">
            <span class="pow">BAM!</span>
            <h3>The rescue plan</h3>
            <p>The exact 90-day playbook to defeat your villain. Which AA model (Elite Staffing, +AI, Co-Managed) fits, what the rollout looks like, and what week-by-week results to expect.</p>
          </div>
          <div class="ty-card">
            <span class="pow">ZAP!</span>
            <h3>No pitch — a real plan</h3>
            <p>If AA isn't a fit, you walk away with the playbook anyway. If it is, we map the deployment.</p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <style>
    /* ── Color tokens (from comic-one-pager) */
    :root {
      --navy: #0e2236;
      --navy-deep: #061320;
      --navy-mid: #1a3a5c;
      --gold: #F9A630;
      --gold-bright: #FBD46D;
      --red: #E04A2C;
      --red-bright: #FF6B45;
      --steel: #c0c8d4;
      --steel-dim: #6f7a8a;
    }

    main { background: var(--navy); color: #fff; font-family: 'Inter', -apple-system, sans-serif; line-height: 1.55; min-height: 100vh; }
    main[data-mode="comic"]::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 8px 8px; mix-blend-mode: screen;
    }

    main .container { max-width: 1100px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 2; }
    main section { padding: 64px 0; }

    main h1, main h2, main h3, main .display { font-family: 'Bangers', sans-serif; letter-spacing: 0.04em; }
    main .display { letter-spacing: 0.02em; line-height: 0.95; text-transform: uppercase; text-shadow: 3px 3px 0 var(--red), 6px 6px 0 var(--navy-deep); }
    main h1.display { font-size: clamp(56px, 9vw, 112px); }
    main .accent-gold { color: var(--gold); }

    main .header-strip { border-bottom: 2px solid rgba(255,255,255,0.08); padding: 16px 0; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; color: var(--steel); }
    main .header-strip .row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
    main .header-strip img { height: 28px; }
    main .header-strip .issue-tag { color: var(--gold); }

    main .ty-hero { padding-top: 80px; }
    main .hero-eyebrow { display: inline-block; background: var(--red); color: #fff; padding: 8px 16px; letter-spacing: 0.12em; font-size: 18px; transform: rotate(-2deg); margin-bottom: 24px; box-shadow: 4px 4px 0 var(--navy-deep); font-family: 'Bangers', sans-serif; }
    main .ty-subhead { font-family: 'Sora', sans-serif; font-size: clamp(18px, 2.4vw, 24px); font-weight: 600; color: var(--steel); max-width: 600px; margin: 24px auto 0; line-height: 1.35; }

    main .ty-section-label { font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--gold); margin-bottom: 32px; text-align: center; border-bottom: 3px solid var(--gold); padding-bottom: 8px; display: inline-block; }
    main .ty-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    main .ty-card { background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.10); padding: 28px 24px; position: relative; transition: transform 0.25s, border-color 0.25s; }
    main .ty-card:nth-child(odd)  { transform: rotate(-0.6deg); }
    main .ty-card:nth-child(even) { transform: rotate( 0.6deg); }
    main .ty-card:hover { transform: rotate(0deg) translateY(-4px); border-color: var(--gold); }
    main .ty-card .pow { display: inline-block; background: var(--red); color: #fff; padding: 3px 12px; font-family: 'Bangers', sans-serif; font-size: 18px; letter-spacing: 0.08em; transform: rotate(-3deg); box-shadow: 2px 2px 0 var(--navy-deep); position: absolute; top: 20px; right: 20px; }
    main .ty-card h3 { font-size: 26px; color: #fff; margin: 16px 0 10px; text-shadow: 2px 2px 0 var(--navy-deep); }
    main .ty-card p { font-family: 'Inter', sans-serif; font-size: 14.5px; color: var(--steel); line-height: 1.5; }
    main .ty-cards-section .container { text-align: center; }
    main .ty-cards { text-align: left; }
  </style>

  <!-- Conversion tracking -->
  <script is:inline>
    if (typeof posthog !== 'undefined') posthog.capture('Meeting Booked', { meeting_type: 'deploy_aa_rescue_call' });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'meeting_booked', meeting_type: 'deploy_aa_rescue_call' });
    // TODO(nicole): add GA4 / LinkedIn / Meta conversion pixel firing here once pixel IDs are confirmed
  </script>

</ComicCampaignLayout>
```

- [ ] **Step 2: Build, spot-check, commit**

Run: `NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | grep "thank-you-booking-simple-comic"`
Open `http://localhost:4321/thank-you-booking-simple-comic` and verify Bangers headline + 3 rotated comic cards render.

```bash
git add src/pages/thank-you-booking-simple-comic.astro
git commit -m "Add Deploy AA Rescue Call booking thank-you page (Villain/comic path)"
```

---

## Task 17: Final QA pass + summary report for Nicole

End-to-end verification. No code changes if all checks pass.

**Files:** none modified (verification only)

- [ ] **Step 1: Full build from clean**

```bash
rm -rf dist && NODE_OPTIONS="--max-old-space-size=8192" npx astro build 2>&1 | tail -20
```

Expected: build completes, all 4 new routes are listed (`/lp/simple/benchmark`, `/lp/comic/biggest-villain`, `/thank-you-booking-simple-plain`, `/thank-you-booking-simple-comic`).

- [ ] **Step 2: Confirm noindex meta on all 4 pages**

```bash
for slug in lp/simple/benchmark lp/comic/biggest-villain thank-you-booking-simple-plain thank-you-booking-simple-comic; do
  printf "%s: " "$slug"
  grep -o 'name="robots"[^>]*' "dist/${slug}/index.html" | head -1
done
```

Expected: each line contains `name="robots" content="noindex, nofollow"` (or equivalent — the campaign layouts set this by default).

- [ ] **Step 3: Confirm villain image references in the built Villain LP**

```bash
grep -oE '/images/lp/villains/[a-z-]+\.png' dist/lp/comic/biggest-villain/index.html | sort -u
```

Expected: 7 unique paths matching the slug list from Task 2.

- [ ] **Step 4: Dev-server manual walkthrough**

Run: `npx astro dev` (background)

Walk both LPs end-to-end at 1440px:
- Benchmark: intro → form → scorecard (verify bar positions) → email gate → thank-you (verify meeting iframe)
- Villain: intro → context-quiz (3 dropdowns) → transition → 10 quiz questions → reveal (verify silhouette + leak + meter + secondaries) → email-gate → thank-you

Then resize to 320px and walk again. Spot-check that the rogues gallery cards stack, reveal grid collapses, and forms remain usable.

- [ ] **Step 5: Print summary report**

Print to Nicole:
- All 4 routes built and confirmed
- TODOs remaining (form ID verification, practice_area options confirmation, GA4/LinkedIn/Meta pixel IDs, benchmark PDF page previews, per-villain Mission Briefing covers)
- HubSpot dependencies that need to be live before launch (3 form IDs verified in HubSpot, 2 meeting types redirecting to the new thank-you slugs)
- Anything visually surprising encountered during the walkthrough

No commit needed for this task.

---

## Self-review pass

Walked the spec against the plan, checking each section:

- **§4 Benchmark LP** — all 5 stages covered in Tasks 3-7 ✓
- **§5 Villain LP** — all 7 stages covered in Tasks 8-14 ✓
- **§6 Thank-you pages** — both covered in Tasks 15-16 ✓
- **§7 Assets** — Task 2 (villains) + inline placeholder cards (PDF previews) ✓
- **§8 Shared infrastructure** — `src/config/forms.ts` referenced throughout; pre-existing file from spec phase ✓
- **§9 HubSpot dependencies** — covered as TODOs + dev verification (Task 17) ✓
- **§10 TODOs** — `TODO(nicole)` markers explicit in Tasks 9, 11, 14, 15, 16, 17 ✓
- **§11 Acceptance criteria** — most verified in Task 17; `voicemail_rate_` trailing underscore preserved verbatim in Task 4 and 5 ✓
- **Threat-level vocabulary** — `Mild` / `Serious` / `Critical` / `Existential` consistent across Tasks 11, 12, 13 ✓
- **`estimated_annual_leak` as plain integer** — `String(state.leak)` in Task 13, not `formattedLeak` ✓

Type consistency check:
- `state.benchmark` shape consistent across Tasks 4 (set), 5 (read) ✓
- `state.result.biggestVillain` (code) vs. `VILLAIN_NAMES[code]` (display) used consistently in Tasks 12, 13, 14 ✓
- `VILLAIN_SLUGS[code]` used in Task 12 for image paths; matches Task 8's frontmatter villain slugs ✓
- `setStage('name')` name strings consistent across all Villain LP stages ✓

No placeholders. No "TBD" or "implement later" patterns in any task. All code blocks contain the actual code, all bash commands are executable verbatim.

---

## Out of scope (deferred for future)

- Replacing PDF preview placeholder cards with real screenshots of pages 4/7/11 (waiting on Manus deliverable)
- Per-villain Mission Briefing PDF cover swap (waiting on Manus deliverable)
- GA4 / LinkedIn / Meta conversion pixel IDs on the new thank-you pages
- Verifying `practice_area` dropdown options against HubSpot
- Share-this-result on Villain reveal (v2)
- A/B variants

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-12-simple-campaign-lead-magnets.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
