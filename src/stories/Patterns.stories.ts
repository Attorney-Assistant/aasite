import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Patterns",
};

export default meta;

type Story = StoryObj;

export const FloatingOrbs: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <style>
        @keyframes ptFloat1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-25px, 15px) scale(1.1); } }
        @keyframes ptFloat2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -12px) scale(1.08); } }
      </style>
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 8px;">Floating Orbs Animation</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        Ambient radial gradient orbs that float behind hero sections. Blue (#50A7DD) and orange (#F9A630).
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="position: relative; overflow: hidden; border-radius: 12px; background: #091623; min-height: 200px; display: flex; align-items: center; justify-content: center;">
          <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(80,167,221,0.15) 0%,rgba(80,167,221,0) 65%);top:-30%;right:-10%;animation:ptFloat1 8s ease-in-out infinite;"></div>
          <div style="position:absolute;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(249,166,48,0.12) 0%,rgba(249,166,48,0) 65%);bottom:-20%;left:-5%;animation:ptFloat2 10s ease-in-out infinite;"></div>
          <p style="font-family: 'Sora', sans-serif; color: white; font-size: 18px; position: relative; z-index: 1;">Dark Hero</p>
        </div>
        <div style="position: relative; overflow: hidden; border-radius: 12px; background: white; border: 1px solid #eaecf0; min-height: 200px; display: flex; align-items: center; justify-content: center;">
          <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(80,167,221,0.18) 0%,rgba(80,167,221,0) 70%);top:-25%;right:-10%;animation:ptFloat1 8s ease-in-out infinite;"></div>
          <div style="position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(249,166,48,0.15) 0%,rgba(249,166,48,0) 70%);bottom:-20%;left:-8%;animation:ptFloat2 10s ease-in-out infinite;"></div>
          <p style="font-family: 'Sora', sans-serif; color: #101828; font-size: 18px; position: relative; z-index: 1;">Light Hero</p>
        </div>
      </div>

      <div style="padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">/* Blue orb */
background: radial-gradient(circle, rgba(80,167,221,0.15) 0%, rgba(80,167,221,0) 65%);
/* multi-stop keyframe — translate + scale across 5 waypoints */

/* Orange orb */
background: radial-gradient(circle, rgba(249,166,48,0.12) 0%, rgba(249,166,48,0) 65%);

/* Orb counts by context:
   - Homepage hero: 3 orbs (custom inline styles)
   - Subpage heroes (Hero.astro): 2 orbs (.hero-orb--1, .hero-orb--2)
   - 404 page: 2 orbs (.notfound-orb--1, .notfound-orb--2) at 0.22 opacity
   - Landing pages: inline orb instances per section
*/

/* Always include */
@media (prefers-reduced-motion: reduce) { .hero-orb { animation: none; } }</p>
      </div>
    `;
    return container;
  },
};

export const H2AccentText: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 24px;">H2 Accent Text Treatment</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 32px;">
        Key H2 headings use italic colored accent words for visual interest. Use 1-2 accent words per heading.
        Gold (#F9A630) and Blue (#50a7dd) are the accent colors.
      </p>

      <div style="margin-bottom: 24px; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="font-family: 'Sora', sans-serif; font-size: 36px; color: #0b0000; margin: 0;">
          <em style="font-style: italic; color: #F9A630;">Simple.</em> Fast. <em style="font-style: italic; color: #50a7dd;">Effective.</em>
        </h2>
      </div>

      <div style="margin-bottom: 24px; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="font-family: 'Sora', sans-serif; font-size: 36px; color: #0b0000; margin: 0;">
          It's Not a Marketing Problem. It's an <em style="font-style: italic; color: #50a7dd;">Operations</em> Problem.
        </h2>
      </div>

      <div style="margin-bottom: 24px; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="font-family: 'Sora', sans-serif; font-size: 36px; color: #0b0000; margin: 0;">
          Stop <em style="font-style: italic; color: #F9A630;">Leaking Revenue.</em> Start Scaling.
        </h2>
      </div>

      <div style="margin-top: 32px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">Gold: &lt;em class="not-italic text-brand-gold italic"&gt;Word&lt;/em&gt;
Blue: &lt;em class="not-italic text-brand-blue italic"&gt;Word&lt;/em&gt;</p>
      </div>
    `;
    return container;
  },
};

