import {
  mockCases,
  mockFaqs,
  mockLegalPages,
  mockPosts,
  mockReviews,
  mockServices,
  mockSiteSettings
} from "../../../data/mock";
import { getMediaAlt, getMediaUrl } from "../media";
import { blocksToText, bulletsToStrings } from "../strapi";
import type {
  CaseStudy,
  Category,
  Faq,
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
  Testimonial
} from "../types";
import { DEFAULT_SERVICE_SORT, POST_FIELDS } from "./queries";

export type PublicationStatus = "PUBLISHED" | "DRAFT";

export type ServiceFiltersInput = {
  featured?: { eq: boolean };
  type?: { eq: string };
  tag?: { eq: string };
};

export type StrapiSocialLinks = {
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
};

export type StrapiSiteSetting = {
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

export type StrapiService = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  type?: string | null;
  for_who?: string | null;
  whatsapp_desc?: string | null;
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

export type StrapiCase = {
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

export type StrapiTestimonial = {
  documentId?: string | null;
  namePerson?: string | null;
  companyOrRubro?: string | null;
  quote?: string | null;
  rating?: number | null;
  publicAllowed?: boolean | null;
  publishedAt?: string | null;
};

export type StrapiFaq = {
  question?: string | null;
  answer?: StrapiBlocks | string | null;
};

export type StrapiCategory = {
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
};

export type StrapiTag = {
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
};

export type StrapiPost = {
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

export type ServiceListParams = {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  type?: ServiceCategory;
  tag?: string;
  sort?: string[];
  status?: PublicationStatus;
  includeStatus?: boolean;
};

export type FetchPostsParams = {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
};

const toSlug = (item: { slug?: string | null; documentId?: string | null }): string =>
  item.slug ?? item.documentId ?? "";

const cleanText = (value?: string | null): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const mapSocialLinks = (links?: StrapiSocialLinks | null): SiteSettings["socialLinks"] => {
  if (!links) return [];
  const items: SiteSettings["socialLinks"] = [];
  if (links.instagramUrl) {
    items.push({
      name: "Instagram",
      url: links.instagramUrl,
      icon: "simple-icons:instagram"
    });
  }
  if (links.facebookUrl) {
    items.push({
      name: "Facebook",
      url: links.facebookUrl,
      icon: "simple-icons:facebook"
    });
  }
  if (links.linkedinUrl) {
    items.push({
      name: "LinkedIn",
      url: links.linkedinUrl,
      icon: "simple-icons:linkedin"
    });
  }
  return items;
};

export const mapSiteSettings = (item: StrapiSiteSetting): SiteSettings => {
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

export const mapService = (item: StrapiService): Service => {
  const benefits = bulletsToStrings(item.benefits);
  const deliverables = bulletsToStrings(item.deliverables);
  const type = (item.type as ServiceCategory) ?? undefined;

  return {
    slug: item.slug ?? toSlug(item),
    type,
    title: item.title ?? "",
    for_who: item.for_who ?? undefined,
    whatsapp_desc: item.whatsapp_desc ?? undefined,
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
  if (typeof media === "object" && media !== null && "data" in media && media.data) {
    const relation = media as { data: unknown | unknown[] };
    const array = Array.isArray(relation.data) ? relation.data : [relation.data];
    return array.map((item) => getMediaUrl(item as StrapiMedia)).filter(Boolean) as string[];
  }
  const url = getMediaUrl(media);
  return url ? [url] : [];
};

export const mapCase = (item: StrapiCase): CaseStudy => {
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

export const mapTestimonial = (item: StrapiTestimonial): Testimonial => ({
  clientName: item.namePerson ?? "",
  business: item.companyOrRubro ?? "",
  rating: item.rating ?? 5,
  quote: item.quote ?? "",
  order: 0
});

export const mapFaq = (item: StrapiFaq): Faq => ({
  question: cleanText(item.question) ?? "",
  answer: blocksToText(item.answer)
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

export const mapPost = (item: StrapiPost): Post => {
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

export const buildServiceFilters = (params: ServiceListParams): ServiceFiltersInput | null => {
  const filters: ServiceFiltersInput = {};
  if (typeof params.featured === "boolean") filters.featured = { eq: params.featured };
  if (params.type) filters.type = { eq: params.type };
  if (params.tag) filters.tag = { eq: params.tag };
  return Object.keys(filters).length > 0 ? filters : null;
};

export const buildServicesPageFallback = (params: ServiceListParams): Paginated<Service> => {
  const pageSize = params.pageSize ?? 20;
  const page = params.page ?? 1;
  const filtered = mockServices
    .filter((service) => {
      if (typeof params.featured === "boolean" && Boolean(service.featured) !== params.featured) return false;
      if (params.type && service.type !== params.type) return false;
      if (params.tag) {
        const serviceTag = (service as Service & { tag?: string }).tag;
        if (serviceTag !== params.tag) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const sortToken = (params.sort && params.sort[0]) || DEFAULT_SERVICE_SORT[0] || "order:asc";
      const [field, direction = "asc"] = sortToken.split(":");
      const order = direction.toLowerCase() === "desc" ? -1 : 1;
      const left = (a as Record<string, unknown>)[field];
      const right = (b as Record<string, unknown>)[field];

      if (typeof left === "number" && typeof right === "number") return (left - right) * order;
      if (typeof left === "string" && typeof right === "string") return left.localeCompare(right) * order;
      return 0;
    });

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    data,
    pagination: { page: currentPage, pageSize, pageCount, total }
  };
};

export const buildPostsQuery = (params: FetchPostsParams) => {
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

export const mockPostsPage = (params: FetchPostsParams): Paginated<Post> => {
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

export const mockDomainFallbacks = {
  mockCases,
  mockFaqs,
  mockLegalPages,
  mockPosts,
  mockReviews,
  mockServices,
  mockSiteSettings
};
