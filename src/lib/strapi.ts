import type {
  CaseStudy,
  Faq,
  LegalPage,
  Review,
  Service,
  SiteSettings
} from "../data/mock";
import {
  mockCases,
  mockFaqs,
  mockLegalPages,
  mockReviews,
  mockServices,
  mockSiteSettings
} from "../data/mock";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiData<T> = {
  id: number;
  attributes: T;
};

type StrapiCollectionResponse<T> = {
  data: StrapiData<T>[];
};

type StrapiSingleResponse<T> = {
  data: StrapiData<T> | null;
};

const defaultHeaders: Record<string, string> = STRAPI_API_TOKEN
  ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
  : {};

const joinUrl = (path: string) => {
  if (!STRAPI_URL) throw new Error("STRAPI_URL not configured");
  return new URL(path, STRAPI_URL).toString();
};

const fetchJson = async <T>(path: string, params: Record<string, string | number> = {}): Promise<T> => {
  if (!STRAPI_URL) throw new Error("STRAPI_URL not configured");
  const url = new URL(path, STRAPI_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders
    }
  });
  if (!res.ok) {
    throw new Error(`Strapi responded ${res.status}`);
  }
  return (await res.json()) as T;
};

const withFallback = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.warn("[strapi] Using mock data:", error);
    return fallback;
  }
};

export const fetchSiteSettings = async (): Promise<SiteSettings> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiSingleResponse<SiteSettings>>("/api/site-settings", {
      populate: "deep"
    });
    if (!json.data) throw new Error("No site settings in Strapi");
    return json.data.attributes;
  }, mockSiteSettings);

export const fetchServices = async (): Promise<Service[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Service>>("/api/services", {
      sort: "order:asc",
      populate: "features"
    });
    return json.data.map((item) => ({ category: "web", ...item.attributes }));
  }, mockServices);

export const fetchCases = async (): Promise<CaseStudy[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<CaseStudy>>("/api/cases", {
      sort: "order:asc",
      populate: "image"
    });
    return json.data.map((item) => {
      const attrs = item.attributes as CaseStudy & {
        image?: { data?: { attributes?: { url: string } } };
      };
      const image = attrs.image?.data?.attributes?.url;
      return {
        ...attrs,
        image: image ? joinUrl(image) : attrs.image
      };
    });
  }, mockCases);

export const fetchReviews = async (): Promise<Review[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Review>>("/api/reviews", {
      sort: "order:asc"
    });
    return json.data.map((item) => ({ ...item.attributes }));
  }, mockReviews);

export const fetchFaqs = async (): Promise<Faq[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Faq>>("/api/faqs", {
      sort: "order:asc"
    });
    return json.data.map((item) => ({ ...item.attributes }));
  }, mockFaqs);

export const fetchLegalPage = async (slug: string): Promise<LegalPage> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<LegalPage>>("/api/legal-pages", {
      "filters[slug][$eq]": slug
    });
    const page = json.data[0]?.attributes;
    if (!page) throw new Error(`Legal page ${slug} not found`);
    return page;
  }, mockLegalPages[slug] ?? { slug, title: slug, content: "" });

// Para GraphQL, podrías crear una variante usando /graphql y queries tipadas.
