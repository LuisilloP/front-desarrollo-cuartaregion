import { SITE } from "astro:env";
import { env } from "../lib/env";

// Resolve dominio público: primero env vars, luego SITE de Astro, luego fallback fijo.
const siteUrl = env.siteUrl || SITE?.toString?.() || "https://aliadodigital.cl";

// Common generative-AI crawlers we want to block using valid robots directives.
const aiCrawlers = [
  "GPTBot", // OpenAI
  "ChatGPT-User",
  "Google-Extended",
  "CCBot", // Common Crawl
  "anthropic-ai",
  "PerplexityBot",
  "omgili", // Diffbot/Thene
  "omgili bot"
];

export function GET() {
  const lines: string[] = [
    "# robots.txt generado por Astro",
    "# Directivas no estandar como 'Content-Signal' se eliminaron para evitar errores de validacion.",
    "User-agent: *",
    "Allow: /",
    ""
  ];

  aiCrawlers.forEach((agent) => {
    lines.push(`User-agent: ${agent}`);
    lines.push("Disallow: /");
    lines.push("");
  });

  lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);

  const body = lines.join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
