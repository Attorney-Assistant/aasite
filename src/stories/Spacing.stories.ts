import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Spacing & Layout",
};

export default meta;

type Story = StoryObj;

export const SpacingAndContainers: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "900px";
    container.innerHTML = `
      <h2 style="font-family: Sora, sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 32px;">Spacing & Layout</h2>

      <h3 style="font-family: Sora, sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Container Widths</h3>
      <div style="margin-bottom: 40px;">
        <div style="background: rgba(80,167,221,0.1); border: 2px dashed #50a7dd; border-radius: 8px; padding: 16px; max-width: 1280px; margin-bottom: 12px;">
          <p style="font-family: monospace; font-size: 12px; color: #50a7dd; margin: 0;"><strong>.container-wide</strong> — max-width: 1280px (80rem)</p>
          <p style="font-family: Inter, sans-serif; font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Feature sections, blog grids, service overviews</p>
        </div>
        <div style="background: rgba(249,166,48,0.1); border: 2px dashed #F9A630; border-radius: 8px; padding: 16px; max-width: 896px; margin-bottom: 12px;">
          <p style="font-family: monospace; font-size: 12px; color: #F9A630; margin: 0;"><strong>.container-narrow</strong> — max-width: 896px (56rem)</p>
          <p style="font-family: Inter, sans-serif; font-size: 13px; color: #6b7280; margin: 4px 0 0 0;">Blog post body, static page content, long-form text</p>
        </div>
      </div>

      <h3 style="font-family: Sora, sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Section Spacing</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 40px;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <th style="text-align: left; padding: 8px; font-family: Sora, sans-serif;">Element</th>
            <th style="text-align: left; padding: 8px; font-family: Sora, sans-serif;">Desktop</th>
            <th style="text-align: left; padding: 8px; font-family: Sora, sans-serif;">Mobile</th>
            <th style="text-align: left; padding: 8px; font-family: Sora, sans-serif;">Tailwind</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Hero sections</td><td style="padding: 8px;">128px / 80px</td><td style="padding: 8px;">80px / 80px</td><td style="padding: 8px; font-family: monospace;">py-20 lg:py-32</td></tr>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Content sections</td><td style="padding: 8px;">96px / 96px</td><td style="padding: 8px;">64px / 64px</td><td style="padding: 8px; font-family: monospace;">py-16 lg:py-24</td></tr>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Section heading gap</td><td style="padding: 8px;">48px</td><td style="padding: 8px;">48px</td><td style="padding: 8px; font-family: monospace;">mb-12</td></tr>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Card grid gap</td><td style="padding: 8px;">24px</td><td style="padding: 8px;">24px</td><td style="padding: 8px; font-family: monospace;">gap-6</td></tr>
          <tr><td style="padding: 8px;">Inline content gap</td><td style="padding: 8px;">32px</td><td style="padding: 8px;">32px</td><td style="padding: 8px; font-family: monospace;">gap-8</td></tr>
        </tbody>
      </table>

      <h3 style="font-family: Sora, sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #50a7dd;">Border Radius</h3>
      <div style="display: flex; gap: 24px; margin-bottom: 40px;">
        ${[
          { radius: "4px", name: "sm", use: "Tags, badges" },
          { radius: "8px", name: "lg", use: "Buttons, inputs" },
          { radius: "12px", name: "xl", use: "Cards, panels" },
          { radius: "9999px", name: "full", use: "Avatars, pills" },
        ].map(({ radius, name, use }) => `
          <div style="text-align: center;">
            <div style="width: 64px; height: 64px; background: #50a7dd; border-radius: ${radius}; margin: 0 auto 8px;"></div>
            <p style="font-family: monospace; font-size: 12px; color: #6b7280; margin: 0;">rounded-${name}</p>
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">${use}</p>
          </div>
        `).join("")}
      </div>
    `;
    return container;
  },
};
