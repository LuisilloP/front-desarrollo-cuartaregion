import { fetchGraphQL, withFallback } from "../strapi";
import type { Faq, LegalPage, SiteSettings, Testimonial } from "../types";
import { mapFaq, mapSiteSettings, mapTestimonial, mockDomainFallbacks, type StrapiFaq, type StrapiSiteSetting, type StrapiTestimonial } from "./contracts";
import { FAQ_FIELDS, LEGAL_FIELDS, SITE_SETTINGS_FIELDS, TESTIMONIAL_FIELDS } from "./queries";

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
  }, mockDomainFallbacks.mockSiteSettings);

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
  }, mockDomainFallbacks.mockReviews);

export const fetchFaqs = async (): Promise<Faq[]> =>
  withFallback(async () => {
    const query = `
      query Faqs {
        faqs {
          ${FAQ_FIELDS}
        }
      }
    `;
    const data = await fetchGraphQL<{ faqs: StrapiFaq[] }>("Faqs", query);

    return data.faqs.map((item) => mapFaq(item)).filter(Boolean) as Faq[];
  }, mockDomainFallbacks.mockFaqs);

export const fetchLegalPage = async (slug: string): Promise<LegalPage> =>
  withFallback(async () => {
    const query = `
      query LegalPage($slug: String!) {
        legalPages(filters: { slug: { eq: $slug } }) {
          ${LEGAL_FIELDS}
        }
      }
    `;

    try {
      const data = await fetchGraphQL<{ legalPages: LegalPage[] }>("LegalPage", query, { slug });
      const page = data.legalPages[0];
      if (!page) throw new Error(`Legal page ${slug} not found`);
      return page;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error ?? "");
      const isMissingLegal = message.includes("Cannot query field") && message.includes("legalPages");
      const isGraphqlValidation = message.includes("GRAPHQL_VALIDATION_FAILED");
      if (isMissingLegal || isGraphqlValidation) {
        return mockDomainFallbacks.mockLegalPages[slug] ?? { slug, title: slug, content: "" };
      }
      throw error;
    }
  }, mockDomainFallbacks.mockLegalPages[slug] ?? { slug, title: slug, content: "" });
