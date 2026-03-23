import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Hero",
};

export default meta;

type Story = StoryObj;

// Orb context summary:
// - Homepage hero: 3 orbs (custom inline, not via Hero.astro)
// - Subpage heroes (Hero.astro): 2 orbs (.hero-orb--1, .hero-orb--2) on white background
// - 404 page: 2 orbs (.notfound-orb), multi-stop keyframes, 0.22 opacity
// - Landing pages: inline orb instances

export const HeroDefault: Story = {
  name: "Default (Navy with Floating Orbs)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <style>
        @keyframes sbFloat1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 20px) scale(1.08); } }
        @keyframes sbFloat2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(25px, -15px) scale(1.1); } }
      </style>
      <section style="background: linear-gradient(135deg, #1a3a5c, #091623); padding: 80px 0; color: white; position: relative; overflow: hidden;">
        <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(80,167,221,0.15) 0%,rgba(80,167,221,0) 65%);top:-30%;right:-5%;animation:sbFloat1 12s ease-in-out infinite;"></div>
        <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(249,166,48,0.12) 0%,rgba(249,166,48,0) 65%);bottom:-25%;left:-5%;animation:sbFloat2 15s ease-in-out infinite;"></div>
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1;">
          <div style="max-width: 700px;">
            <h1 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 48px; line-height: 1.1; margin: 0 0 24px 0;">
              You don't have a lead problem. You have an operations problem.
            </h1>
            <p style="font-family: 'Inter', sans-serif; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.7); margin: 0 0 32px 0;">
              Attorney Assistant handles the intake, follow-up, and admin that law firms consistently fail to execute — so more of your existing leads actually close.
            </p>
            <button style="background: #F9A630; color: #0b0000; border: none; padding: 14px 28px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
              Start Growing Your Firm
            </button>
          </div>
        </div>
      </section>
    `;
    return container;
  },
};

export const HeroLight: Story = {
  name: "Light (Subpage with Floating Orbs)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <style>
        @keyframes sbFloat3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-20px, 15px) scale(1.1); } }
        @keyframes sbFloat4 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(15px, -10px) scale(1.08); } }
      </style>
      <section style="background: white; padding: 64px 0; position: relative; overflow: hidden; border-bottom: 1px solid #eaecf0;">
        <div style="position:absolute;width:450px;height:450px;border-radius:50%;background:radial-gradient(circle,rgba(80,167,221,0.18) 0%,rgba(80,167,221,0) 70%);top:-20%;right:-8%;animation:sbFloat3 12s ease-in-out infinite;"></div>
        <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(249,166,48,0.15) 0%,rgba(249,166,48,0) 70%);bottom:-20%;left:-8%;animation:sbFloat4 15s ease-in-out infinite;"></div>
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px; text-align: center; position: relative; z-index: 1;">
          <span style="display: inline-block; background: #f0f7fc; color: #1a3a5c; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; margin-bottom: 16px;">About Us</span>
          <h1 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 42px; line-height: 1.15; color: #101828; margin: 0 0 16px 0;">
            About Attorney Assistant
          </h1>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; line-height: 1.6; color: #667085; margin: 0;">
            We solve the operational problems that prevent law firms from growing — so your team can focus on practicing law.
          </p>
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

export const CTABannerGold: Story = {
  name: "CTA Banner (Gold)",
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <section style="background: #F9A630; padding: 64px 0; color: #0b0000; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
          <h2 style="font-family: 'Sora', sans-serif; font-weight: 700; font-size: 36px; margin: 0 0 16px 0;">
            Not Sure Where to Start?
          </h2>
          <p style="font-family: 'Inter', sans-serif; font-size: 18px; opacity: 0.9; margin: 0 0 32px 0;">
            Tell us what's not working and we'll show you how to fix it — no pitch, just a straightforward conversation.
          </p>
          <button style="background: #0b0000; color: #ffffff; border: none; padding: 16px 32px; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer;">
            Schedule Consultation
          </button>
        </div>
      </section>
    `;
    return container;
  },
};
