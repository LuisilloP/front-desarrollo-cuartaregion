import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

/** @type {import('astro').AstroUserConfig} */
export default {
  site: "https://example.com", // Actualizar al dominio real para sitemap/OG.
  integrations: [tailwind(), icon()],
  output: "static" // Cambia a "server" para SSR si lo necesitas.
};
