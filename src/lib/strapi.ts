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

// Support both real env vars and Astro/Vite's import.meta.env
const STRAPI_URL = process.env.STRAPI_URL ?? import.meta.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? import.meta.env.STRAPI_API_TOKEN;
const STRAPI_CASES_ENDPOINT =
  process.env.STRAPI_CASES_ENDPOINT ?? import.meta.env.STRAPI_CASES_ENDPOINT ?? "/api/cases";
const USE_MOCK_DATA =
  (process.env.USE_MOCK_DATA ?? import.meta.env.USE_MOCK_DATA ?? "true").toString().toLowerCase() ===
  "true";
const SHOULD_USE_MOCK = USE_MOCK_DATA || !STRAPI_URL;

type StrapiData<T> = {
  id?: number;
  attributes?: T;
} & Partial<T>;

type StrapiCollectionResponse<T> = {
  data: StrapiData<T>[];
};

type StrapiSingleResponse<T> = {
  data: StrapiData<T> | null;
};

type StrapiMedia =
  | { data?: { attributes?: { url?: string } } | { attributes?: { url?: string } }[] }
  | { url?: string; attributes?: { url?: string } }
  | Array<{ url?: string; attributes?: { url?: string } }>;

const getAttributes = <T>(item?: StrapiData<T> | null): T | undefined => {
  if (!item) return undefined;
  return item.attributes ?? (item as T);
};

const firstMediaUrl = (media?: StrapiMedia): string | undefined => {
  if (!media) return undefined;
  const joinMaybe = (url?: string) => (url ? joinUrl(url) : undefined);

  // Arrays with direct url/attributes.url
  if (Array.isArray(media)) {
    const first = media[0];
    if (!first) return undefined;
    return joinMaybe(first.url ?? first.attributes?.url);
  }

  // Strapi default shape with data
  const data = (media as { data?: unknown }).data;
  if (data) {
    const arr = Array.isArray(data) ? data : [data];
    const url = arr[0]?.attributes?.url;
    if (url) return joinMaybe(url);
  }

  // Direct object with url/attributes.url
  return joinMaybe(
    (media as { url?: string }).url ?? (media as { attributes?: { url?: string } }).attributes?.url
  );
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
  if (SHOULD_USE_MOCK) return fallback;
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
    const attrs = getAttributes<SiteSettings>(json.data);
    if (!attrs) throw new Error("No site settings in Strapi");
    return attrs;
  }, mockSiteSettings);

export const fetchServices = async (): Promise<Service[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Service>>("/api/services", {
      sort: "order:asc",
      populate: "features"
    });
    return json.data
      .map((item) => {
        const attrs = getAttributes<Service>(item);
        if (!attrs) return undefined;
        return { category: attrs.category ?? "web", ...attrs };
      })
      .filter(Boolean) as Service[];
  }, mockServices);

export const fetchCases = async (): Promise<CaseStudy[]> =>
  withFallback(async () => {
    type StrapiCase = {
      slug?: string;
      documentId?: string;
      nombre_cliente?: string;
      tipo_negocio?: string;
      texto?: string;
      texto_extra?: string;
      link_web?: string;
      imagen?: StrapiMedia;
      orden?: number;
    } & Partial<CaseStudy>;

    const endpoints = Array.from(new Set([STRAPI_CASES_ENDPOINT, "/api/cases", "/api/casos"]));
    let lastError: unknown;

    const coalesce = <T>(...values: (T | undefined | null)[]): T | undefined =>
      values.find((v) => v !== undefined && v !== null);

    const normalizeCase = (item: StrapiData<StrapiCase>): CaseStudy => {
      const attrs = getAttributes<StrapiCase>(item) ?? {};
      const image = firstMediaUrl(attrs.imagen);
      return {
        slug: coalesce(attrs.slug, attrs.documentId, item.id ? String(item.id) : undefined) ?? "",
        clientName: coalesce(attrs.clientName, attrs.nombre_cliente, "") ?? "",
        industry: coalesce(attrs.industry, attrs.tipo_negocio, "") ?? "",
        summary: coalesce(attrs.summary, attrs.texto, "") ?? "",
        results: coalesce(attrs.results, attrs.texto_extra, "") ?? "",
        image,
        url: coalesce(attrs.url, attrs.link_web),
        order: coalesce(attrs.order, attrs.orden)
      };
    };

    for (const endpoint of endpoints) {
      try {
        const json = await fetchJson<StrapiCollectionResponse<StrapiCase>>(endpoint, {
          populate: "imagen"
        });

        return json.data.map(normalizeCase);
      } catch (error) {
        lastError = error;
        console.warn(`[strapi] cases endpoint failed: ${endpoint}`, error);
      }
    }

    throw lastError ?? new Error("No Strapi cases endpoint succeeded");
  }, mockCases);

export const fetchReviews = async (): Promise<Review[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Review>>("/api/reviews", {
      sort: "order:asc"
    });
    return json.data
      .map((item) => getAttributes<Review>(item))
      .filter(Boolean) as Review[];
  }, mockReviews);

export const fetchFaqs = async (): Promise<Faq[]> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<Faq>>("/api/faqs", {
      sort: "order:asc"
    });
    return json.data
      .map((item) => getAttributes<Faq>(item))
      .filter(Boolean) as Faq[];
  }, mockFaqs);

export const fetchLegalPage = async (slug: string): Promise<LegalPage> =>
  withFallback(async () => {
    const json = await fetchJson<StrapiCollectionResponse<LegalPage>>("/api/legal-pages", {
      "filters[slug][$eq]": slug
    });
    const page = getAttributes<LegalPage>(json.data[0]);
    if (!page) throw new Error(`Legal page ${slug} not found`);
    return page;
  }, mockLegalPages[slug] ?? { slug, title: slug, content: "" });

// Para GraphQL, podrías crear una variante usando /graphql y queries tipadas.
