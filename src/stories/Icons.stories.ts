import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Brand/Icons",
};

export default meta;

type Story = StoryObj;

const businessIcons = [
  "analityc", "bank", "bearish", "bullish", "business bag", "business document",
  "cahs out", "chart", "coins", "exchange", "finance guard", "fund",
  "group", "hand shake", "investation", "locker", "money bag", "piggy bank",
  "refund money", "report business", "stick chart", "target", "transfer money", "wallet",
];

const legalIcons = [
  "banking law", "book law", "business law", "certificate", "crime",
  "document police", "gender equality", "hammer", "international law", "law scale",
  "lawyer 1", "lawyer 2", "online law", "paten law", "police file",
  "police note", "prison", "property law", "research file", "shield",
  "trust", "umbrella", "withness 1", "withness 2",
];

function iconCard(src: string, name: string, bg: string = "#f9fafb"): string {
  return `
    <div style="text-align: center; padding: 16px; background: ${bg}; border-radius: 10px; border: 1px solid #eaecf0;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 8px;">
        <img src="${src}" alt="${name}" style="width: 28px; height: 28px;" />
      </div>
      <p style="font-family: 'Inter', monospace; font-size: 10px; color: #98a2b3; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${name}</p>
    </div>
  `;
}

export const CustomIcons: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "1000px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #101828;">Custom Icon Library</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; margin-bottom: 32px;">48 custom SVG icons in two categories. Located at <code style="font-size: 12px; background: #f2f4f7; padding: 2px 6px; border-radius: 4px;">/icons/</code></p>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Business & Finance</h3>
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 40px;">
        ${businessIcons.map(name => iconCard(`/icons/buiness & finance_${name}.svg`, name)).join("")}
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Law & Legal</h3>
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 40px;">
        ${legalIcons.map(name => iconCard(`/icons/law and legal_${name}.svg`, name)).join("")}
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Icon Sizes</h3>
      <div style="display: flex; align-items: end; gap: 24px; margin-bottom: 40px;">
        ${[20, 24, 28, 36, 48].map(size => `
          <div style="text-align: center;">
            <img src="/icons/law and legal_shield.svg" alt="shield" style="width: ${size}px; height: ${size}px;" />
            <p style="font-family: 'Inter', monospace; font-size: 11px; color: #98a2b3; margin: 8px 0 0;">${size}px</p>
          </div>
        `).join("")}
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Featured Icon Containers</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 13px; color: #667085; margin-bottom: 16px;">Icons wrapped in <code style="font-size: 12px; background: #f2f4f7; padding: 2px 6px; border-radius: 4px;">.featured-icon</code> containers with background variants.</p>
      <div style="display: flex; align-items: end; gap: 20px; margin-bottom: 40px;">
        ${[
          { label: "brand", bg: "#e1eff9", border: "#c3dff3", icon: "law and legal_law scale" },
          { label: "gold", bg: "#fff8ec", border: "rgba(249,166,48,0.2)", icon: "buiness & finance_target" },
          { label: "gray", bg: "#f2f4f7", border: "#eaecf0", icon: "buiness & finance_chart" },
          { label: "navy", bg: "#1a3a5c", border: "#1a3a5c", icon: "buiness & finance_analityc", filter: "brightness(0) invert(1)" },
          { label: "success", bg: "#ecfdf3", border: "#dcfae6", icon: "law and legal_certificate" },
        ].map(v => `
          <div style="text-align: center;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: ${v.bg}; border: 1px solid ${v.border}; border-radius: 12px; margin-bottom: 8px;">
              <img src="/icons/${v.icon}.svg" alt="" style="width: 28px; height: 28px; ${v.filter ? `filter: ${v.filter};` : ''}" />
            </div>
            <p style="font-family: 'Inter', monospace; font-size: 10px; color: #98a2b3; margin: 0;">${v.label}</p>
          </div>
        `).join("")}
      </div>

      <h3 style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1a3a5c;">Recoloring with CSS Filter</h3>
      <div style="display: flex; gap: 20px; margin-bottom: 16px;">
        ${[
          { label: "Default", filter: "none" },
          { label: "White", filter: "brightness(0) invert(1)" },
          { label: "Gold", filter: "brightness(0) saturate(100%) invert(58%) sepia(98%) saturate(1000%) hue-rotate(6deg) brightness(103%) contrast(101%)" },
          { label: "Navy", filter: "brightness(0) saturate(100%) invert(20%) sepia(30%) saturate(1200%) hue-rotate(175deg) brightness(95%)" },
        ].map(v => `
          <div style="text-align: center; padding: 16px; background: ${v.label === 'White' ? '#1a3a5c' : '#f9fafb'}; border-radius: 10px; border: 1px solid #eaecf0;">
            <img src="/icons/law and legal_hammer.svg" alt="" style="width: 28px; height: 28px; filter: ${v.filter};" />
            <p style="font-family: 'Inter', monospace; font-size: 10px; color: ${v.label === 'White' ? '#98a2b3' : '#98a2b3'}; margin: 8px 0 0;">${v.label}</p>
          </div>
        `).join("")}
      </div>
      <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: #98a2b3;">Use <code style="font-size: 11px; background: #f2f4f7; padding: 2px 6px; border-radius: 4px;">style="filter: brightness(0) invert(1);"</code> for white on dark backgrounds.</p>
    `;
    return container;
  },
};

// Keep legacy Heroicon reference
const heroicons: Record<string, string> = {
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  scale: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  check: "M5 13l4 4L19 7",
  phone: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  star: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
};

export const Heroicons: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.maxWidth = "700px";
    container.innerHTML = `
      <h2 style="font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #101828;">Heroicons (Inline SVG)</h2>
      <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #667085; margin-bottom: 24px;">Used inline in some components. Outline style, stroke-based.</p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
        ${Object.entries(heroicons).map(([name, path]) => `
          <div style="text-align: center; padding: 16px; background: #f9fafb; border-radius: 10px; border: 1px solid #eaecf0;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: rgba(80,167,221,0.1); border-radius: 10px; margin-bottom: 8px;">
              <svg width="24" height="24" fill="none" stroke="#50a7dd" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>
            </div>
            <p style="font-family: 'Inter', monospace; font-size: 10px; color: #98a2b3; margin: 0;">${name}</p>
          </div>
        `).join("")}
      </div>
    `;
    return container;
  },
};
