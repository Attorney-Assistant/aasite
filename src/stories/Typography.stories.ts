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
      <h2 style="font-family: Poppins, sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 32px;">Typography Scale</h2>

      <h3 style="font-family: Poppins, sans-serif; font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Headings — Poppins</h3>
      <div style="margin-bottom: 40px;">
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">H1 — 48px/60px Bold</p>
          <h1 style="font-family: Poppins, sans-serif; font-size: 48px; line-height: 60px; font-weight: 700; margin: 0; color: #0b0000;">Streamline Your Legal Operations</h1>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">H2 — 36px/44px Bold</p>
          <h2 style="font-family: Poppins, sans-serif; font-size: 36px; line-height: 44px; font-weight: 700; margin: 0; color: #0b0000;">Why Attorney Assistant?</h2>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">H3 — 24px/32px SemiBold</p>
          <h3 style="font-family: Poppins, sans-serif; font-size: 24px; line-height: 32px; font-weight: 600; margin: 0; color: #0b0000;">24/7 Intake Service</h3>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">H4 — 20px/28px SemiBold</p>
          <h4 style="font-family: Poppins, sans-serif; font-size: 20px; line-height: 28px; font-weight: 600; margin: 0; color: #0b0000;">Feature Heading</h4>
        </div>
      </div>

      <h3 style="font-family: Poppins, sans-serif; font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Body — Roboto</h3>
      <div style="margin-bottom: 40px;">
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body Large — 18px/28px Regular</p>
          <p style="font-family: Roboto, sans-serif; font-size: 18px; line-height: 28px; font-weight: 400; margin: 0; color: #0b0000;">Attorney Assistant provides expert legal support services that help law firms reduce overhead, improve intake, and deliver better outcomes for clients.</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body — 16px/24px Regular</p>
          <p style="font-family: Roboto, sans-serif; font-size: 16px; line-height: 24px; font-weight: 400; margin: 0; color: #0b0000;">Our trained intake specialists handle calls 24/7 with bilingual support, CRM integration, and custom scripts tailored to your practice areas.</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Body Small — 14px/20px Regular</p>
          <p style="font-family: Roboto, sans-serif; font-size: 14px; line-height: 20px; font-weight: 400; margin: 0; color: #6b7280;">Published March 4, 2026 · 5 min read</p>
        </div>
        <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 4px 0;">Caption — 12px/16px Medium</p>
          <p style="font-family: Roboto, sans-serif; font-size: 12px; line-height: 16px; font-weight: 500; margin: 0; color: #9ca3af;">LEGAL OPERATIONS · INTAKE</p>
        </div>
      </div>

      <h3 style="font-family: Poppins, sans-serif; font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Font Weights</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${[
          { weight: 300, name: "Light", font: "Roboto" },
          { weight: 400, name: "Regular", font: "Roboto" },
          { weight: 500, name: "Medium", font: "Roboto/Poppins" },
          { weight: 600, name: "SemiBold", font: "Poppins" },
          { weight: 700, name: "Bold", font: "Poppins" },
          { weight: 800, name: "ExtraBold", font: "Poppins" },
        ].map(({ weight, name, font }) => `
          <div style="text-align: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
            <p style="font-family: ${font.split("/")[0]}, sans-serif; font-weight: ${weight}; font-size: 24px; margin: 0 0 8px 0;">Aa</p>
            <p style="font-family: monospace; font-size: 12px; color: #6b7280; margin: 0;">${weight} ${name}</p>
            <p style="font-family: monospace; font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">${font}</p>
          </div>
        `).join("")}
      </div>
    `;
    return container;
  },
};
