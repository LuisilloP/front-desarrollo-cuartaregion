import {
  mockCases,
  mockFaqs,
  mockLegalPages,
  mockPosts,
  mockReviews,
  mockServices,
  mockSiteSettings
} from "../../data/mock";
import { getMediaAlt, getMediaUrl } from "./media";
import { fetchGraphQL, withFallback, bulletsToStrings, blocksToText } from "./strapi";
import type {
  CaseStudy,
  Faq,
  LegalPage,
  Paginated,
  Pagination,
  Post,
  Service,
  ServiceCategory,
  SiteSettings,
  StrapiBlocks,
  StrapiBullet,
  StrapiCasePoint,
  StrapiImpactTag,
  StrapiMedia,
  Tag,
  Testimonial,
  Category
} from "./types";

type PublicationStatus = "PUBLISHED" | "DRAFT";

type ServiceFiltersInput = {
  featured?: { eq: boolean };
  type?: { eq: string };
  tag?: { eq: string };
};

const SITE_SETTINGS_FIELDS = `
  brandName
  whatsappNumber
  whatsappMessageDefault
  email
  city
  businessHours { label hours notes }
  coverage { cityOrZone notes }
  socialLinks { instagramUrl facebookUrl linkedinUrl }
  agendaEnabled
  agendaLink
`;

const SERVICE_FIELDS = `
  documentId
  title
  slug
  type
  for_who
  what_it_solves
  benefits { text }
  deliverables { text }
  delivery_time
  price
  ctaType
  guarantee
  top_banner
  order
  featured
  publishedAt
`;

