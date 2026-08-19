// 2026 rebrand: Intake360 → Frontline, Impact Assistants → Staffline.
//
// Blog posts and testimonials are pulled at build time from sources we don't
// control in this repo (HubSpot CMS, BabyLoveGrowth API + its build cache),
// and much of that content still carries the old names. This transform is
// applied to every fetched display field so the rendered site never shows
// old branding, regardless of what the CMS or cache returns. Slugs and URL
// paths under attorneyassistant.com/blog/ are left untouched; retired page
// URLs are rewritten to their new homes (the .htaccess 301s cover anything
// this misses).
export function rebrandText(text: string): string {
  if (!text) return text;
  return text
    .replace(/attorneyassistant\.com\/services\/intake-360/g, "attorneyassistant.com/services/frontline")
    .replace(/attorneyassistant\.com\/lp\/[Ii]ntake360(?![\w-])/g, "attorneyassistant.com/lp/frontline")
    .replace(/attorneyassistant\.com\/[Ii]ntake360(?![\w-])/g, "attorneyassistant.com/services/frontline")
    .replace(/attorneyassistant\.com\/services\/impact-assistants/g, "attorneyassistant.com/services/staffline")
    .replace(/attorneyassistant\.com\/intake-360-terms/g, "attorneyassistant.com/frontline-terms")
    .replace(/INTAKE ?360/g, "FRONTLINE")
    .replace(/Intake ?360/g, "Frontline")
    .replace(/([Aa])n Impact Assistant/g, "$1 Staffline Assistant")
    .replace(/([Aa])n impact assistant/g, "$1 Staffline assistant")
    .replace(/IMPACT ASSISTANT(S?)/g, "STAFFLINE ASSISTANT$1")
    .replace(/Impact Assistant(s?)/g, "Staffline Assistant$1")
    .replace(/Impact assistant(s?)/g, "Staffline assistant$1")
    .replace(/impact assistant(s?)/g, "Staffline assistant$1");
}
