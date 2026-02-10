import type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings } from "../lib/api/types";
import { getWhatsAppPhone } from "../config/contact";
import content from "./content.json";

export type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings };

type ContentData = {
  siteSettings: SiteSettings;
  services: Service[];
  cases: CaseStudy[];
  reviews: Review[];
  faqs: Faq[];
  legalPages: Record<string, LegalPage>;
  posts: Post[];
};

const contentData = content as ContentData;
const resolvedSiteSettings: SiteSettings = {
  ...contentData.siteSettings,
  whatsappNumber: getWhatsAppPhone(contentData.siteSettings.whatsappNumber)
};

export const mockSiteSettings = resolvedSiteSettings;
export const mockServices = contentData.services;
export const mockCases = contentData.cases;
export const mockReviews = contentData.reviews;
export const mockFaqs = contentData.faqs;
export const mockLegalPages = contentData.legalPages;
export const mockPosts = contentData.posts;
