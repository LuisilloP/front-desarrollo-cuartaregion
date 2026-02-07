import { fetchGraphQL, withFallback } from "../strapi";
import type { CaseStudy } from "../types";
import { mapCase, mockDomainFallbacks, type StrapiCase } from "./contracts";
import { CASE_BY_SLUG_QUERY, CASES_QUERY } from "./queries";

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
  }, mockDomainFallbacks.mockCases);

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
    mockDomainFallbacks.mockCases.find((item) => item.slug === slug) ?? null
  );
