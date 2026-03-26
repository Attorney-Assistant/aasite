import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Components",
};

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ */
/*  1. CTA Banner variants                                            */
/* ------------------------------------------------------------------ */

export const CTABannerBrand: Story = {
  name: "CTA Banner — Brand (Navy)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #1a3a5c; padding: 64px 0; color: white; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Stop Leaking Revenue. Start Scaling.
          </h2>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; color: rgba(255,255,255,0.7); margin: 0 0 32px 0;">
            Most firms don't need more leads — they need to stop losing the ones they have.
          </p>
          <button style="background: #F9A630; color: #0b0000; border: none; padding: 16px 32px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Book a Call
          </button>
        </div>
      </section>
    `;
    return container;
  },
};

export const CTABannerLight: Story = {
  name: "CTA Banner — Light",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #f9fafb; padding: 64px 0; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 36px; color: #101828; margin: 0 0 16px 0;">
            Ready to Streamline Your Practice?
          </h2>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; color: #667085; margin: 0 0 32px 0;">
            See how Attorney Assistant can eliminate the busywork holding your firm back.
          </p>
          <button style="background: #1a3a5c; color: #ffffff; border: none; padding: 16px 32px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Schedule a Demo
          </button>
        </div>
      </section>
    `;
    return container;
  },
};

