import { env } from "../lib/env";
import { fetchAllPosts, fetchCases, fetchServices } from "../lib/api/services";
import { SITE_DEFAULTS } from "../config/site";

const SITE_URL = (env.siteUrl || import.meta.env.SITE || "https://aliadodigital.cl").replace(/\/$/, "");

type SitemapEntry = {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
};

const toIsoDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
};

const buildUrl = (entry: SitemapEntry) => {
  const lastmodTag = entry.lastmod ? `\n  <lastmod>${entry.lastmod}</lastmod>` : "";
  return `<url>
  <loc>${SITE_URL}${entry.path}</loc>${lastmodTag}
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority}</priority>
</url>`;
};

export async function GET() {
  const staticRoutes: SitemapEntry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/marketing", changefreq: "weekly", priority: "0.9" },
    { path: "/desarrollo", changefreq: "weekly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.7" },
    { path: "/privacidad", changefreq: "yearly", priority: "0.3" },
    { path: "/terminos", changefreq: "yearly", priority: "0.3" }
  ];

  const blogPageSize = SITE_DEFAULTS.blogPageSize;

  const [services, cases, posts] = await Promise.all([
    fetchServices(),
    fetchCases(),
    fetchAllPosts({ pageSize: 100 })
  ]);

  const serviceRoutes: SitemapEntry[] = services
    .filter((service) => Boolean(service.slug))
    .map((service) => ({
      path: `/servicios/${service.slug}`,
      changefreq: "monthly",
      priority: "0.8"
    }));

  const caseRoutes: SitemapEntry[] = cases
    .filter((caseItem) => Boolean(caseItem.slug))
    .map((caseItem) => ({
      path: `/casos/${caseItem.slug}`,
      changefreq: "monthly",
      priority: "0.8"
    }));

  const postRoutes: SitemapEntry[] = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: "weekly",
      priority: "0.7",
      lastmod: toIsoDate(post.updatedAt || post.publishedAt || post.createdAt)
    }));

  const pageCount = Math.max(1, Math.ceil(posts.length / blogPageSize));
  const blogPaginationRoutes: SitemapEntry[] = Array.from({ length: pageCount }, (_, index) => index + 1)
    .filter((pageNumber) => pageNumber > 1)
    .map((pageNumber) => ({
      path: `/blog/${pageNumber}`,
      changefreq: "weekly",
      priority: "0.5"
    }));

  const urls = [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseRoutes,
    ...postRoutes,
    ...blogPaginationRoutes
  ]
    .map(buildUrl)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
}
