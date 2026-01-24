type EnvMap = Record<string, string | undefined>;

const metaEnv = import.meta.env;
const metaEnvMap: EnvMap = {
  PUBLIC_STRAPI_URL: metaEnv.PUBLIC_STRAPI_URL,
  PUBLIC_STRAPI_GRAPHQL_URL: metaEnv.PUBLIC_STRAPI_GRAPHQL_URL,
  STRAPI_TOKEN: metaEnv.STRAPI_TOKEN,
  PUBLIC_SITE_URL: metaEnv.PUBLIC_SITE_URL,
  SITE: metaEnv.SITE,
  PUBLIC_ENV: metaEnv.PUBLIC_ENV,
  STRAPI_USE_MOCK: metaEnv.STRAPI_USE_MOCK,
  USE_MOCK_DATA: metaEnv.USE_MOCK_DATA,
  SITE_URL: metaEnv.SITE_URL,
  STRAPI_URL: metaEnv.STRAPI_URL,
  STRAPI_INTERNAL_URL: metaEnv.STRAPI_INTERNAL_URL,
  STRAPI_INTERNAL_GRAPHQL_URL: metaEnv.STRAPI_INTERNAL_GRAPHQL_URL,
  STRAPI_API_TOKEN: metaEnv.STRAPI_API_TOKEN,
  MODE: metaEnv.MODE,
  NODE_ENV: metaEnv.NODE_ENV
};

const getEnvValue = (key: string, fallback?: string): string | undefined => {
  const processEnv = (globalThis as { process?: { env?: EnvMap } }).process?.env;
  const value = processEnv?.[key] ?? metaEnvMap[key] ?? fallback;
  if (value === undefined) return undefined;
  const trimmed = value.toString().trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const parseBool = (value: string | undefined, defaultValue = false): boolean => {
  if (!value) return defaultValue;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

const stripTrailingSlash = (value: string) => (value.endsWith("/") ? value.slice(0, -1) : value);
const stripLeadingSlash = (value: string) => (value.startsWith("/") ? value.slice(1) : value);
const joinUrl = (base: string, path: string) => `${stripTrailingSlash(base)}/${stripLeadingSlash(path)}`;

const mode = getEnvValue("PUBLIC_ENV") ?? metaEnvMap.MODE ?? getEnvValue("NODE_ENV") ?? "development";
const isServer = typeof window === "undefined";
const privateStrapiUrl = getEnvValue("STRAPI_URL");
const publicStrapiUrl = getEnvValue("PUBLIC_STRAPI_URL");
const resolvedStrapiUrl = privateStrapiUrl ?? publicStrapiUrl ?? null;
const normalizedStrapiUrl = resolvedStrapiUrl ? stripTrailingSlash(resolvedStrapiUrl) : null;

const graphqlOverride = getEnvValue("STRAPI_INTERNAL_GRAPHQL_URL") ?? getEnvValue("PUBLIC_STRAPI_GRAPHQL_URL");
const strapiGraphqlUrl = graphqlOverride
  ? stripTrailingSlash(graphqlOverride)
  : normalizedStrapiUrl
    ? joinUrl(normalizedStrapiUrl, "/graphql")
    : null;

const strapiToken = getEnvValue("STRAPI_API_TOKEN") ?? getEnvValue("STRAPI_TOKEN") ?? null;
const mockFlag = parseBool(getEnvValue("USE_MOCK_DATA") ?? getEnvValue("STRAPI_USE_MOCK"), true);
const useMockData = mockFlag || !normalizedStrapiUrl;

export const useMocks = (): boolean => useMockData;

export const getStrapiUrl = (): string | null => normalizedStrapiUrl;

export const getPublicStrapiUrl = (): string | null => {
  const url = publicStrapiUrl ?? normalizedStrapiUrl;
  return url ? stripTrailingSlash(url) : null;
};

export const getStrapiGraphqlUrl = (): string | null => strapiGraphqlUrl;

export const getStrapiToken = (): string | null => strapiToken;

export const assertStrapiConfig = (): void => {
  if (useMockData) return;
  const missing: string[] = [];
  if (!normalizedStrapiUrl) missing.push("STRAPI_URL or PUBLIC_STRAPI_URL");
  if (!strapiGraphqlUrl) missing.push("STRAPI_INTERNAL_GRAPHQL_URL or PUBLIC_STRAPI_GRAPHQL_URL");
  if (missing.length > 0) {
    throw new Error(`Missing Strapi env vars: ${missing.join(", ")}. Set USE_MOCK_DATA=true to use mock data.`);
  }
};

export const env = {
  publicEnv: mode,
  isServer,
  isDev: mode !== "production",
  strapiUrl: normalizedStrapiUrl,
  strapiPublicUrl: getPublicStrapiUrl(),
  strapiGraphqlUrl,
  strapiToken,
  siteUrl: getEnvValue("PUBLIC_SITE_URL") ?? getEnvValue("SITE_URL") ?? getEnvValue("SITE"),
  useMock: useMockData
};

export const isDev = env.isDev;
