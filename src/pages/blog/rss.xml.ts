import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { obtenerPosts } from "../../lib/blog";
import { categoriaPorSlug } from "../../data/blog";
import { env } from "../../lib/env";

export async function GET(context: APIContext) {
  const posts = await obtenerPosts();
  const site = env.siteUrl || context.site?.toString() || "https://aliadodigital.cl";

  return rss({
    title: "Blog de Aliado Digital",
    description:
      "Guías prácticas para pymes: páginas web, campañas, WhatsApp y la Ley 21.719 de datos personales.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [categoriaPorSlug(post.data.category)?.nombre ?? post.data.category],
    })),
    customData: "<language>es-cl</language>",
  });
}
