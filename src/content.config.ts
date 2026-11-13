import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { slugsCategorias } from "./data/blog";

/**
 * Blog en MDX: cada artículo es un archivo en src/content/blog/<slug>.mdx.
 * El nombre del archivo es la URL: /blog/<slug>.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().max(110),
    /** Meta description y resumen en el listado (máx. ~160 caracteres). */
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(slugsCategorias),
    tags: z.array(z.string()).default([]),
    /** Nombre del autor; si se omite, firma el equipo. */
    author: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Preguntas frecuentes al final del artículo (generan schema FAQPage). */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    /** true = aparece primero y grande en /blog. */
    destacado: z.boolean().default(false),
    /** true = no se publica (no aparece en listados, RSS ni sitemap). */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
