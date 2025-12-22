export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Paginated<T> = {
  data: T[];
  pagination: Pagination;
};

export type StrapiEntity<T> = {
  id?: number;
  documentId?: string;
  attributes?: T;
};

export type StrapiMedia =
  | { data?: StrapiEntity<{ url?: string; alternativeText?: string }> | StrapiEntity<{ url?: string; alternativeText?: string }>[] | null }
  | { url?: string; alternativeText?: string }
  | Array<{ url?: string; alternativeText?: string }>;

export type StrapiBullet = { text?: string | null };
export type StrapiBlocks = Array<{ type?: string; children?: Array<{ text?: string | null }> }>;

export type SiteSettings = {
  siteName: string;
  tagline: string;
  region: string;
  whatsappNumber: string;
  primaryCTA: string;
  secondaryCTA: string;
  socialLinks: { label: string; url: string }[];
  footerText: string;
};

export type ServiceCategory = "web" | "maintenance" | "digital";

export type Service = {
  slug: string;
  type?: ServiceCategory;
  title: string;
  for_who?: string;
  what_it_solves?: string;
  benefits?: string[];
  deliverables?: string[];
  delivery_time?: string;
  price?: string;
  ctaType?: string;
  guarantee?: string;
  top_banner?: string;
  order?: number;
  featured?: boolean;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  results: string[] | string;
  title?: string;
  problem?: string[] | string;
  image?: string;
  url?: string;
  order?: number;
};

export type Testimonial = {
  clientName: string;
  business: string;
  rating: number;
  quote: string;
  avatar?: string;
  order?: number;
};

export type Review = Testimonial;

export type Faq = {
  question: string;
  answer: string;
  order?: number;
  relatedService?: { slug?: string; title?: string };
};

export type LegalPage = {
  slug: string;
  title: string;
  content: string;
};

export type Category = {
  name: string;
  slug: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: { url?: string; alternativeText?: string };
  category?: Category | null;
  tags?: Tag[];
};
