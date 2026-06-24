// Official brand palette — AA Comic Web Style Guide v2 (canonical source of truth).
export const brand = {
  navy: "#1A3A5C",
  deep: "#071B2F",
  skyline: "#0D1A27",
  gold: "#F9A630",
  goldDark: "#D98A00",
  goldLight: "#FEF6E8",
  blue: "#50A7DD",
  steel: "#58BAA5",
  ink: "#050505",
  white: "#ffffff",
} as const;

// Comic system colors (component internals). Brand-shared values mirror `brand`;
// `goldBright` and `red` are comic accents not in the core brand palette.
export const colors = {
  navy: brand.skyline, navyDeep: brand.deep, navyMid: brand.navy,
  gold: brand.gold, goldDark: brand.goldDark, goldLight: brand.goldLight,
  goldBright: "#FBD46D",
  red: "#E04A2C", redBright: "#FF6B45",
  blue: brand.blue, steel: "#c0c8d4", steelDim: "#6f7a8a",
  paper: brand.goldLight, ink: brand.ink, white: "#ffffff",
} as const;

export const fonts = {
  display: "'Bangers', cursive",      // hero impact
  structure: "'Sora', sans-serif",    // subheads, nav, buttons, labels, badges
  body: "'Inter', sans-serif",        // body, forms, tables
} as const;

export const tokens = { brand, colors, fonts } as const;
