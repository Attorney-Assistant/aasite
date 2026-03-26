---
name: attorney-assistant-brand
description: Attorney Assistant brand system — colors, typography, voice, logos, icons, components, and design patterns. Use this skill whenever creating any visual asset, web page, email, social post, presentation, document, or marketing material for Attorney Assistant.
---

# Attorney Assistant Brand System

You are designing for **Attorney Assistant**, a legal operations company that solves intake failure, follow-up gaps, admin chaos, and scaling bottlenecks for law firms. We are an **operations problem-solver**, not a staffing vendor.

**Website:** https://attorneyassistant.com
**Brand Assets CDN:** https://e.attorneyassistant.com/brand/

---

## Brand Voice

### We Are
- An operations problem-solver, not a staffing vendor
- Confident and direct — we name the problem clearly
- Co-managed — we embed in firms, not outsource from a distance
- Results-oriented — lead with outcomes, not features
- Empowering, not salesy

### We Avoid
- Staffing/vendor language ("dedicated assistants," "custom combinations")
- Calling ourselves a "staffing company"
- Overly corporate or stiff language
- Jargon without explanation
- Making promises we can't back up

### Key Phrases
- "You don't have a lead problem. You have an operations problem."
- "Delegate to achieve more."
- "We fix the problems that cost your firm money."
- "Stop losing revenue to broken operations."

### Messaging Strategy
- **Narrative arc:** Problem → Solution → Proof
- **Lead with operational challenges:** intake failure, follow-up gaps, admin chaos, scaling bottlenecks
- **Solution:** embedded legal support professionals
- **Proof:** case studies, testimonials, metrics (conversion lift, intake speed, cost per case)
- **Tone:** Professional but approachable, direct without being aggressive

---

## Colors

### Primary Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Navy** | `#1a3a5c` | rgb(26, 58, 92) | Hero backgrounds, dark sections, primary brand color |
| **Gold** | `#F9A630` | rgb(249, 166, 48) | Primary CTAs, accents, dividers, highlights — this is the logo color |
| **Gold Dark** | `#d98a00` | rgb(217, 138, 0) | Hover states for gold buttons |
| **Gold Light** | `#fef6e8` | rgb(254, 246, 232) | Gold icon backgrounds, light gold surfaces |
| **Blue** | `#50a7dd` | rgb(80, 167, 221) | Links, badges, secondary accents |
| **Steel** | `#588aa5` | rgb(88, 138, 165) | Subtle accents, secondary text on dark |
| **Black** | `#0b0000` | rgb(11, 0, 0) | Primary text color |
| **White** | `#ffffff` | rgb(255, 255, 255) | Backgrounds, light text on dark surfaces |

### Navy Scale (for dark backgrounds and gradients)

| Step | Hex | Usage |
|------|-----|-------|
| 25 | `#f0f7fc` | Lightest tint |
| 50 | `#e1eff9` | Light backgrounds |
| 100 | `#c3dff3` | Borders on light |
| 200 | `#96c7e8` | — |
| 300 | `#6aafdd` | — |
| 400 | `#50a7dd` | Brand Blue (same as blue) |
| 500 | `#3a8fc4` | — |
| 600 | `#2d7aab` | — |
| 700 | `#1a3a5c` | Brand Navy (primary dark) |
| 800 | `#142e49` | Deeper sections |
| 900 | `#0e2236` | Dark hero overlays |
| 950 | `#091623` | Darkest (404 page, deep sections) |

### Semantic Colors

| Category | 50 | 500 | 700 | Usage |
|----------|-----|-----|-----|-------|
| **Error** | `#FEF3F2` | `#F04438` | `#B42318` | Validation errors, "without AA" states |
| **Warning** | `#FFFAEB` | `#F79009` | `#B54708` | Alerts, caution states |
| **Success** | `#ECFDF3` | `#17B26A` | `#067647` | Confirmations, "with AA" states |

### Gray Scale

| Step | Hex | Usage |
|------|-----|-------|
| 25 | `#FCFCFD` | Barely visible backgrounds |
| 50 | `#F9FAFB` | Section backgrounds |
| 100 | `#F2F4F7` | Card backgrounds, dividers |
| 200 | `#EAECF0` | Borders |
| 300 | `#D0D5DD` | Input borders |
| 400 | `#98A2B3` | Placeholder text |
| 500 | `#667085` | Secondary text |
| 600 | `#475467` | Body text (secondary) |
| 700 | `#344054` | Body text (primary) |
| 800 | `#182230` | Dark text |
| 900 | `#101828` | Headings on white |
| 950 | `#0C111D` | Deepest dark |

