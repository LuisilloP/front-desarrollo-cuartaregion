const themes = {
  light: {
    surface: "248 250 252",
    surfaceStrong: "226 232 240",
    card: "255 255 255",
    cardAlpha: "1",
    border: "226 232 240",
    content: "15 23 42",
    muted: "71 85 105",
    pill: "238 242 255",
    pillAlpha: "1",
    pillBorder: "226 232 240",
    primary: "30 58 138",
    secondary: "11 18 32",
    accent: "242 193 79",
    highlight: "96 165 250",
    contrast: "255 255 255"
  },
  dark: {
    surface: "11 18 32",
    surfaceStrong: "11 18 32",
    card: "15 24 40",
    cardAlpha: "0.8",
    border: "31 41 55",
    content: "226 232 240",
    muted: "148 163 184",
    pill: "15 24 40",
    pillAlpha: "0.7",
    pillBorder: "31 41 55",
    primary: "30 58 138",
    secondary: "11 18 32",
    accent: "242 193 79",
    highlight: "96 165 250",
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