const SERVICE_LIST_QUERY = `
  query ServicesList($page: Int!, $pageSize: Int!, $filters: ServiceFiltersInput, $sort: [String], $status: PublicationStatus) {
    services_connection(
      pagination: { page: $page, pageSize: $pageSize }
      filters: $filters
      sort: $sort
      status: $status
    ) {
      nodes { ${SERVICE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

const SERVICE_LIST_QUERY_NO_STATUS = `
  query ServicesListNoStatus($page: Int!, $pageSize: Int!, $filters: ServiceFiltersInput, $sort: [String]) {
    services_connection(
      pagination: { page: $page, pageSize: $pageSize }
      filters: $filters
      sort: $sort
    ) {
      nodes { ${SERVICE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

const SERVICE_BY_SLUG_QUERY = `
  query ServiceBySlug($slug: String!, $status: PublicationStatus) {
    services(filters: { slug: { eq: $slug } }, status: $status) {
      ${SERVICE_FIELDS}
    }
  }
`;

const CASE_FIELDS = `
  documentId
  title
  slug
  clientName
  summary
  industry
  city
  coverImage { url alternativeText }
  beforeTitle
  afterTitle
  beforePoints { text tone }
  afterPoints { text tone }
  impactTags { text variant }
  ctaPrimaryType
  ctaPrimaryLabel
  ctaPrimaryUrl
  siteUrl
  order
  featured
  gallery { url alternativeText }
  screenshotsBefore { url alternativeText }
  screenshotsAfter { url alternativeText }
  problem { text }
  results { text }
  publicAllowed
  publishedAt
`;

const CASES_QUERY = `
  query Cases($status: PublicationStatus) {
    cases(
      sort: ["publishedAt:desc"]
      filters: { publicAllowed: { eq: true } }
      status: $status
    ) {
      ${CASE_FIELDS}
    }
  }
`;

const CASE_BY_SLUG_QUERY = `
  query CaseBySlug($slug: String!, $status: PublicationStatus) {
    cases(
      filters: { slug: { eq: $slug }, publicAllowed: { eq: true } }
      status: $status
    ) {
      ${CASE_FIELDS}
    }
  }
`;

const TESTIMONIAL_FIELDS = `
  documentId
  namePerson
  companyOrRubro
  quote
  rating
  publicAllowed
  publishedAt
`;

const FAQ_FIELDS = `
  documentId
  question
  answer
  order
  publishedAt
  relatedService { slug title }
`;

const POST_FIELDS = `
  documentId
  title
  slug
  excerpt
  content
  createdAt
  updatedAt
  publishedAt
  cover { url alternativeText }
  category { name slug }
  tags { name slug }
`;

const LEGAL_FIELDS = `
  slug
  title
  content
`;

const DEFAULT_SERVICE_SORT = ["order:asc"];
const FALLBACK_SERVICE_SORT = ["createdAt:desc"];

type StrapiSocialLinks = {
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
};

type StrapiSiteSetting = {
  brandName?: string | null;
  whatsappNumber?: string | null;
  whatsappMessageDefault?: string | null;
  email?: string | null;
  city?: string | null;
  businessHours?: { label?: string | null; hours?: string | null; notes?: string | null } | null;
  coverage?: Array<{ cityOrZone?: string | null; notes?: string | null }> | null;
  socialLinks?: StrapiSocialLinks | null;
  agendaEnabled?: boolean | null;
  agendaLink?: string | null;
};

type StrapiService = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  type?: string | null;
  for_who?: string | null;
  what_it_solves?: string | null;
  benefits?: StrapiBullet[] | null;
  deliverables?: StrapiBullet[] | null;
  delivery_time?: string | null;
  price?: string | null;
  ctaType?: string | null;
  guarantee?: string | null;
  top_banner?: string | null;
  order?: number | null;
  featured?: boolean | null;
  publishedAt?: string | null;
};

type StrapiCase = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  clientName?: string | null;
  summary?: string | null;
  industry?: string | null;
  city?: string | null;
  coverImage?: StrapiMedia | null;
  beforeTitle?: string | null;
  afterTitle?: string | null;
  beforePoints?: StrapiCasePoint[] | null;
  afterPoints?: StrapiCasePoint[] | null;
  impactTags?: StrapiImpactTag[] | null;
  ctaPrimaryType?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryUrl?: string | null;
  siteUrl?: string | null;
  order?: number | null;
  featured?: boolean | null;
  problem?: StrapiBullet[] | null;
  results?: StrapiBullet[] | null;
  gallery?: StrapiMedia | null;
  screenshotsBefore?: StrapiMedia | null;
  screenshotsAfter?: StrapiMedia | null;
  publicAllowed?: boolean | null;
  publishedAt?: string | null;
};

type StrapiTestimonial = {
  documentId?: string | null;
  namePerson?: string | null;
  companyOrRubro?: string | null;
  quote?: string | null;
  rating?: number | null;
  publicAllowed?: boolean | null;
  publishedAt?: string | null;
};

type StrapiFaq = {
  documentId?: string | null;
  question?: string | null;
  answer?: string | null;
  order?: number | null;
  publishedAt?: string | null;
  relatedService?: { slug?: string; title?: string } | null;
};

type StrapiCategory = {
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
};

type StrapiTag = {
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
};

type StrapiPost = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: StrapiBlocks | string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  cover?: StrapiMedia | null;
  category?: StrapiCategory | null;
  tags?: StrapiTag[] | null;
};

type ServiceListParams = {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  type?: ServiceCategory;
  tag?: string;
  sort?: string[];
  status?: PublicationStatus;
  includeStatus?: boolean;
};

const toSlug = (item: { slug?: string | null; documentId?: string | null }): string =>
  item.slug ?? item.documentId ?? "";

const mapSocialLinks = (links?: StrapiSocialLinks | null): SiteSettings["socialLinks"] => {
  if (!links) return [];
  const items: SiteSettings["socialLinks"] = [];
  if (links.instagramUrl) items.push({ label: "Instagram", url: links.instagramUrl });
  if (links.facebookUrl) items.push({ label: "Facebook", url: links.facebookUrl });
  if (links.linkedinUrl) items.push({ label: "LinkedIn", url: links.linkedinUrl });
  return items;
};

const mapSiteSettings = (item: StrapiSiteSetting): SiteSettings => {
  const social = mapSocialLinks(item.socialLinks);
  const region = item.city ?? mockSiteSettings.region;

  return {
    siteName: item.brandName ?? mockSiteSettings.siteName,
    tagline: mockSiteSettings.tagline,
    region,
    whatsappNumber: item.whatsappNumber ?? mockSiteSettings.whatsappNumber,
    primaryCTA: mockSiteSettings.primaryCTA,
    secondaryCTA: mockSiteSettings.secondaryCTA,
    socialLinks: social.length > 0 ? social : mockSiteSettings.socialLinks,
    footerText: mockSiteSettings.footerText
  };
};

const mapService = (item: StrapiService): Service => {
  const benefits = bulletsToStrings(item.benefits);
  const deliverables = bulletsToStrings(item.deliverables);
  const type = (item.type as ServiceCategory) ?? undefined;

  return {
    slug: item.slug ?? toSlug(item),
    type,
    title: item.title ?? "",
    for_who: item.for_who ?? undefined,
    what_it_solves: item.what_it_solves ?? undefined,
    benefits,
    deliverables,
    delivery_time: item.delivery_time ?? undefined,
    price: item.price ?? undefined,
    ctaType: item.ctaType ?? undefined,
    guarantee: item.guarantee ?? undefined,
    top_banner: item.top_banner ?? undefined,
    order: item.order ?? 0,
    featured: Boolean(item.featured)
  };
};

const cleanText = (value?: string | null): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const mapCasePoints = (items?: StrapiCasePoint[] | null): Array<{ text: string; tone?: string }> => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      const text = typeof item?.text === "string" ? item.text.trim() : "";
      if (!text) return null;
      const tone = typeof item?.tone === "string" ? item.tone.trim() : "";
      return { text, tone: tone || undefined };
    })
    .filter(Boolean) as Array<{ text: string; tone?: string }>;
};

