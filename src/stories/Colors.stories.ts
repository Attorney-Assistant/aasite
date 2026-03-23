import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Colors",
};

export default meta;

type Story = StoryObj;

function createColorSwatch(name: string, hex: string, tailwindClass: string, usage: string): string {
  return `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
      <div style="width: 80px; height: 80px; border-radius: 12px; background: ${hex}; border: 1px solid #e5e7eb; flex-shrink: 0;"></div>
      <div>
        <p style="font-family: 'Sora', sans-serif; font-size: 16px; margin: 0 0 4px 0;">${name}</p>
        <p style="font-family: monospace; font-size: 14px; color: #6b7280; margin: 0 0 2px 0;">${hex}</p>
        <p style="font-family: monospace; font-size: 12px; color: #9ca3af; margin: 0 0 2px 0;">${tailwindClass}</p>
        <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #6b7280; margin: 0;">${usage}</p>
      </div>
    </div>
  `;
}

export const ColorPalette: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "600px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; margin-bottom: 24px;">Brand Color Palette</h2>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin: 32px 0 16px 0; border-bottom: 2px solid #F9A630; padding-bottom: 8px;">Primary Colors</h3>
      ${createColorSwatch("Brand Black", "#0b0000", "brand-black", "Primary text, dark backgrounds, headers")}
      ${createColorSwatch("Brand White", "#ffffff", "brand-white", "Backgrounds, light text on dark surfaces")}
      ${createColorSwatch("Brand Gold", "#F9A630", "brand-gold", "Primary CTA buttons, accent highlights, star ratings")}

      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin: 32px 0 16px 0; border-bottom: 2px solid #50a7dd; padding-bottom: 8px;">Secondary Colors</h3>
      ${createColorSwatch("Brand Blue", "#50a7dd", "brand-blue", "Links, secondary buttons, active nav states, floating orb animations")}
      ${createColorSwatch("Brand Steel", "#588aa5", "brand-steel", "Subtle accents, secondary text on dark backgrounds")}
      ${createColorSwatch("Brand Navy", "#1a3a5c", "brand-navy", "Hero overlays, dark section backgrounds, progress indicators")}

      <h3 style="font-family: 'Sora', sans-serif; font-size: 18px; margin: 32px 0 16px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Color Combinations</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;">
        <div style="background: #0b0000; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center;">
          <p style="font-family: 'Sora', sans-serif; margin: 0 0 4px 0;">White on Black</p>
          <p style="font-size: 12px; margin: 0; opacity: 0.7;">Footer, hero sections</p>
        </div>
        <div style="background: #0b0000; color: #F9A630; padding: 20px; border-radius: 12px; text-align: center;">
          <p style="font-family: 'Sora', sans-serif; margin: 0 0 4px 0;">Gold on Black</p>
          <p style="font-size: 12px; margin: 0; color: #9ca3af;">Footer headings</p>
        </div>
        <div style="background: #ffffff; color: #0b0000; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; text-align: center;">
          <p style="font-family: 'Sora', sans-serif; margin: 0 0 4px 0;">Black on White</p>
          <p style="font-size: 12px; margin: 0; color: #6b7280;">Body text</p>
        </div>
        <div style="background: #50a7dd; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center;">
          <p style="font-family: 'Sora', sans-serif; margin: 0 0 4px 0;">White on Blue</p>
          <p style="font-size: 12px; margin: 0; opacity: 0.8;">CTA variant</p>
        </div>
      </div>
    `;
    return container;
  },
};
