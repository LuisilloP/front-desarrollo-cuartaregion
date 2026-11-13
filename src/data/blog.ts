/**
 * Categorías del blog. El `slug` se usa en /blog/categoria/[slug] y en el
 * frontmatter de cada artículo (campo `category`).
 */
export const categoriasBlog = [
  {
    slug: "datos-personales",
    nombre: "Datos personales y Ley 21.719",
    icono: "lucide:shield-check",
    descripcion:
      "Qué exige la nueva ley de protección de datos y cómo adaptar tu web, tus formularios y tu WhatsApp.",
  },
  {
    slug: "paginas-web",
    nombre: "Páginas web",
    icono: "lucide:layout-template",
    descripcion:
      "Cómo planificar, construir y mejorar una página web que traiga consultas a tu negocio.",
  },
  {
    slug: "marketing-digital",
    nombre: "Marketing digital",
    icono: "lucide:megaphone",
    descripcion:
      "Campañas en Meta y Google, redes sociales y Google Business Profile para pymes.",
  },
  {
    slug: "herramientas",
    nombre: "Herramientas y automatización",
    icono: "lucide:workflow",
    descripcion:
      "WhatsApp, CRM, formularios y automatizaciones para ahorrar tiempo en tu negocio.",
  },
] as const;

export type CategoriaBlog = (typeof categoriasBlog)[number]["slug"];

export const slugsCategorias = categoriasBlog.map((c) => c.slug) as [
  CategoriaBlog,
  ...CategoriaBlog[],
];

export const categoriaPorSlug = (slug: string) =>
  categoriasBlog.find((categoria) => categoria.slug === slug);

/** Autor por defecto cuando el artículo no indica uno. */
export const AUTOR_EQUIPO = "Equipo Aliado Digital";

/** Minutos de lectura aproximados (200 palabras por minuto). */
export const minutosLectura = (texto: string) =>
  Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));

export const formatoFecha = (fecha: Date) =>
  fecha.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
