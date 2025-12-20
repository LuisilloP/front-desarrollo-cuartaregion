import { env } from "../lib/env";

const SITE_URL = env.siteUrl || "https://example.com";
const routes = ["/", "/privacidad", "/terminos"];

export function GET() {
  const urls = routes
    .map(
      (path) => `<url>
  <loc>${SITE_URL}${path}</loc>
  <changefreq>weekly</changefreq>
  <priority>${path === "/" ? "1.0" : "0.6"}</priority>
</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
}
