const themes = {
  light: {
    surface: "246 248 252",
    surfaceStrong: "229 234 243",
    card: "255 255 255",
    cardAlpha: "1",
    border: "223 231 242",
    content: "12 18 31",
    muted: "83 99 126",
    pill: "232 240 251",
    pillAlpha: "1",
    pillBorder: "223 231 242",
    primary: "59 130 246",
    secondary: "12 18 31",
    accent: "14 165 233",
    highlight: "125 211 252",
    contrast: "255 255 255"
  },
  dark: {
    surface: "7 10 18",
    surfaceStrong: "11 16 28",
    card: "16 23 38",
    cardAlpha: "0.92",
    border: "38 51 74",
    content: "226 232 240",
    muted: "148 163 184",
    pill: "16 23 38",
    pillAlpha: "0.75",
    pillBorder: "38 51 74",
    primary: "59 130 246",
    secondary: "7 10 18",
    accent: "14 165 233",
    highlight: "125 211 252",
    contrast: "255 255 255"
  }
};

const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        surface: withOpacity("--color-surface"),
        "surface-strong": withOpacity("--color-surface-strong"),
        card: withOpacity("--color-card"),
        border: withOpacity("--color-border"),
        content: withOpacity("--color-content"),
        muted: withOpacity("--color-muted"),
        pill: withOpacity("--color-pill"),
        "pill-border": withOpacity("--color-pill-border"),
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        highlight: withOpacity("--color-highlight"),
        contrast: withOpacity("--color-contrast")
      },
      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: [
    function ({ addBase }) {
      const cssVars = (palette) => ({
        "--color-surface": palette.surface,
        "--color-surface-strong": palette.surfaceStrong,
        "--color-card": palette.card,
        "--alpha-card": palette.cardAlpha ?? "1",
        "--color-border": palette.border,
        "--color-content": palette.content,
        "--color-muted": palette.muted,
        "--color-pill": palette.pill,
        "--alpha-pill": palette.pillAlpha ?? "1",
        "--color-pill-border": palette.pillBorder,
        "--color-primary": palette.primary,
        "--color-secondary": palette.secondary,
        "--color-accent": palette.accent,
        "--color-highlight": palette.highlight,
        "--color-contrast": palette.contrast
      });

      addBase({
        ":root": cssVars(themes.light),
        ".dark": cssVars(themes.dark)
      });
    }
  ]
};
