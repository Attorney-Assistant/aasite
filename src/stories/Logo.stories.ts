import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Logo",
};

export default meta;

type Story = StoryObj;

const logos = [
  { file: "long_color_logo.svg", label: "Horizontal — Full Color", bg: "white", text: "#101828" },
  { file: "long_black_logo.svg", label: "Horizontal — Black", bg: "white", text: "#101828" },
  { file: "long_white_logo.svg", label: "Horizontal — White", bg: "#1a3a5c", text: "white" },
  { file: "long_color_logo.png", label: "Horizontal — Full Color PNG", bg: "white", text: "#101828" },
  { file: "long_color_logo.webp", label: "Horizontal — Full Color WebP", bg: "white", text: "#101828" },
  { file: "tall_color_logo.svg", label: "Vertical — Full Color", bg: "white", text: "#101828" },
  { file: "tall_black_logo.svg", label: "Vertical — Black", bg: "white", text: "#101828" },
  { file: "tall_white_logo.svg", label: "Vertical — White", bg: "#1a3a5c", text: "white" },
  { file: "square_fullcolor_logo.svg", label: "Square — Full Color", bg: "white", text: "#101828" },
  { file: "square_fullcolor_logo.png", label: "Square — Full Color PNG", bg: "white", text: "#101828" },
];

const iconVariants = [
  { file: "color_icon.svg", label: "Icon — Color SVG", bg: "white", text: "#101828" },
  { file: "color_icon.png", label: "Icon — Color PNG", bg: "white", text: "#101828" },
  { file: "color_icon.webp", label: "Icon — Color WebP", bg: "white", text: "#101828" },
  { file: "black_icon.svg", label: "Icon — Black SVG", bg: "white", text: "#101828" },
  { file: "black_icon.png", label: "Icon — Black PNG", bg: "white", text: "#101828" },
  { file: "white_icon.svg", label: "Icon — White SVG", bg: "#1a3a5c", text: "white" },
  { file: "white_icon.png", label: "Icon — White PNG", bg: "#1a3a5c", text: "white" },
];

function logoCard(logo: { file: string; label: string; bg: string; text: string }, maxH: string = "80px"): string {
  return `
    <div style="border: 1px solid #eaecf0; border-radius: 12px; overflow: hidden;">
      <div style="background: ${logo.bg}; padding: 32px; display: flex; align-items: center; justify-content: center; min-height: 120px;">
        <img src="/brand/logos/${logo.file}" alt="${logo.label}" style="max-height: ${maxH}; max-width: 100%;" />
      </div>
      <div style="padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #eaecf0; background: #fafafa;">
        <span style="font-family: 'Inter', sans-serif; font-size: 12px; color: #667085;">${logo.label}</span>
        <a href="/brand/logos/${logo.file}" download style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; color: #1a3a5c; text-decoration: none; padding: 4px 10px; border: 1px solid #d0d5dd; border-radius: 6px;">Download</a>
      </div>
    </div>
  `;
}

export const AllLogos: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "960px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #101828;">Logo Variants</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; margin-bottom: 32px;">All logo files available in SVG, PNG, and WebP. Located at <code style="font-size: 12px; background: #f2f4f7; padding: 2px 6px; border-radius: 4px;">/brand/logos/</code></p>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Full Logos</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px;">
        ${logos.map(l => logoCard(l)).join("")}
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Icon / Favicon Variants</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px;">
        ${iconVariants.map(l => logoCard(l, "64px")).join("")}
      </div>

      <div style="background: #f9fafb; border: 1px solid #eaecf0; border-radius: 12px; padding: 20px;">
        <h3 style="font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 12px; color: #101828;">Usage Guidelines</h3>
        <ul style="font-family: 'Inter', sans-serif; font-size: 13px; color: #667085; list-style: disc; padding-left: 20px; line-height: 1.8; margin: 0;">
          <li>Full-color logo on white or light backgrounds</li>
          <li>White logo on dark, navy, or photo backgrounds</li>
          <li>Icon/favicon variant for small spaces (social avatars, browser tabs)</li>
          <li>SVG preferred for web, PNG/WebP for social and email</li>
          <li>Never stretch, rotate, recolor, or add effects</li>
          <li>Maintain clear space equal to the icon height around the logo</li>
        </ul>
      </div>
    `;
    return container;
  },
};
