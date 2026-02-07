import { withFallback, fetchGraphQL } from "../strapi";
import type { Paginated, Pagination, Service } from "../types";
import {
  buildServiceFilters,
  buildServicesPageFallback,
  mapService,
  type PublicationStatus,
  type ServiceListParams,
  type StrapiService
} from "./contracts";
import {
  DEFAULT_SERVICE_SORT,
  FALLBACK_SERVICE_SORT,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_LIST_QUERY,
  SERVICE_LIST_QUERY_NO_STATUS
} from "./queries";
import { mockDomainFallbacks } from "./contracts";

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

export const getServicesList = async (
  params: Omit<ServiceListParams, "includeStatus"> = {}
): Promise<Paginated<Service>> =>
  withFallback(() => fetchServicesListRaw({ ...params, includeStatus: true }), buildServicesPageFallback(params));

export const getServiceBySlug = async (
  slug: string,
  status: PublicationStatus = "PUBLISHED"
): Promise<Service | null> =>
  withFallback(
    async () => {
      const data = await fetchGraphQL<{ services: StrapiService[] }>("ServiceBySlug", SERVICE_BY_SLUG_QUERY, {
        slug,
        status
      });
      const item = data.services[0];
      return item ? mapService(item) : null;
    },
    mockDomainFallbacks.mockServices.find((service) => service.slug === slug) ?? null
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

export const fetchServices = async (): Promise<Service[]> => {
  const response = await getServicesList({ pageSize: 100 });
  return response.data;
};

export const fetchFeaturedServices = async (): Promise<Service[]> => getFeaturedServices(100);

export const fetchServiceBySlug = async (slug: string): Promise<Service | null> => getServiceBySlug(slug);
