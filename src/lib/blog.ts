import { getCollection, type CollectionEntry } from "astro:content";

export type PostBlog = CollectionEntry<"blog">;

/** Artículos publicados (sin borradores), del más nuevo al más antiguo. */
export const obtenerPosts = async (): Promise<PostBlog[]> =>
  (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

/**
 * Relacionados: primero los de la misma categoría, luego los que comparten
 * etiquetas, y si faltan, los más recientes.
 */
export const postsRelacionados = (actual: PostBlog, todos: PostBlog[], cantidad = 3) => {
  const otros = todos.filter((post) => post.id !== actual.id);
  const puntaje = (post: PostBlog) =>
    (post.data.category === actual.data.category ? 10 : 0) +
    post.data.tags.filter((tag) => actual.data.tags.includes(tag)).length;
  return [...otros]
    .sort((a, b) => puntaje(b) - puntaje(a) || b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, cantidad);
};