const mapImpactTags = (items?: StrapiImpactTag[] | null): Array<{ text: string; variant?: string }> => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      const text = typeof item?.text === "string" ? item.text.trim() : "";
      if (!text) return null;
      const variant = typeof item?.variant === "string" ? item.variant.trim() : "";
      return { text, variant: variant || undefined };
    })
    .filter(Boolean) as Array<{ text: string; variant?: string }>;
};

const mediaToUrls = (media?: StrapiMedia | null): string[] => {
  if (!media) return [];
  if (Array.isArray(media)) {
    return media.map((item) => getMediaUrl(item)).filter(Boolean) as string[];
  }
  const data = (media as { data?: unknown }).data;
  if (data) {
    const array = Array.isArray(data) ? data : [data];
    return array.map((item) => getMediaUrl(item as StrapiMedia)).filter(Boolean) as string[];
  }
  const url = getMediaUrl(media);
  return url ? [url] : [];
};

const mapCase = (item: StrapiCase): CaseStudy => {
  const problemList = bulletsToStrings(item.problem);
  const resultsList = bulletsToStrings(item.results);
  const beforePoints = mapCasePoints(item.beforePoints);
  const afterPoints = mapCasePoints(item.afterPoints);
  const summary = cleanText(item.summary) ?? beforePoints[0]?.text ?? problemList[0] ?? "";
  const order =
    typeof item.order === "number" ? item.order : item.publishedAt ? -new Date(item.publishedAt).getTime() : 0;
  const coverMedia = item.coverImage ?? item.gallery ?? undefined;

  return {
    slug: item.slug ?? toSlug(item),
    title: item.title ?? "",
    clientName: item.clientName ?? "",
    industry: cleanText(item.industry) ?? "",
    city: cleanText(item.city),
    summary,
    problem: problemList,
    results: resultsList,
    coverImage: getMediaUrl(coverMedia),
    coverImageAlt: getMediaAlt(coverMedia),
    beforeTitle: cleanText(item.beforeTitle),
    afterTitle: cleanText(item.afterTitle),
    beforePoints,
    afterPoints,
    impactTags: mapImpactTags(item.impactTags),
    ctaPrimaryType: cleanText(item.ctaPrimaryType),
    ctaPrimaryLabel: cleanText(item.ctaPrimaryLabel),
    ctaPrimaryUrl: cleanText(item.ctaPrimaryUrl),
    siteUrl: cleanText(item.siteUrl),
    gallery: mediaToUrls(item.gallery ?? undefined),
    screenshotsBefore: mediaToUrls(item.screenshotsBefore ?? undefined),
    screenshotsAfter: mediaToUrls(item.screenshotsAfter ?? undefined),
    order,
    featured: Boolean(item.featured)
  };
};

