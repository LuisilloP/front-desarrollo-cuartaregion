import { env } from "../lib/env";

const siteUrl = env.siteUrl || "https://example.com";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" }
  });
}
