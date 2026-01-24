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
export type StrapiCasePoint = { text?: string | null; tone?: string | null };
export type StrapiImpactTag = { text?: string | null; variant?: string | null };
export type StrapiBlocks = Array<{ type?: string; children?: Array<{ text?: string | null }> }>;

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  region: string;
  whatsappNumber: string;
  primaryCTA: string;
  secondaryCTA: string;
  socialLinks: SocialLink[];
  footerText: string;
};

export type ServiceCategory = "web" | "maintenance" | "digital";

export type Service = {
  slug: string;
  type?: ServiceCategory;
  title: string;
  for_who?: string;
  whatsapp_desc?: string;
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
  icon?: string;
  modality?: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  city?: string;
  title?: string;
  coverImage?: string;
  coverImageAlt?: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforePoints?: Array<{ text: string; tone?: string }>;
  afterPoints?: Array<{ text: string; tone?: string }>;
  impactTags?: Array<{ text: string; variant?: string }>;
  ctaPrimaryType?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryUrl?: string | null;
  siteUrl?: string | null;
  gallery?: string[];
  screenshotsBefore?: string[];
  screenshotsAfter?: string[];
  impactMetrics?: Array<{ label?: string; value?: string; suffix?: string; variant?: string }>;
  problem?: string[] | string;
  results?: string[] | string;
  order?: number;
  featured?: boolean;
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

export interface ContactSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  socialLinks: SocialLink[];
}

export interface UseCase {
  title: string;
  description: string;
  icon: string;
  cardColor?: string;
  backgroundImage?: string;
  bullets?: string[];
}

export interface UseCasesSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  closingText?: string;
  cases: UseCase[];
}

export interface ReviewsSectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface FaqSectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroSectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Content {
  siteSettings: SiteSettings;
  navLinks: NavLink[];
  heroSection: HeroSectionContent;
  contactSection: ContactSectionContent;
  useCasesSection: UseCasesSectionContent;
  reviewsSection: ReviewsSectionContent;
  faqSection: FaqSectionContent;
  services: Service[];
  cases: CaseStudy[];
  reviews: Testimonial[];
  faqs: Faq[];
  legalPages: {
    privacidad: LegalPage;
    terminos: LegalPage;
  };
  posts: Post[];
}