const mapTestimonial = (item: StrapiTestimonial): Testimonial => ({
  clientName: item.namePerson ?? "",
  business: item.companyOrRubro ?? "",
  rating: item.rating ?? 5,
  quote: item.quote ?? "",
  order: 0
});

const mapFaq = (item: StrapiFaq): Faq => ({
  question: item.question ?? "",
  answer: item.answer ?? "",
  order: item.order ?? 0,
  relatedService: item.relatedService
    ? { slug: item.relatedService.slug ?? "", title: item.relatedService.title ?? "" }
    : undefined
});

const mapCategory = (item?: StrapiCategory | null): Category | null => {
  if (!item) return null;
  return {
    name: item.name ?? "",
    slug: item.slug ?? toSlug(item)
  };
};

const mapTags = (items?: StrapiTag[] | null): Tag[] =>
  (items ?? []).map((item) => ({
    name: item.name ?? "",
    slug: item.slug ?? toSlug(item)
  }));

const mapPost = (item: StrapiPost): Post => {
  const content = blocksToText(item.content);
  const coverUrl = getMediaUrl(item.cover ?? undefined);

  return {
    slug: item.slug ?? toSlug(item),
    title: item.title ?? "",
    excerpt: item.excerpt ?? "",
    content,
    createdAt: item.createdAt ?? "",
    updatedAt: item.updatedAt ?? "",
    publishedAt: item.publishedAt ?? "",
    cover: coverUrl ? { url: coverUrl } : undefined,
    category: mapCategory(item.category),
    tags: mapTags(item.tags)
  };
};

const buildServiceFilters = (params: ServiceListParams): ServiceFiltersInput | null => {
  const filters: ServiceFiltersInput = {};
  if (typeof params.featured === "boolean") filters.featured = { eq: params.featured };
  if (params.type) filters.type = { eq: params.type };
  if (params.tag) filters.tag = { eq: params.tag };
  return Object.keys(filters).length > 0 ? filters : null;
};

const buildServicesPageFallback = (params: ServiceListParams): Paginated<Service> => {
  const pageSize = params.pageSize ?? 20;
  const page = params.page ?? 1;
  const total = mockServices.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;
  const data = mockServices.slice(start, start + pageSize);

  return {
    data,
    pagination: { page: currentPage, pageSize, pageCount, total }
  };
};

