import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Cards",
};

export default meta;

type Story = StoryObj;

export const BlogCard: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "360px";
    container.innerHTML = `
      <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f3f4f6;">
        <div style="background: #e5e7eb; height: 192px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-family: Poppins, sans-serif;">
          Featured Image
        </div>
        <div style="padding: 20px;">
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 12px; font-weight: 500; color: #50a7dd; background: #eff6ff; padding: 4px 8px; border-radius: 4px;">Legal Tips</span>
          </div>
          <h3 style="font-family: Poppins, sans-serif; font-weight: 600; font-size: 18px; margin: 0 0 8px 0; color: #0b0000;">
            5 Ways to Streamline Your Client Intake Process
          </h3>
          <p style="font-family: Roboto, sans-serif; font-size: 14px; color: #6b7280; margin: 0 0 12px 0; line-height: 1.5;">
            Learn how modern law firms are transforming their intake workflows to capture more leads and improve client experience.
          </p>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #9ca3af;">
            <span>Jane Smith</span>
            <span>&middot;</span>
            <span>March 1, 2026</span>
          </div>
        </div>
      </div>
    `;
    return container;
  },
};

export const TestimonialCard: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "400px";
    container.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f3f4f6;">
        <div style="display: flex; gap: 4px; margin-bottom: 12px;">
          ${Array.from({ length: 5 }).map((_, i) => `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="${i < 5 ? '#ffaa2b' : '#e5e7eb'}">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          `).join("")}
        </div>
        <blockquote style="font-family: Roboto, sans-serif; font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 16px 0;">
          &ldquo;Attorney Assistant's 24/7 intake service transformed our practice. We went from missing 40% of after-hours calls to capturing every single lead. Our revenue increased 35% in the first quarter.&rdquo;
        </blockquote>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #588aa5; display: flex; align-items: center; justify-content: center; color: white; font-family: Poppins, sans-serif; font-weight: 600; font-size: 14px;">MR</div>
          <div>
            <p style="font-family: Poppins, sans-serif; font-weight: 600; font-size: 14px; margin: 0; color: #0b0000;">Michael Rodriguez</p>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Managing Partner, Rodriguez Law</p>
          </div>
        </div>
      </div>
    `;
    return container;
  },
};

export const FeatureCard: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "300px";
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(80, 167, 221, 0.1); border-radius: 12px; margin-bottom: 16px;">
          <svg width="28" height="28" fill="none" stroke="#50a7dd" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <h3 style="font-family: Poppins, sans-serif; font-weight: 600; font-size: 18px; margin: 0 0 8px 0; color: #0b0000;">Quality Assurance</h3>
        <p style="font-family: Roboto, sans-serif; font-size: 14px; color: #6b7280; line-height: 1.5; margin: 0;">Rigorous quality control processes ensure accuracy, compliance, and consistently high standards across all deliverables.</p>
      </div>
    `;
    return container;
  },
};
