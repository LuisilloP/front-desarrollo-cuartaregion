import { env } from "../lib/env";

// Resolve dominio público: primero env vars, luego SITE de Astro, luego fallback fijo.
const siteUrl = env.siteUrl || import.meta.env.SITE || "https://aliadodigital.cl";

// Bots que recolectan contenido para ENTRENAR modelos de IA: bloqueados.
// Los bots que buscan en tiempo real para RESPONDER y citar fuentes
// (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User,
// Claude-SearchBot, Claude-User) quedan permitidos por la regla general,
// para que el sitio pueda aparecer como fuente en ChatGPT, Perplexity y Claude.
const aiTrainingCrawlers = [
  "GPTBot", // OpenAI (entrenamiento)
  "Google-Extended", // Google (entrenamiento de Gemini; no afecta Google Search)
  "Applebot-Extended", // Apple (entrenamiento)
  "ClaudeBot", // Anthropic (entrenamiento)
  "anthropic-ai",
  "CCBot", // Common Crawl
  "meta-externalagent", // Meta (entrenamiento)
  "Bytespider", // ByteDance
  "omgilibot"
];

export function GET() {
  const lines: string[] = [
    "# robots.txt generado por Astro",
    "User-agent: *",
    "Allow: /",
    ""
  ];

  aiTrainingCrawlers.forEach((agent) => {
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