const fetchServicesListRaw = async (params: ServiceListParams): Promise<Paginated<Service>> => {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  const filters = buildServiceFilters(params);
  const sort = params.sort && params.sort.length > 0 ? params.sort : DEFAULT_SERVICE_SORT;
  const includeStatus = params.includeStatus ?? true;

  const isSortError = (error: unknown) => {
    const message = error instanceof Error ? error.message : String(error ?? "");
    const lowered = message.toLowerCase();
    return lowered.includes("sort") || lowered.includes("order");
  };

  const query = includeStatus ? SERVICE_LIST_QUERY : SERVICE_LIST_QUERY_NO_STATUS;
  const variables: Record<string, unknown> = {
    page,
    pageSize,
    filters,
    sort
  };

  if (includeStatus) {
    variables.status = params.status ?? "PUBLISHED";
  }

  const execute = async (overrideSort?: string[]) => {
    const nextVariables = overrideSort ? { ...variables, sort: overrideSort } : variables;
    return fetchGraphQL<{ services_connection: { nodes: StrapiService[]; pageInfo: Pagination } }>(
      includeStatus ? "ServicesList" : "ServicesListNoStatus",
      query,
      nextVariables
    );
  };

  let data: { services_connection: { nodes: StrapiService[]; pageInfo: Pagination } };
  try {
    data = await execute();
  } catch (error) {
    if (sort === DEFAULT_SERVICE_SORT && DEFAULT_SERVICE_SORT !== FALLBACK_SERVICE_SORT && isSortError(error)) {
      data = await execute(FALLBACK_SERVICE_SORT);
    } else {
      throw error;
    }
  }

  const items = (data.services_connection?.nodes ?? []).map(mapService);
  const pagination = data.services_connection?.pageInfo ?? {
    page,
    pageSize,
    pageCount: 1,
    total: items.length
  };

  return { data: items, pagination };
};

export const getServicesList = async (params: Omit<ServiceListParams, "includeStatus"> = {}): Promise<Paginated<Service>> =>
  withFallback(() => fetchServicesListRaw({ ...params, includeStatus: true }), buildServicesPageFallback(params));

export const getServiceBySlug = async (slug: string, status: PublicationStatus = "PUBLISHED"): Promise<Service | null> =>
  withFallback(
    async () => {
      const data = await fetchGraphQL<{ services: StrapiService[] }>("ServiceBySlug", SERVICE_BY_SLUG_QUERY, {
        slug,
        status
      });
      const item = data.services[0];
      return item ? mapService(item) : null;
    },
    mockServices.find((service) => service.slug === slug) ?? null
  );

export const getFeaturedServices = async (pageSize = 20): Promise<Service[]> => {
  const response = await getServicesList({ featured: true, pageSize });
  if (response.data.length > 0) return response.data;
  const fallback = await getServicesList({ pageSize });
  return fallback.data;
};

export const getServicesAdminList = async (
  params: Omit<ServiceListParams, "includeStatus"> = {}
): Promise<Paginated<Service>> =>
  withFallback(() => fetchServicesListRaw({ ...params, includeStatus: false }), buildServicesPageFallback(params));

export const fetchSiteSettings = async (): Promise<SiteSettings> =>
  withFallback(async () => {
    const query = `
      query SiteSettings {
        siteSetting {
          ${SITE_SETTINGS_FIELDS}
        }
      }
    `;
    const data = await fetchGraphQL<{ siteSetting: StrapiSiteSetting | null }>("SiteSettings", query);
    if (!data.siteSetting) throw new Error("No site settings in Strapi");
    return mapSiteSettings(data.siteSetting);
  }, mockSiteSettings);

export const fetchServices = async (): Promise<Service[]> => {
  const response = await getServicesList({ pageSize: 100 });
  return response.data;
};

export const fetchFeaturedServices = async (): Promise<Service[]> => getFeaturedServices(100);

export const fetchServiceBySlug = async (slug: string): Promise<Service | null> => getServiceBySlug(slug);

export const fetchCases = async (): Promise<CaseStudy[]> =>
  withFallback(async () => {
    const data = await fetchGraphQL<{ cases: StrapiCase[] }>("Cases", CASES_QUERY, {
      status: "PUBLISHED"
    });

    return data.cases
      .map((item) => {
        if (!item.publishedAt || item.publicAllowed === false) return undefined;
        return mapCase(item);
      })
      .filter(Boolean) as CaseStudy[];
  }, mockCases);

export const fetchCaseBySlug = async (slug: string): Promise<CaseStudy | null> =>
  withFallback(
    async () => {
      const data = await fetchGraphQL<{ cases: StrapiCase[] }>("CaseBySlug", CASE_BY_SLUG_QUERY, {
        slug,
        status: "PUBLISHED"
      });
      const item = data.cases[0];
      return item ? mapCase(item) : null;
    },
    mockCases.find((item) => item.slug === slug) ?? null
  );

