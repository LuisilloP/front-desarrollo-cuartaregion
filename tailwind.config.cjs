const themes = {
  light: {
    surface: "246 247 249",
    surfaceStrong: "231 235 242",
    card: "255 255 255",
    cardAlpha: "1",
    border: "218 224 236",
    content: "13 20 33",
    muted: "88 102 130",
    pill: "235 241 249",
    pillAlpha: "1",
    pillBorder: "218 224 236",
    primary: "20 76 167",
    secondary: "10 18 32",
    accent: "9 125 127",
    highlight: "122 207 214",
    contrast: "255 255 255"
  },
  dark: {
    surface: "9 12 18",
    surfaceStrong: "15 21 32",
    card: "17 24 38",
    cardAlpha: "0.92",
    border: "37 48 70",
    content: "226 232 240",
    muted: "150 163 184",
    pill: "17 24 38",
    pillAlpha: "0.75",
    pillBorder: "37 48 70",
    primary: "45 108 201",
    secondary: "9 12 18",
    accent: "13 159 164",
    highlight: "125 216 224",
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
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        display: ['"Space Grotesk"', '"Manrope"', "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
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
        soft: "0 24px 60px rgba(15,23,42,0.08)"
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
