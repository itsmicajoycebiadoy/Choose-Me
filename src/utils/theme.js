// Centralized theme values so colors/icons stay consistent across the app.

export const THEME = {
  // global accents
  correct: {
    color: "#2ED573",
    glow: "rgba(46,213,115,0.5)",
    glowSoft: "rgba(46,213,115,0.15)",
  },
  wrong: {
    color: "#FF4757",
    glow: "rgba(255,71,87,0.5)",
    glowSoft: "rgba(255,71,87,0.15)",
  },
  timeout: {
    color: "#FFA502",
    glow: "rgba(255,165,2,0.5)",
    glowSoft: "rgba(255,165,2,0.15)",
  },

  // app base
  glassBg: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.12)",

  // button gradients
  primaryGradient: "linear-gradient(135deg, #A55EEA, #6C5CE7)",
  retryGradient: "linear-gradient(135deg, #FF4757, #FF6B81)",
  changeColorGradient: "linear-gradient(135deg, #FFA502, #FFB633)",

  // small layout breakpoints we’ll use in CSS-in-JS style objects (via clamp/auto-fit)
  chatMaxWidth: 320,
};

export const ICONS = {
  correct: "✅",
  wrong: "❌",
  timeout: "⏱️",
};