export const DottedBackground: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 24px;">Dotted Background Pattern</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 32px;">
        A subtle polka dot pattern used behind service grids and card sections for texture.
        Pair <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px;">bg-dots</code>
        with <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px;">bg-gray-50</code>.
      </p>

      <div style="background-color: #f9fafb; background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 24px 24px; border-radius: 12px; padding: 48px 32px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          ${[1, 2, 3].map((i) => `
            <div style="background: white; border: 1px solid #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="width: 40px; height: 40px; background: #1a3a5c; border-radius: 8px; margin: 0 auto 12px;"></div>
              <p style="font-family: 'Sora', sans-serif; font-size: 16px; color: #0b0000; margin: 0 0 4px;">Service ${i}</p>
              <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #6b7280; margin: 0;">Description text</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="margin-top: 24px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">CSS:
.bg-dots {
  background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
  background-size: 24px 24px;
}</p>
      </div>
    `;
    return container;
  },
};

export const GrainOverlay: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 24px;">Grain Overlay</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 32px;">
        A subtle film-grain texture applied to dark sections (hero, CTA banners, stats bars) for a premium feel.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: #1a3a5c; border-radius: 12px; padding: 32px; text-align: center;">
          <p style="font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 8px;">Without grain</p>
          <p style="font-family: 'Sora', sans-serif; color: white; font-size: 18px; margin: 0;">Clean surface</p>
        </div>
        <div style="background: #1a3a5c; border-radius: 12px; padding: 32px; text-align: center; position: relative; overflow: hidden;">
          <div style="position:absolute;inset:0;opacity:0.4;background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22256%22 height=%22256%22 filter=%22url(%23n)%22 opacity=%220.15%22/%3E%3C/svg%3E');"></div>
          <p style="font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 8px; position: relative;">With grain</p>
          <p style="font-family: 'Sora', sans-serif; color: white; font-size: 18px; margin: 0; position: relative;">Textured surface</p>
        </div>
      </div>

      <div style="padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0;">CSS class: <strong>.grain-overlay</strong> — add to any dark section element</p>
      </div>
    `;
    return container;
  },
};

