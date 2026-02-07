import { fetchGraphQL, withFallback } from "../strapi";
import type { Paginated, Pagination, Post } from "../types";
import { buildPostsQuery, mapPost, mockDomainFallbacks, mockPostsPage, type FetchPostsParams, type StrapiPost } from "./contracts";
import { POST_FIELDS } from "./queries";

export type { FetchPostsParams } from "./contracts";

const fetchPostsPageRaw = async (params: FetchPostsParams): Promise<Paginated<Post>> => {
  const { query, variables, page, pageSize } = buildPostsQuery(params);
  const data = await fetchGraphQL<{ posts_connection: { nodes: StrapiPost[]; pageInfo: Pagination } }>(
    "PostsPage",
    query,
    variables
  );

  const items = (data.posts_connection?.nodes ?? []).map(mapPost);
  const pagination = data.posts_connection?.pageInfo ?? {
    page,
    pageSize,
    pageCount: 1,
    total: items.length
  };

  return { data: items, pagination };
};

export const fetchPostsPage = async (params: FetchPostsParams = {}): Promise<Paginated<Post>> =>
  withFallback(() => fetchPostsPageRaw(params), mockPostsPage(params));

export const fetchAllPosts = async (params: Omit<FetchPostsParams, "page"> = {}): Promise<Post[]> =>
  withFallback(
    async () => {
      const pageSize = params.pageSize ?? 100;
      let page = 1;
      let pageCount = 1;
      const results: Post[] = [];

      do {
        const response = await fetchPostsPageRaw({ ...params, page, pageSize });
        results.push(...response.data);
        pageCount = response.pagination.pageCount;
        page += 1;
      } while (page <= pageCount);

      return results;
    },
    mockDomainFallbacks.mockPosts
  );

export const fetchPostBySlug = async (slug: string): Promise<Post | null> =>
  withFallback(
    async () => {
      const query = `
        query PostBySlug($slug: String!) {
          posts(filters: { slug: { eq: $slug }, publishedAt: { notNull: true } }) {
            ${POST_FIELDS}
          }
        }
      `;
      const data = await fetchGraphQL<{ posts: StrapiPost[] }>("PostBySlug", query, { slug });
      const item = data.posts[0];
      return item ? mapPost(item) : null;
    },
    mockDomainFallbacks.mockPosts.find((post) => post.slug === slug) ?? null
  );