### Color Pairing Rules
- **Gold on Navy:** Primary CTA combination. High contrast, high energy.
- **White on Navy:** Section text, hero content.
- **Navy on White:** Standard body text and headings.
- **Blue on White:** Links, badges, secondary accents.
- **Gold on Black (#0b0000):** Footer headings, dark section accents.
- **Never:** Gold on white (insufficient contrast). Use Gold Dark (`#d98a00`) on white instead.

---

## Typography

### Font Families

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Headings & Display** | **Sora** | 400, 600, 700, 800 | All headings (H1–H6), hero text, display numbers, navigation |
| **Body & UI** | **Inter** | 400, 500, 600, 700 | Paragraphs, buttons, labels, form inputs, metadata |

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap
```

**Fallback stack:** -apple-system, "Segoe UI", sans-serif

### Display Type Scale

| Name | Size | Line Height | Letter Spacing | Usage |
|------|------|-------------|----------------|-------|
| display-2xl | 72px (4.5rem) | 1.1 | -0.02em | Homepage hero |
| display-xl | 60px (3.75rem) | 1.1 | -0.02em | Major section hero |
| display-lg | 48px (3rem) | 1.15 | -0.02em | Subpage hero |
| display-md | 36px (2.25rem) | 1.2 | -0.01em | Section headings |
| display-sm | 30px (1.875rem) | 1.25 | — | Sub-section headings |
| display-xs | 24px (1.5rem) | 1.3 | — | Card headings, smaller sections |

### Text Styling Conventions
- **Heading accent words:** Use italic + gold (`#F9A630`) or blue (`#50a7dd`) for 1–2 key words in H2 headings. Example: `Stop <em style="color: #F9A630; font-style: italic;">Leaking Revenue.</em> Start Scaling.`
- **Eyebrow text:** Monospace, 10–11px, uppercase, letter-spacing 0.12em, color `#7fb8d4` (on dark) or navy (on light)
- **Body text:** Inter 400/500, 14–16px, line-height 1.5–1.6, color `#344054` or `#475467`
- **Selection highlight:** Gold at 25% opacity background, navy text
- **Font smoothing:** Always apply `-webkit-font-smoothing: antialiased`

---

## Logos

All logos are available at `https://e.attorneyassistant.com/brand/logos/` in SVG, PNG, and WebP formats.

### Horizontal Logos (Primary — use for headers, email signatures, documents)
| Variant | SVG | PNG | WebP |
|---------|-----|-----|------|
| Full Color | [long_color_logo.svg](https://e.attorneyassistant.com/brand/logos/long_color_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/long_color_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/long_color_logo.webp) |
| Black | [long_black_logo.svg](https://e.attorneyassistant.com/brand/logos/long_black_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/long_black_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/long_black_logo.webp) |
| White | [long_white_logo.svg](https://e.attorneyassistant.com/brand/logos/long_white_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/long_white_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/long_white_logo.webp) |

### Vertical / Stacked Logos (use for presentations, print, social headers)
| Variant | SVG | PNG | WebP |
|---------|-----|-----|------|
| Full Color | [tall_color_logo.svg](https://e.attorneyassistant.com/brand/logos/tall_color_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/tall_color_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/tall_color_logo.webp) |
| Black | [tall_black_logo.svg](https://e.attorneyassistant.com/brand/logos/tall_black_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/tall_black_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/tall_black_logo.webp) |
| White | [tall_white_logo.svg](https://e.attorneyassistant.com/brand/logos/tall_white_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/tall_white_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/tall_white_logo.webp) |

### Square Logos (use for social profile images, app icons)
| Variant | SVG | PNG | WebP |
|---------|-----|-----|------|
| Full Color | [square_fullcolor_logo.svg](https://e.attorneyassistant.com/brand/logos/square_fullcolor_logo.svg) | [.png](https://e.attorneyassistant.com/brand/logos/square_fullcolor_logo.png) | [.webp](https://e.attorneyassistant.com/brand/logos/square_fullcolor_logo.webp) |

### Icon / Favicon (use for browser tabs, small avatars, app badges)
| Variant | SVG | PNG | WebP |
|---------|-----|-----|------|
| Color | [color_icon.svg](https://e.attorneyassistant.com/brand/logos/color_icon.svg) | [.png](https://e.attorneyassistant.com/brand/logos/color_icon.png) | [.webp](https://e.attorneyassistant.com/brand/logos/color_icon.webp) |
| Black | [black_icon.svg](https://e.attorneyassistant.com/brand/logos/black_icon.svg) | [.png](https://e.attorneyassistant.com/brand/logos/black_icon.png) | [.webp](https://e.attorneyassistant.com/brand/logos/black_icon.webp) |
| White | [white_icon.svg](https://e.attorneyassistant.com/brand/logos/white_icon.svg) | [.png](https://e.attorneyassistant.com/brand/logos/white_icon.png) | [.webp](https://e.attorneyassistant.com/brand/logos/white_icon.webp) |

### Logo Usage Rules
- Full-color logo on white or light backgrounds
- White logo on dark, navy, or photo backgrounds
- Icon/favicon variant for small spaces (social avatars, browser tabs)
- SVG preferred for web; PNG/WebP for social and email
- **Never** stretch, rotate, recolor, or add effects
- Maintain clear space equal to the icon height around the logo

---

## Icons

48 custom SVG icons available at `https://e.attorneyassistant.com/brand/icons/`. All icons are monochrome line-art SVGs that can be recolored with CSS.

### Business & Finance Icons (24)
| Icon | URL |
|------|-----|
| Analytics | [buiness & finance_analityc.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_analityc.svg) |
| Bank | [buiness & finance_bank.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_bank.svg) |
| Bearish | [buiness & finance_bearish.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_bearish.svg) |
| Bullish | [buiness & finance_bullish.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_bullish.svg) |
| Business Bag | [buiness & finance_business bag.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_business%20bag.svg) |
| Business Document | [buiness & finance_business document.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_business%20document.svg) |
| Cash Out | [buiness & finance_cahs out.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_cahs%20out.svg) |
| Chart | [buiness & finance_chart.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_chart.svg) |
| Coins | [buiness & finance_coins.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_coins.svg) |
| Exchange | [buiness & finance_exchange.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_exchange.svg) |
| Finance Guard | [buiness & finance_finance guard.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_finance%20guard.svg) |
| Fund | [buiness & finance_fund.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_fund.svg) |
| Group | [buiness & finance_group.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_group.svg) |
| Handshake | [buiness & finance_hand shake.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_hand%20shake.svg) |
| Investment | [buiness & finance_investation.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_investation.svg) |
| Locker | [buiness & finance_locker.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_locker.svg) |
| Money Bag | [buiness & finance_money bag.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_money%20bag.svg) |
| Piggy Bank | [buiness & finance_piggy bank.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_piggy%20bank.svg) |
| Refund | [buiness & finance_refund money.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_refund%20money.svg) |
| Report | [buiness & finance_report business.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_report%20business.svg) |
| Stick Chart | [buiness & finance_stick chart.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_stick%20chart.svg) |
| Target | [buiness & finance_target.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_target.svg) |
| Transfer Money | [buiness & finance_transfer money.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_transfer%20money.svg) |
| Wallet | [buiness & finance_wallet.svg](https://e.attorneyassistant.com/brand/icons/buiness%20%26%20finance_wallet.svg) |

### Law & Legal Icons (24)
| Icon | URL |
|------|-----|
| Banking Law | [law and legal_banking law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_banking%20law.svg) |
| Book of Law | [law and legal_book law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_book%20law.svg) |
| Business Law | [law and legal_business law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_business%20law.svg) |
| Certificate | [law and legal_certificate.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_certificate.svg) |
| Crime | [law and legal_crime.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_crime.svg) |
| Police Document | [law and legal_document police.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_document%20police.svg) |
| Gender Equality | [law and legal_gender equality.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_gender%20equality.svg) |
| Gavel | [law and legal_hammer.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_hammer.svg) |
| International Law | [law and legal_international law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_international%20law.svg) |
| Law Scale | [law and legal_law scale.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_law%20scale.svg) |
| Lawyer 1 | [law and legal_lawyer 1.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_lawyer%201.svg) |
| Lawyer 2 | [law and legal_lawyer 2.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_lawyer%202.svg) |
| Online Law | [law and legal_online law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_online%20law.svg) |
| Patent Law | [law and legal_paten law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_paten%20law.svg) |
| Police File | [law and legal_police file.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_police%20file.svg) |
| Police Note | [law and legal_police note.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_police%20note.svg) |
| Prison | [law and legal_prison.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_prison.svg) |
| Property Law | [law and legal_property law.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_property%20law.svg) |
| Research File | [law and legal_research file.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_research%20file.svg) |
| Shield | [law and legal_shield.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_shield.svg) |
| Trust | [law and legal_trust.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_trust.svg) |
| Umbrella | [law and legal_umbrella.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_umbrella.svg) |
| Witness 1 | [law and legal_withness 1.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_withness%201.svg) |
| Witness 2 | [law and legal_withness 2.svg](https://e.attorneyassistant.com/brand/icons/law%20and%20legal_withness%202.svg) |

### Icon Recoloring (CSS)
Icons are monochrome SVGs. Recolor with CSS `filter`:
- **Default (dark):** No filter needed
- **White:** `filter: brightness(0) invert(1)`
- **Gold:** `filter: brightness(0) saturate(100%) invert(73%) sepia(60%) saturate(600%) hue-rotate(350deg) brightness(100%)`
- **Navy:** `filter: brightness(0) saturate(100%) invert(20%) sepia(30%) saturate(800%) hue-rotate(175deg) brightness(90%)`

---

## Buttons

### Variants

| Class | Background | Text | Border | Usage |
|-------|-----------|------|--------|-------|
| **btn-primary** | `#F9A630` (Gold) | `#1a3a5c` (Navy) | none | Primary CTAs — "Book a Call", "Get Started" |
| **btn-secondary** | White | `#344054` (Gray 700) | `#D0D5DD` (Gray 300) | Secondary actions — "Learn More", "Contact Us" |
| **btn-tertiary** | Transparent | `#475467` (Gray 600) | none | Tertiary links — "View all", inline actions |
| **btn-brand** | `#1a3a5c` (Navy) | White | none | Alternate CTA — navy authority feel |
| **btn-ghost-light** | Transparent | White | `rgba(255,255,255,0.25)` | Dark background secondary — "Contact Us" on hero |

### Button Sizes
- **Default:** `px-4 py-2.5 text-sm` (14px)
- **btn-lg:** `px-6 py-3 text-base` (16px)
- **btn-xl:** `px-7 py-4 text-base` (16px, more padding)

### Button Behavior
- All buttons: `rounded-lg`, `font-semibold`, `font-body` (Inter), `transition-all duration-200`
- Hover: slight lift (`translateY(-1px)`) + enhanced shadow
- btn-primary hover: `shadow-glow` (gold glow)
- btn-brand hover: navy glow shadow
- Include arrow icon (`→`) in primary CTAs

---

## Layout & Spacing

### Containers
| Class | Max Width | Usage |
|-------|-----------|-------|
| **container-wide** | 1280px (80rem) | Feature sections, blog grids, service overviews |
| **container-narrow** | 896px (56rem) | Blog post body, static page content, long-form text |

Both containers include `mx-auto px-4 sm:px-6 lg:px-8` for responsive padding.

### Section Spacing
| Element | Desktop | Mobile | CSS |
|---------|---------|--------|-----|
| Hero sections | 128px / 80px | 80px / 80px | `py-20 lg:py-32` |
| Content sections | 96px / 96px | 64px / 64px | `py-16 lg:py-24` |
| Section heading gap | 48px | 48px | `mb-12` |
| Card grid gap | 24px | 24px | `gap-6` |
| Inline content gap | 32px | 32px | `gap-8` |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| sm (xs) | 4px | Tags, badges |
| lg (md) | 8–10px | Buttons, inputs |
| xl | 12px | Cards, panels |
| 2xl | 16px | Large cards, modals |
| full | 9999px | Avatars, pills |

---

## Component Patterns

### Cards
- Background: white
- Border: `1px solid #EAECF0` (gray-200)
- Border radius: `rounded-2xl` (16px)
- Shadow: `shadow-xs` (subtle)
- Hover: lift (`translateY(-2px)`) + `shadow-md`

### Featured Icon Containers
Used to display icons in colored circular/rounded containers:

| Size | Dimensions |
|------|-----------|
| featured-icon-sm | 40 x 40px |
| featured-icon-md | 48 x 48px |
| featured-icon-lg | 56 x 56px |

| Variant | Background | Text/Icon | Border |
|---------|-----------|-----------|--------|
| featured-icon-brand | brand-50 | brand-600 | brand-100 |
| featured-icon-gold | gold-light | gold-dark | gold/20% |
| featured-icon-gray | gray-100 | gray-600 | gray-200 |
| featured-icon-navy | brand-700 | white | none |
| featured-icon-success | success-50 | success-600 | success-100 |

### Badges
Inline pills for tags, categories, and status indicators:
- Base: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase`

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| badge-brand | brand-50 | brand-700 | brand-200 |
| badge-gold | gold-light | gold-dark | gold/20% |
| badge-gray | gray-50 | gray-700 | gray-200 |
| badge-navy | navy/10% | navy | navy/20% |
| badge-success | success-50 | success-700 | success-300 |
| badge-warning | warning-50 | warning-700 | warning-300 |

### Dividers
- `.divider-gold`: 48px wide, 2px tall, gold background
- `.divider-gold-center`: Same, centered with `mx-auto`

---

## Animations & Effects

### Scroll Reveal
Elements animate into view on scroll using IntersectionObserver:
- `.reveal`: Fade up from 24px below (0.7s, cubic-bezier(0.16, 1, 0.3, 1))
- `.reveal-left`: Slide in from 24px left
- `.reveal-scale`: Scale up from 0.95
- Stagger with `.delay-100` through `.delay-800`

### Floating Orbs
Ambient radial gradient orbs behind hero sections:
- **Blue orb:** `radial-gradient(circle, rgba(80,167,221, 0.15) 0%, transparent 65%)`
- **Gold orb:** `radial-gradient(circle, rgba(249,166,48, 0.12) 0%, transparent 65%)`
- Multi-stop keyframe animations (8–12s, ease-in-out, infinite)
- Always respect `prefers-reduced-motion: reduce`

### Grain Overlay
Subtle film-grain texture on dark sections:
- SVG noise filter as `::after` pseudo-element
- Opacity: 0.035
- Apply `.grain-overlay` class to any dark section

### Text Gradient
- `.text-gradient-gold`: Solid gold color (`#F9A630`) — used for accent text in hero sections

---

## Dark Section Patterns

When building dark navy sections:
1. Background: `#1a3a5c` (brand-navy) or darker (`#132d46`, `#0e2236`, `#091623`)
2. Add `.grain-overlay` for texture
3. Add 2 floating orbs (blue + gold) with multi-stop keyframe animations
4. Text: white for headings, `#98A2B3` (gray-400) for body, `#7fb8d4` for eyebrow labels
5. Divider: `.divider-gold-center` between eyebrow and heading
6. CTAs: `btn-primary` (gold) + `btn-ghost-light` (white outline)

---

## Contact Information

- **Phone:** (215) 337-2677
- **Email:** info@attorneyassistant.com
- **Address:** 7900 Old York Rd, Elkins Park, PA 19027
- **Book a Call:** https://attorneyassistant.com/book-call
- **LinkedIn:** https://www.linkedin.com/company/attorneyassistant
- **Facebook:** https://web.facebook.com/attyassistant/
- **Instagram:** https://www.instagram.com/attorneyassistant
- **Google Business:** https://search.google.com/local/reviews?placeid=ChIJKSqaqoG_xokRw6mNcCWmxcI
- **YouTube:** https://www.youtube.com/@AttorneyAssistant

---

## Quick Reference: When to Use What

| Scenario | Logo | Colors | Font |
|----------|------|--------|------|
| **Email signature** | Horizontal color (PNG) | Navy text, gold accent | Inter body |
| **Slide deck** | Vertical color or white | Navy bg + white text, gold CTAs | Sora headings, Inter body |
| **Social post** | Square icon or horizontal | Navy bg + gold text, or white bg + navy text | Sora bold for headlines |
| **Document / PDF** | Horizontal color at top | Navy headings, gray-700 body | Sora H1-H3, Inter body |
| **Web page** | Horizontal color (SVG) in header | Full color system | Full type system |
| **Dark background** | White logo variant | White text, gold accents, grain overlay | Sora + Inter |
| **Print material** | Horizontal or vertical color (PNG 300dpi) | Navy + gold, CMYK equivalents needed | Sora + Inter |