export const DayTimelinePattern: Story = {
  name: "DayTimeline (Homepage)",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 8px;">DayTimeline Component</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        Accordion-style day-in-the-life timeline. Lives on the <strong>homepage</strong>. 8 time slots (7:30 AM–11:45 PM).
        First item starts expanded. Click any row to expand/collapse. Only one row open at a time.
      </p>

      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eaecf0;">
          <span style="font-family: monospace; font-size: 11px; color: #1a3a5c; font-weight: 700; min-width: 72px;">7:30 AM</span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #1a3a5c; border: 2px solid #fff; box-shadow: 0 0 0 1px #e5e7eb; flex-shrink: 0;"></span>
          <span style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #344054;">Morning Arrival</span>
          <span style="font-family: monospace; font-size: 11px; color: #98a2b3; margin-left: auto;">▲ expanded</span>
        </div>
        <div style="margin-left: 82px; margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; margin-bottom: 8px;">
          <div style="padding: 12px; background: #fef3f2; border-right: 1px solid #e5e7eb;">
            <p style="font-family: monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #b42318; margin: 0 0 6px;">✕ Without AA</p>
            <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #475467; margin: 0;">Staff arrives to 6 overnight voicemails. 2 leads already called competitors.</p>
          </div>
          <div style="padding: 12px; background: #f0fdf4;">
            <p style="font-family: monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #15803d; margin: 0 0 6px;">✓ With AA</p>
            <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #344054; font-weight: 500; margin: 0;">All 6 leads already qualified. Intake complete. Appointments booked.</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eaecf0;">
          <span style="font-family: monospace; font-size: 11px; color: #1a3a5c; font-weight: 700; min-width: 72px;">9:00 AM</span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #f87171; border: 2px solid #fff; box-shadow: 0 0 0 1px #e5e7eb; flex-shrink: 0;"></span>
          <span style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #344054;">Peak Call Volume</span>
          <span style="font-family: monospace; font-size: 11px; color: #d0d5dd; margin-left: auto;">▼ collapsed</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
          <span style="font-family: monospace; font-size: 11px; color: #475467; font-weight: 700; min-width: 72px;">5:30 PM</span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #1a3a5c; border: 2px solid #fff; box-shadow: 0 0 0 1px #e5e7eb; flex-shrink: 0;"></span>
          <span style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #344054;">Office Closing <em style="font-size: 11px; color: #667085; font-style: normal;">(evening styling)</em></span>
        </div>
      </div>

      <div style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">Component: &lt;DayTimeline /&gt; — self-contained, no props
Location: Homepage only (src/pages/index.astro)
Behaviour: Accordion, one open at a time, first item pre-expanded
Evening slots (5:30 PM+): muted time color (#475467), navy pip</p>
      </div>
    `;
    return container;
  },
};

export const ScrollytellingPattern: Story = {
  name: "Scrollytelling (Services Page)",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 8px;">Scrollytelling Component</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        Toggle-based before/after comparison section. Lives on the <strong>services page</strong>.
        Lightened navy background (#132d46). Blue-tinted floating particles. Toggling between
        "Without AA" / "With AA" morphs stat counters, story block, overnight counter, and colors throughout.
      </p>

      <div id="scrolly-demo" style="background: #132d46; border-radius: 12px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
        <div id="scrolly-orb1" style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(80,167,221,0.08) 0%,transparent 70%);top:0;right:0;pointer-events:none;transition:background 0.6s ease;"></div>
        <div id="scrolly-orb2" style="position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(ellipse 40% 60% at 10% 80%,rgba(80,167,221,0.12) 0%,transparent 70%);bottom:0;left:0;pointer-events:none;transition:background 0.6s ease;"></div>
        <p id="scrolly-eyebrow" style="font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: #7fb8d4; margin: 0 0 12px; text-transform: uppercase; transition: color 0.4s ease;">● The Reality</p>
        <p id="scrolly-headline" style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 22px; color: #fff; margin: 0 0 16px; transition: color 0.4s ease;">Your firm is <span id="scrolly-accent" style="transition: color 0.4s ease; color: #ef4444;">leaking revenue.</span></p>
        <div style="display: flex; justify-content: center; gap: 0; margin-bottom: 20px;">
          <button id="scrolly-btn-without" style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; padding: 8px 16px; border: 1px solid rgba(239,68,68,0.25); border-right: none; border-radius: 9999px 0 0 9999px; background: rgba(239,68,68,0.08); color: #f04438; cursor: pointer; transition: all 0.3s ease;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#ef4444;margin-right:6px;vertical-align:middle;"></span>Without Attorney Assistant
          </button>
          <button id="scrolly-btn-with" style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; padding: 8px 16px; border: 1px solid rgba(255,255,255,0.12); border-radius: 0 9999px 9999px 0; background: rgba(255,255,255,0.05); color: #98a2b3; cursor: pointer; transition: all 0.3s ease;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#667085;margin-right:6px;vertical-align:middle;"></span>With Attorney Assistant
          </button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; transition: border-color 0.4s ease;">
            <p style="font-family: 'Inter', sans-serif; font-size: 11px; color: #98a2b3; margin: 0 0 4px;">Missed calls today</p>
            <p id="scrolly-stat1" style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 32px; color: #f04438; margin: 0; transition: color 0.4s ease;">3</p>
          </div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; transition: border-color 0.4s ease;">
            <p style="font-family: 'Inter', sans-serif; font-size: 11px; color: #98a2b3; margin: 0 0 4px;">Avg intake time</p>
            <p id="scrolly-stat2" style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 32px; color: #f04438; margin: 0; transition: color 0.4s ease;">47<span style="font-size: 14px; opacity: 0.7;">min</span></p>
          </div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; transition: border-color 0.4s ease;">
            <p style="font-family: 'Inter', sans-serif; font-size: 11px; color: #98a2b3; margin: 0 0 4px;">Conversion rate</p>
            <p id="scrolly-stat3" style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 32px; color: #f04438; margin: 0; transition: color 0.4s ease;">12<span style="font-size: 14px; opacity: 0.7;">%</span></p>
          </div>
        </div>
      </div>

      <div style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">Component: &lt;Scrollytelling /&gt; — self-contained, no props
Location: Services page only (src/pages/services/index.astro)
Background: #132d46 (lightened navy, not near-black)
Particles: blue-tinted (rgba(80,167,221,0.15)), shift to gold on "with" state
Toggle: morphs counters (3→0 calls, 47→5 min, 12→38%), story block, overnight counter
Text colors: brightened (#98a2b3 body, #7fb8d4 eyebrow) vs old near-black version</p>
      </div>
    `;

    const btnWithout = container.querySelector("#scrolly-btn-without") as HTMLButtonElement;
    const btnWith = container.querySelector("#scrolly-btn-with") as HTMLButtonElement;
    const stat1 = container.querySelector("#scrolly-stat1") as HTMLElement;
    const stat2 = container.querySelector("#scrolly-stat2") as HTMLElement;
    const stat3 = container.querySelector("#scrolly-stat3") as HTMLElement;
    const eyebrow = container.querySelector("#scrolly-eyebrow") as HTMLElement;
    const accent = container.querySelector("#scrolly-accent") as HTMLElement;
    const orb1 = container.querySelector("#scrolly-orb1") as HTMLElement;
    const orb2 = container.querySelector("#scrolly-orb2") as HTMLElement;

    function setWithout() {
      btnWithout.style.background = "rgba(239,68,68,0.08)";
      btnWithout.style.borderColor = "rgba(239,68,68,0.25)";
      btnWithout.style.color = "#f04438";
      btnWithout.querySelector("span")!.style.background = "#ef4444";
      btnWith.style.background = "rgba(255,255,255,0.05)";
      btnWith.style.borderColor = "rgba(255,255,255,0.12)";
      btnWith.style.color = "#98a2b3";
      btnWith.querySelector("span")!.style.background = "#667085";

      stat1.innerHTML = "3";
      stat1.style.color = "#f04438";
      stat2.innerHTML = '47<span style="font-size:14px;opacity:0.7;">min</span>';
      stat2.style.color = "#f04438";
      stat3.innerHTML = '12<span style="font-size:14px;opacity:0.7;">%</span>';
      stat3.style.color = "#f04438";

      eyebrow.textContent = "● The Reality";
      eyebrow.style.color = "#7fb8d4";
      accent.textContent = "leaking revenue.";
      accent.style.color = "#ef4444";

      orb1.style.background = "radial-gradient(ellipse 60% 50% at 80% 20%,rgba(80,167,221,0.08) 0%,transparent 70%)";
      orb2.style.background = "radial-gradient(ellipse 40% 60% at 10% 80%,rgba(80,167,221,0.12) 0%,transparent 70%)";
    }

    function setWith() {
      btnWith.style.background = "rgba(34,197,94,0.08)";
      btnWith.style.borderColor = "rgba(34,197,94,0.25)";
      btnWith.style.color = "#22c55e";
      btnWith.querySelector("span")!.style.background = "#22c55e";
      btnWithout.style.background = "rgba(255,255,255,0.05)";
      btnWithout.style.borderColor = "rgba(255,255,255,0.12)";
      btnWithout.style.color = "#98a2b3";
      btnWithout.querySelector("span")!.style.background = "#667085";

      stat1.innerHTML = "0";
      stat1.style.color = "#22c55e";
      stat2.innerHTML = '5<span style="font-size:14px;opacity:0.7;">min</span>';
      stat2.style.color = "#22c55e";
      stat3.innerHTML = '38<span style="font-size:14px;opacity:0.7;">%</span>';
      stat3.style.color = "#22c55e";

      eyebrow.textContent = "● The Transformation";
      eyebrow.style.color = "#F9A630";
      accent.textContent = "capturing every lead.";
      accent.style.color = "#22c55e";

      orb1.style.background = "radial-gradient(ellipse 60% 50% at 80% 20%,rgba(249,166,48,0.1) 0%,transparent 70%)";
      orb2.style.background = "radial-gradient(ellipse 40% 60% at 10% 80%,rgba(249,166,48,0.15) 0%,transparent 70%)";
    }

    btnWithout.addEventListener("click", setWithout);
    btnWith.addEventListener("click", setWith);

    return container;
  },
};