export const CTABannerDark: Story = {
  name: "CTA Banner — Dark",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #091623; padding: 64px 0; color: white; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Your Competitors Are Already Automating Intake.
          </h2>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; color: rgba(255,255,255,0.55); margin: 0 0 32px 0;">
            Don't let another lead slip through the cracks. We'll show you exactly where you're losing revenue.
          </p>
          <button style="background: #F9A630; color: #0b0000; border: none; padding: 16px 32px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Get a Free Audit
          </button>
        </div>
      </section>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  2. Feature Card                                                   */
/* ------------------------------------------------------------------ */

export const FeatureCard: Story = {
  name: "Feature Card",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "340px";
    container.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f3f4f6;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(80,167,221,0.1); border-radius: 50%; margin-bottom: 16px;">
          <svg width="24" height="24" fill="none" stroke="#50a7dd" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>
          </svg>
        </div>
        <h3 style="font-family: 'Sora', sans-serif; font-weight: 600; font-size: 18px; margin: 0 0 8px 0; color: #101828;">24/7 Live Intake</h3>
        <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; line-height: 1.6; margin: 0;">
          Never miss a potential client again. Our trained intake specialists answer every call, day or night, and qualify leads in real time.
        </p>
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  3. Service Card                                                   */
/* ------------------------------------------------------------------ */

export const ServiceCard: Story = {
  name: "Service Card",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "380px";
    container.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #eaecf0; cursor: pointer; transition: box-shadow 0.2s;">
        <h3 style="font-family: 'Sora', sans-serif; font-weight: 600; font-size: 18px; margin: 0 0 8px 0; color: #101828;">Client Intake Management</h3>
        <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; line-height: 1.6; margin: 0 0 16px 0;">
          We handle every step of your intake process — from first contact to signed retainer — so your attorneys can focus on casework.
        </p>
        <span style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #50a7dd; display: inline-flex; align-items: center; gap: 6px;">
          Learn more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#50a7dd" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m-4-4l4 4-4 4"/>
          </svg>
        </span>
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  4. Process Steps                                                  */
/* ------------------------------------------------------------------ */

export const ProcessSteps: Story = {
  name: "Process Steps",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "480px";

    const steps = [
      { num: "01", title: "Discovery Call", desc: "We learn about your firm, practice areas, and current pain points." },
      { num: "02", title: "Custom Playbook", desc: "Our team builds SOPs and intake scripts tailored to your workflows." },
      { num: "03", title: "Onboarding & Training", desc: "We integrate with your CRM and phone system in under 48 hours." },
      { num: "04", title: "Go Live & Optimize", desc: "Real-time reporting and weekly check-ins ensure continuous improvement." },
    ];

    container.innerHTML = `
      <div style="padding: 24px;">
        ${steps
          .map(
            (s, i) => `
          <div style="display: flex; gap: 20px; position: relative;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #1a3a5c; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; flex-shrink: 0;">
                ${s.num}
              </div>
              ${
                i < steps.length - 1
                  ? '<div style="width: 2px; flex: 1; background: linear-gradient(to bottom, #1a3a5c, #e5e7eb); margin: 4px 0;"></div>'
                  : ""
              }
            </div>
            <div style="padding-bottom: ${i < steps.length - 1 ? "32px" : "0"};">
              <h4 style="font-family: 'Sora', sans-serif; font-weight: 600; font-size: 16px; margin: 0 0 4px 0; color: #101828; line-height: 40px;">${s.title}</h4>
              <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; line-height: 1.5; margin: 0;">${s.desc}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  5. Comparison Table                                               */
/* ------------------------------------------------------------------ */

export const ComparisonTable: Story = {
  name: "Comparison Table",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "720px";

    const rows = [
      ["Missed after-hours calls", "24/7 live intake coverage"],
      ["Leads lost in spreadsheets", "Automated CRM pipeline"],
      ["Slow follow-up (days)", "Follow-up within 5 minutes"],
      ["No intake scripts", "Custom-built intake playbooks"],
      ["Revenue leakage", "Higher conversion rates"],
    ];

    container.innerHTML = `
      <div style="border-radius: 12px; overflow: hidden; border: 1px solid #eaecf0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 14px;">
          <thead>
            <tr>
              <th style="background: #fef2f2; padding: 14px 20px; text-align: left; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14px; color: #991b1b; border-bottom: 2px solid #eaecf0;">
                Without AA
              </th>
              <th style="background: #f0fdf4; padding: 14px 20px; text-align: left; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14px; color: #166534; border-bottom: 2px solid #eaecf0;">
                With AA
              </th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                ([without, withAA], i) => `
              <tr style="border-bottom: ${i < rows.length - 1 ? "1px solid #f3f4f6" : "none"};">
                <td style="padding: 12px 20px; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#ef4444"><circle cx="8" cy="8" r="6"/><path d="M6 6l4 4M10 6l-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
                  ${without}
                </td>
                <td style="padding: 12px 20px; color: #166534;">
                  <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l2 2 3.5-3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                    ${withAA}
                  </span>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  6. Logo Scroller                                                  */
/* ------------------------------------------------------------------ */

export const LogoScroller: Story = {
  name: "Logo Scroller",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <style>
        @keyframes sbScrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      </style>
      <section style="background: #f9fafb; padding: 40px 0; overflow: hidden;">
        <p style="text-align: center; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 24px 0;">
          Trusted by Leading Law Firms
        </p>
        <div style="display: flex; animation: sbScrollLogos 20s linear infinite; width: max-content;">
          ${Array.from({ length: 10 })
            .map(
              (_, i) => `
            <div style="flex-shrink: 0; width: 160px; height: 48px; margin: 0 24px; background: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Sora', sans-serif; font-size: 13px; color: #9ca3af;">
              Logo ${(i % 5) + 1}
            </div>
          `
            )
            .join("")}
        </div>
      </section>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  7. YouTube Embed                                                  */
/* ------------------------------------------------------------------ */

export const YouTubeEmbed: Story = {
  name: "YouTube Embed",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "640px";
    container.innerHTML = `
      <div style="position: relative; border-radius: 12px; overflow: hidden; background: #0b0000; aspect-ratio: 16/9; cursor: pointer;">
        <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #1a3a5c 0%, #091623 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(249,166,48,0.95); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 24px rgba(249,166,48,0.4);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.6); margin: 0;">Watch how Attorney Assistant works</p>
        </div>
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  8. Day Timeline                                                   */
/* ------------------------------------------------------------------ */

export const DayTimeline: Story = {
  name: "Day Timeline",
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "480px";

    const events = [
      { time: "8:00 AM", label: "Missed call from potential PI client", color: "#ef4444", bg: "#fef2f2" },
      { time: "9:15 AM", label: "Intake specialist captures lead details", color: "#22c55e", bg: "#f0fdf4" },
      { time: "10:30 AM", label: "Lead qualified and entered in CRM", color: "#50a7dd", bg: "#eff6ff" },
      { time: "11:00 AM", label: "Attorney receives case summary", color: "#50a7dd", bg: "#eff6ff" },
      { time: "1:30 PM", label: "Follow-up call scheduled automatically", color: "#F9A630", bg: "#fffbeb" },
      { time: "3:00 PM", label: "Retainer signed via e-signature", color: "#22c55e", bg: "#f0fdf4" },
    ];

    container.innerHTML = `
      <div style="padding: 24px; background: white; border-radius: 12px; border: 1px solid #eaecf0;">
        <h3 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #101828; margin: 0 0 24px 0;">A Day With Attorney Assistant</h3>
        ${events
          .map(
            (e, i) => `
          <div style="display: flex; gap: 16px; position: relative; ${i < events.length - 1 ? "padding-bottom: 20px;" : ""}">
            <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 12px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${e.color}; flex-shrink: 0; margin-top: 4px;"></div>
              ${i < events.length - 1 ? `<div style="width: 2px; flex: 1; background: #e5e7eb; margin-top: 4px;"></div>` : ""}
            </div>
            <div style="flex: 1;">
              <span style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; color: #9ca3af;">${e.time}</span>
              <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #374151; margin: 2px 0 0 0; padding: 6px 10px; background: ${e.bg}; border-radius: 6px; display: inline-block;">${e.label}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  9. Badge Variants                                                 */
/* ------------------------------------------------------------------ */

export const BadgeVariants: Story = {
  name: "Badge Variants",
  render: () => {
    const container = document.createElement("div");

    const badges = [
      { name: "badge-brand", bg: "rgba(80,167,221,0.1)", color: "#50a7dd", label: "Brand" },
      { name: "badge-gold", bg: "rgba(249,166,48,0.12)", color: "#b97a1e", label: "Gold" },
      { name: "badge-gray", bg: "#f3f4f6", color: "#6b7280", label: "Gray" },
      { name: "badge-navy", bg: "rgba(26,58,92,0.1)", color: "#1a3a5c", label: "Navy" },
      { name: "badge-success", bg: "#f0fdf4", color: "#166534", label: "Success" },
      { name: "badge-warning", bg: "#fffbeb", color: "#92400e", label: "Warning" },
    ];

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <h3 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #101828; margin: 0;">Badge Variants</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${badges
            .map(
              (b) => `
            <span style="display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 999px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; background: ${b.bg}; color: ${b.color};">
              ${b.label}
            </span>
          `
            )
            .join("")}
        </div>
        <table style="width: 100%; max-width: 480px; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e7eb;">
              <th style="text-align: left; padding: 8px;">Class</th>
              <th style="text-align: left; padding: 8px;">Preview</th>
            </tr>
          </thead>
          <tbody>
            ${badges
              .map(
                (b) => `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px; font-family: monospace;">.${b.name}</td>
                <td style="padding: 8px;">
                  <span style="display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 500; background: ${b.bg}; color: ${b.color};">${b.label}</span>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    return container;
  },
};

/* ------------------------------------------------------------------ */
/*  10. Featured Icon Variants                                        */
/* ------------------------------------------------------------------ */

export const FeaturedIconVariants: Story = {
  name: "Featured Icon Variants",
  render: () => {
    const container = document.createElement("div");

    const variants = [
      { name: "brand", bg: "rgba(80,167,221,0.1)", stroke: "#50a7dd" },
      { name: "gold", bg: "rgba(249,166,48,0.12)", stroke: "#F9A630" },
      { name: "gray", bg: "#f3f4f6", stroke: "#6b7280" },
      { name: "navy", bg: "rgba(26,58,92,0.1)", stroke: "#1a3a5c" },
      { name: "success", bg: "#f0fdf4", stroke: "#22c55e" },
    ];

    const sizes = [
      { label: "sm", px: 36, iconPx: 18 },
      { label: "md", px: 48, iconPx: 24 },
      { label: "lg", px: 64, iconPx: 32 },
    ];

    const iconSvg = (size: number, stroke: string) =>
      `<svg width="${size}" height="${size}" fill="none" stroke="${stroke}" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.146.146A2 2 0 0115.5 19h-7a2 2 0 01-1.414-3.414l.146-.146z"/></svg>`;

    container.innerHTML = `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">
        <h3 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #101828; margin: 0;">Featured Icon Variants</h3>
        ${variants
          .map(
            (v) => `
          <div>
            <p style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0;">${v.name}</p>
            <div style="display: flex; align-items: center; gap: 20px;">
              ${sizes
                .map(
                  (s) => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <div style="width: ${s.px}px; height: ${s.px}px; border-radius: 50%; background: ${v.bg}; display: flex; align-items: center; justify-content: center;">
                    ${iconSvg(s.iconPx, v.stroke)}
                  </div>
                  <span style="font-family: 'Inter', sans-serif; font-size: 11px; color: #9ca3af;">${s.label}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    return container;
  },
};
