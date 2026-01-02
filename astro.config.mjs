import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://example.com", // Actualizar al dominio real para sitemap/OG.
  integrations: [tailwind(), icon(), react()],
  output: "static" // Cambia a "server" para SSR si lo necesitas.
};
