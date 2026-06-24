export const colors = {
  navy: "#0e2236", navyDeep: "#061320", navyMid: "#1a3a5c",
  gold: "#F9A630", goldBright: "#FBD46D",
  red: "#E04A2C", redBright: "#FF6B45",
  blue: "#5087dd", steel: "#c0c8d4", steelDim: "#6f7a8a",
  paper: "#FFF9EE", ink: "#111111", white: "#ffffff",
} as const;

export const fonts = {
  display: "'Bangers', 'Impact', sans-serif",
  subhead: "'Sora', sans-serif",
  body: "'Inter', -apple-system, sans-serif",
} as const;

export const tokens = { colors, fonts } as const;
