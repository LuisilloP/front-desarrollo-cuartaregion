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
        primary: "#1E3A8A", // azul profundo
        secondary: "#0B1220", // base
        accent: "#F2C14F", // dorado cálido
        muted: "#111827",
        highlight: "#60A5FA" // azul claro para detalles
      },
      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