export const NotFoundPage: Story = {
  name: "404 Page",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <style>
        @keyframes nfFloat1Demo {
          0% { transform: translate(0,0) scale(1); }
          20% { transform: translate(-40px,20px) scale(1.15); }
          40% { transform: translate(-12px,-24px) scale(0.9); }
          60% { transform: translate(30px,10px) scale(1.1); }
          80% { transform: translate(10px,-16px) scale(0.92); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes nfFloat2Demo {
          0% { transform: translate(0,0) scale(1); }
          25% { transform: translate(30px,-18px) scale(1.2); }
          50% { transform: translate(10px,24px) scale(0.85); }
          75% { transform: translate(-20px,-8px) scale(1.1); }
          100% { transform: translate(0,0) scale(1); }
        }
      </style>
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 8px;">404 Page</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        Dark navy page with grain overlay, 2 floating orbs, gradient "404" text, and two CTAs.
      </p>

      <div style="position: relative; overflow: hidden; border-radius: 12px; background: #07111a; min-height: 280px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 24px;">
        <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(80,167,221,0.22) 0%,rgba(80,167,221,0) 70%);top:-20%;right:-8%;animation:nfFloat1Demo 10s ease-in-out infinite;pointer-events:none;"></div>
        <div style="position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(249,166,48,0.22) 0%,rgba(249,166,48,0) 70%);bottom:-20%;left:-8%;animation:nfFloat2Demo 12s ease-in-out infinite;pointer-events:none;"></div>
        <div style="position: relative; z-index: 1;">
          <p style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 72px; line-height: 1; letter-spacing: -0.04em; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(249,166,48,0.3) 50%, rgba(80,167,221,0.2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 12px;">404</p>
          <h1 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 24px; color: white; margin: 0 0 8px;">This page doesn't exist.</h1>
          <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #9ca3af; margin: 0 0 20px;">Looks like this lead went cold. Let's get you back on track.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button style="background: #F9A630; color: #0b0000; border: none; padding: 10px 20px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer;">Back to Home →</button>
            <button style="background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer;">Contact Us</button>
          </div>
        </div>
      </div>

      <div style="margin-top: 16px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">File: src/pages/404.astro
Background: bg-brand-950 + grain-overlay + radial gradient mesh
Orb 1 (blue): rgba(80,167,221,0.22) — 10s multi-stop keyframe, top-right
Orb 2 (orange): rgba(249,166,48,0.22) — 12s multi-stop keyframe, bottom-left
404 text: gradient (white/15% → gold/30% → blue/20%), background-clip: text
CTAs: btn-primary (gold) + btn-ghost-light (transparent/white border)</p>
      </div>
    `;
    return container;
  },
};

export const LandingPagePattern: Story = {
  name: "Landing Page Pattern",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 8px;">Landing Page Pattern</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        High-conversion landing pages at <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;">/lp/[slug]</code>.
        Example: <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;">/lp/marketing-waste</code>.
      </p>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${[
          { section: "1. Dark hero", desc: "Navy background with floating orbs, bold headline, inline lead-capture form. No site nav." },
          { section: "2. Flow diagram", desc: "Horizontal step flow (icons + connectors) showing how the service works." },
          { section: "3. Stat cards", desc: "3-column grid of metric cards (large number + label + source note)." },
          { section: "4. Problem list", desc: "Numbered list of pain points on light background." },
          { section: "5. Numbered fix grid", desc: "2–3 column grid of numbered solutions, each with icon + title + body." },
          { section: "6. Side-by-side columns", desc: "Two-column comparison (without AA / with AA) with bullet lists." },
          { section: "7. Numbered steps + connectors", desc: "Vertical step sequence with connector lines between steps." },
          { section: "8. Dark proof cards", desc: "Navy/dark background, testimonial or stat proof cards." },
        ].map(({ section, desc }) => `
          <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <span style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px; color: #1a3a5c; min-width: 160px;">${section}</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 13px; color: #6b7280;">${desc}</span>
          </div>
        `).join("")}
      </div>

      <div style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="font-family: monospace; font-size: 13px; color: #374151; margin: 0; white-space: pre-wrap;">Route: /lp/marketing-waste (standalone .astro, no nav/footer)
Brand voice: operations problem-solver — avoid "staffing" / "dedicated assistants"
Hero: dark navy + floating orbs + inline form (no external CTA redirect)
Sections follow a problem→solution→proof narrative arc</p>
      </div>
    `;
    return container;
  },
};
