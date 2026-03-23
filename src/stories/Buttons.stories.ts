import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Buttons",
  argTypes: {
    label: { control: "text" },
    size: {
      control: "select",
      options: ["small", "default", "large"],
    },
  },
};

export default meta;

type Story = StoryObj;

function btn(variant: string, label: string, size: string = "default"): string {
  const sizeClasses: Record<string, string> = {
    small: "padding: 8px 16px; font-size: 13px;",
    default: "padding: 12px 24px; font-size: 14px;",
    large: "padding: 16px 32px; font-size: 16px;",
  };

  const variants: Record<string, string> = {
    primary: `
      background: #F9A630; color: #0b0000; border: none;
      font-family: 'Inter', sans-serif; font-weight: 600;
      border-radius: 8px; cursor: pointer;
      ${sizeClasses[size]}
      display: inline-flex; align-items: center; justify-content: center;
    `,
    secondary: `
      background: transparent; color: #50a7dd; border: 2px solid #50a7dd;
      font-family: 'Inter', sans-serif; font-weight: 600;
      border-radius: 8px; cursor: pointer;
      ${sizeClasses[size]}
      display: inline-flex; align-items: center; justify-content: center;
    `,
    dark: `
      background: #0b0000; color: #ffffff; border: none;
      font-family: 'Inter', sans-serif; font-weight: 600;
      border-radius: 8px; cursor: pointer;
      ${sizeClasses[size]}
      display: inline-flex; align-items: center; justify-content: center;
    `,
    ghost: `
      background: transparent; color: #0b0000; border: 1px solid #e5e7eb;
      font-family: 'Inter', sans-serif; font-weight: 500;
      border-radius: 8px; cursor: pointer;
      ${sizeClasses[size]}
      display: inline-flex; align-items: center; justify-content: center;
    `,
  };

  return `<button style="${variants[variant]}">${label}</button>`;
}

export const AllButtons: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "600px";
    container.innerHTML = `
      <h2 style="font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 32px;">Button System</h2>

      <h3 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #50a7dd;">Primary (Gold)</h3>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">Main CTA buttons. Use for the primary action on any page.</p>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 32px;">
        ${btn("primary", "Get Started", "small")}
        ${btn("primary", "Get Started", "default")}
        ${btn("primary", "Schedule Consultation", "large")}
      </div>

      <h3 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #50a7dd;">Secondary (Blue Outline)</h3>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">Secondary actions. Use alongside a primary button or for less prominent actions.</p>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 32px;">
        ${btn("secondary", "Learn More", "small")}
        ${btn("secondary", "Learn More", "default")}
        ${btn("secondary", "Book a Call", "large")}
      </div>

      <h3 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #50a7dd;">Dark</h3>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">Used on gold or light accent backgrounds.</p>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 32px; background: #F9A630; padding: 20px; border-radius: 12px;">
        ${btn("dark", "Contact Us", "small")}
        ${btn("dark", "Contact Us", "default")}
        ${btn("dark", "Get Started Today", "large")}
      </div>

      <h3 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #50a7dd;">Ghost</h3>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">Subtle buttons for tertiary actions, navigation pills, or category filters.</p>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 32px;">
        ${btn("ghost", "All Posts", "small")}
        ${btn("ghost", "Legal Tips", "small")}
        ${btn("ghost", "Operations", "small")}
      </div>

      <h3 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #50a7dd;">Tailwind Classes</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <th style="text-align: left; padding: 8px; font-family: 'Inter', sans-serif;">Variant</th>
            <th style="text-align: left; padding: 8px; font-family: 'Inter', sans-serif;">Class</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Primary</td><td style="padding: 8px; font-family: monospace;">.btn-primary</td></tr>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Secondary</td><td style="padding: 8px; font-family: monospace;">.btn-secondary</td></tr>
          <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px;">Dark</td><td style="padding: 8px; font-family: monospace;">bg-brand-black text-white ...</td></tr>
          <tr><td style="padding: 8px;">Ghost</td><td style="padding: 8px; font-family: monospace;">border border-gray-200 ...</td></tr>
        </tbody>
      </table>
    `;
    return container;
  },
};

export const Primary: Story = {
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = btn("primary", "Get Started");
    return container;
  },
};

export const Secondary: Story = {
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = btn("secondary", "Learn More");
    return container;
  },
};
