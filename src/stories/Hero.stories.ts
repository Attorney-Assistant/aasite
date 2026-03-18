import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Hero",
};

export default meta;

type Story = StoryObj;

export const HeroDefault: Story = {
  name: "Default (Navy Gradient)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: linear-gradient(135deg, #1a3a5c, #50a7dd); padding: 80px 0; color: white;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
          <div style="max-width: 700px;">
            <h1 style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 48px; line-height: 1.1; margin: 0 0 24px 0;">
              Streamline Your Legal Operations
            </h1>
            <p style="font-family: Roboto, sans-serif; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.8); margin: 0 0 32px 0;">
              Attorney Assistant provides expert legal support services that help law firms reduce overhead, improve intake, and deliver better outcomes for clients.
            </p>
            <button style="background: #ffaa2b; color: #0b0000; border: none; padding: 14px 28px; border-radius: 8px; font-family: Poppins, sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
              Learn More
            </button>
          </div>
        </div>
      </section>
    `;
    return container;
  },
};

export const HeroWithSubtitle: Story = {
  name: "Service Page Hero",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: linear-gradient(135deg, #1a3a5c, #50a7dd); padding: 80px 0; color: white;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
          <div style="max-width: 700px;">
            <h1 style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 48px; line-height: 1.1; margin: 0 0 24px 0;">
              24/7 Intake
            </h1>
            <p style="font-family: Roboto, sans-serif; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.8); margin: 0 0 32px 0;">
              Never miss another lead. Our comprehensive intake service captures every call, qualifies every prospect, and feeds your pipeline 24/7.
            </p>
            <button style="background: #ffaa2b; color: #0b0000; border: none; padding: 14px 28px; border-radius: 8px; font-family: Poppins, sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
              Get Started
            </button>
          </div>
        </div>
      </section>
    `;
    return container;
  },
};

export const CTABannerDefault: Story = {
  name: "CTA Banner (Navy)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #1a3a5c; padding: 64px 0; color: white; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Ready to Transform Your Practice?
          </h2>
          <p style="font-family: Roboto, sans-serif; font-size: 18px; color: rgba(255,255,255,0.8); margin: 0 0 32px 0;">
            Get in touch to learn how Attorney Assistant can streamline your legal operations.
          </p>
          <button style="background: #ffaa2b; color: #0b0000; border: none; padding: 16px 32px; border-radius: 8px; font-family: Poppins, sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Contact Us
          </button>
        </div>
      </section>
    `;
    return container;
  },
};

export const CTABannerGold: Story = {
  name: "CTA Banner (Gold)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #ffaa2b; padding: 64px 0; color: #0b0000; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Not Sure Which Service Is Right?
          </h2>
          <p style="font-family: Roboto, sans-serif; font-size: 18px; opacity: 0.9; margin: 0 0 32px 0;">
            Schedule a free consultation and we'll help you find the perfect solution for your firm.
          </p>
          <button style="background: #0b0000; color: #ffffff; border: none; padding: 16px 32px; border-radius: 8px; font-family: Poppins, sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Schedule Consultation
          </button>
        </div>
      </section>
    `;
    return container;
  },
};

export const CTABannerBlue: Story = {
  name: "CTA Banner (Blue)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #50a7dd; padding: 64px 0; color: white; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Add a Dedicated Assistant to Your Team
          </h2>
          <p style="font-family: Roboto, sans-serif; font-size: 18px; opacity: 0.9; margin: 0 0 32px 0;">
            Free up your attorneys to focus on practicing law while we handle the rest.
          </p>
          <button style="background: #ffaa2b; color: #0b0000; border: none; padding: 16px 32px; border-radius: 8px; font-family: Poppins, sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Get Started
          </button>
        </div>
      </section>
    `;
    return container;
  },
};
