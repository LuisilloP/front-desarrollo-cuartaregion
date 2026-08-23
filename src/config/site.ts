export const SITE_DEFAULTS = {
  siteName: "Agencia Digital",
  tagline: "Webs y automatizaciones que venden",
  region: "La Serena",
  whatsappNumber: "56975274598",
  // Must be a raster image: Facebook, LinkedIn and WhatsApp do not render SVG
  // in link previews, and Google ignores SVG for rich results.
  defaultOgImage: "/og-default.png",
  blogPageSize: 6
} as const;
