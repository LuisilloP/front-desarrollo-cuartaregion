import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { visualizer } from "rollup-plugin-visualizer";

const shouldAnalyze = process.env.ANALYZE === "true";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://aliadodigital.cl", // Actualizar al dominio real para sitemap/OG.
  integrations: [tailwind(), icon(), react(), mdx()],
  output: "static", // Cambia a "server" para SSR si lo necesitas.
  redirects: {
    "/linktree": "/enlace",
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        plugins: shouldAnalyze
          ? [
              visualizer({
                filename: "dist/bundle-report.html",
                gzipSize: true,
                brotliSize: true,
                open: false,
              }),
            ]
          : [],
      },
    },
  },
};
