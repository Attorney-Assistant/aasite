import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Typography",
};

export default meta;

type Story = StoryObj;

export const TypeScale: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "800px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 32px;">Typography Scale</h2>

      <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #9ca3af; margin: 0 0 24px; padding: 10px 14px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px;">
        <strong>Font stack updated:</strong> Sora (headlines) + Inter (body) replaced DM Serif Display + DM Sans. Heading weight is now <strong>700</strong> (was 400 with the old serif).
      </p>
      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin-bottom: 16px; color: #50a7dd;">Headings — Sora (weight 700)</h3>
      <div style="margin-bottom: 40px;">
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Display 2XL — 4.5rem</p>
          <h1 style="font-family: 'Sora', sans-serif; font-size: 48px; line-height: 1.1; font-weight: 700; margin: 0; color: #0b0000;">You have an operations problem.</h1>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Display MD — 2.25rem</p>
          <h2 style="font-family: 'Sora', sans-serif; font-size: 36px; line-height: 1.15; font-weight: 700; margin: 0; color: #0b0000;">Why Firms Choose Attorney Assistant</h2>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Display SM — 1.875rem</p>
          <h3 style="font-family: 'Sora', sans-serif; font-size: 24px; line-height: 1.2; font-weight: 700; margin: 0; color: #0b0000;">Intake Failure</h3>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Card Title — 1.125rem</p>
          <h4 style="font-family: 'Sora', sans-serif; font-size: 18px; line-height: 1.3; font-weight: 700; margin: 0; color: #0b0000;">Lead Follow-up</h4>
        </div>
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin-bottom: 16px; color: #50a7dd;">Body — Inter</h3>
      <div style="margin-bottom: 40px;">
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body Large — 18px/28px Regular</p>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; line-height: 28px; font-weight: 400; margin: 0; color: #0b0000;">Attorney Assistant handles the intake, follow-up, and admin that law firms consistently fail to execute — so more of your existing leads actually close.</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body — 16px/24px Regular</p>
          <p style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 24px; font-weight: 400; margin: 0; color: #0b0000;">We diagnose your firm's specific operational gaps and build a co-managed solution around them — so you can grow without adding chaos.</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body Small — 14px/20px Regular</p>
          <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 20px; font-weight: 400; margin: 0; color: #6b7280;">Published March 4, 2026 · 5 min read</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Caption — 12px/16px Medium</p>
          <p style="font-family: 'Inter', sans-serif; font-size: 12px; line-height: 16px; font-weight: 500; margin: 0; color: #9ca3af;">LEGAL OPERATIONS · INTAKE</p>
        </div>
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin-bottom: 16px; color: #50a7dd;">Font Weights</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${[
          { weight: 700, name: "Bold", font: "Sora", family: "sans-serif" },
          { weight: 400, name: "Regular", font: "Inter", family: "sans-serif" },
          { weight: 500, name: "Medium", font: "Inter", family: "sans-serif" },
          { weight: 600, name: "SemiBold", font: "Inter", family: "sans-serif" },
          { weight: 700, name: "Bold", font: "Inter", family: "sans-serif" },
        ].map(({ weight, name, font, family }) => `
          <div style="text-align: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
            <p style="font-family: '${font}', ${family}; font-weight: ${weight}; font-size: 24px; margin: 0 0 8px 0;">Aa</p>
            <p style="font-family: monospace; font-size: 12px; color: #6b7280; margin: 0;">${weight} ${name}</p>
            <p style="font-family: monospace; font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">${font}</p>
          </div>
        `).join("")}
      </div>
    `;
    return container;
  },
};
