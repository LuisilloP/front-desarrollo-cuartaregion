import tailwind from "@astrojs/tailwind";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://example.com", // Actualizar al dominio real para sitemap/OG.
  integrations: [tailwind()],
  output: "static" // Cambia a "server" para SSR si lo necesitas.
};