export const fetchTestimonials = async (): Promise<Testimonial[]> =>
  withFallback(async () => {
    const query = `
      query Testimonials {
        testimonials(
          sort: ["publishedAt:desc"]
          filters: { publicAllowed: { eq: true }, publishedAt: { notNull: true } }
        ) {
          ${TESTIMONIAL_FIELDS}
        }
      }
    `;
    const data = await fetchGraphQL<{ testimonials: StrapiTestimonial[] }>("Testimonials", query);

    return data.testimonials
      .map((item) => {
        if (!item.publishedAt || item.publicAllowed === false) return undefined;
        return mapTestimonial(item);
      })
      .filter(Boolean) as Testimonial[];
  }, mockReviews);

export const fetchFaqs = async (serviceSlug?: string): Promise<Faq[]> =>
  withFallback(async () => {
    const withService = Boolean(serviceSlug);
    const query = `
      query Faqs${withService ? "($serviceSlug: String!)" : ""} {
        faqs(
          sort: ["order:asc"]
          filters: {
            publishedAt: { notNull: true }
            ${withService ? "relatedService: { slug: { eq: $serviceSlug } }" : ""}
          }
        ) {
          ${FAQ_FIELDS}
        }
      }
    `;
    const data = await fetchGraphQL<{ faqs: StrapiFaq[] }>(
      "Faqs",
      query,
      withService ? { serviceSlug } : undefined
    );

    return data.faqs
      .map((item) => {
        if (!item.publishedAt) return undefined;
        return mapFaq(item);
      })
      .filter(Boolean) as Faq[];
  }, mockFaqs);

export type FetchPostsParams = {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
};

const buildPostsQuery = (params: FetchPostsParams) => {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  const variables: Record<string, unknown> = { page, pageSize };
  const variableDefs = ["$page: Int!", "$pageSize: Int!"];
  const filters = ["publishedAt: { notNull: true }"];

  if (params.category) {
    variableDefs.push("$category: String!");
    variables.category = params.category;
    filters.push("category: { slug: { eq: $category } }");
  }

  if (params.tag) {
    variableDefs.push("$tag: String!");
    variables.tag = params.tag;
    filters.push("tags: { slug: { eq: $tag } }");
  }

  const query = `
    query PostsPage(${variableDefs.join(", ")}) {
      posts_connection(
        sort: ["publishedAt:desc"]
        pagination: { page: $page, pageSize: $pageSize }
        filters: {
          ${filters.join("\n")}
        }
      ) {
        nodes {
          ${POST_FIELDS}
        }
        pageInfo { page pageSize pageCount total }
      }
    }
  `;

  return { query, variables, page, pageSize };
};

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

const mockPostsPage = (params: FetchPostsParams): Paginated<Post> => {
  const pageSize = params.pageSize ?? 10;
  const page = params.page ?? 1;
  const total = mockPosts.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;
  const data = mockPosts.slice(start, start + pageSize);

  return {
    data,
    pagination: { page: currentPage, pageSize, pageCount, total }
  };
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
    mockPosts
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
    mockPosts.find((post) => post.slug === slug) ?? null
  );

export const fetchLegalPage = async (slug: string): Promise<LegalPage> =>
  withFallback(async () => {
    const query = `
      query LegalPage($slug: String!) {
        legalPages(filters: { slug: { eq: $slug } }) {
          ${LEGAL_FIELDS}
        }
      }
    `;
    const data = await fetchGraphQL<{ legalPages: LegalPage[] }>("LegalPage", query, { slug });
    const page = data.legalPages[0];
    if (!page) throw new Error(`Legal page ${slug} not found`);
    return page;
  }, mockLegalPages[slug] ?? { slug, title: slug, content: "" });

export const fetchReviews = fetchTestimonials;
export const fetchPosts = fetchAllPosts;
