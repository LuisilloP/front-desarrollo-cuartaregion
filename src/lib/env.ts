type EnvMap = Record<string, string | undefined>;

const metaEnv = import.meta.env;
const metaEnvMap: EnvMap = {
  PUBLIC_STRAPI_URL: metaEnv.PUBLIC_STRAPI_URL,
  PUBLIC_STRAPI_GRAPHQL_URL: metaEnv.PUBLIC_STRAPI_GRAPHQL_URL,
  STRAPI_TOKEN: metaEnv.STRAPI_TOKEN,
  PUBLIC_SITE_URL: metaEnv.PUBLIC_SITE_URL,
  PUBLIC_ENV: metaEnv.PUBLIC_ENV,
  STRAPI_USE_MOCK: metaEnv.STRAPI_USE_MOCK,
  USE_MOCK_DATA: metaEnv.USE_MOCK_DATA,
  SITE_URL: metaEnv.SITE_URL,
  STRAPI_URL: metaEnv.STRAPI_URL,
  STRAPI_INTERNAL_URL: metaEnv.STRAPI_INTERNAL_URL,
  STRAPI_INTERNAL_GRAPHQL_URL: metaEnv.STRAPI_INTERNAL_GRAPHQL_URL,
  STRAPI_API_TOKEN: metaEnv.STRAPI_API_TOKEN,
  MODE: metaEnv.MODE
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

const mode = getEnvValue("PUBLIC_ENV") ?? metaEnvMap.MODE ?? "development";
const isServer = typeof window === "undefined";
const publicStrapiUrl = getEnvValue("PUBLIC_STRAPI_URL") ?? getEnvValue("STRAPI_URL") ?? "http://localhost:1337";
const internalStrapiUrl = getEnvValue("STRAPI_INTERNAL_URL") ?? publicStrapiUrl;
const publicGraphqlUrl = getEnvValue("PUBLIC_STRAPI_GRAPHQL_URL") ?? joinUrl(publicStrapiUrl, "/graphql");
const internalGraphqlUrl = getEnvValue("STRAPI_INTERNAL_GRAPHQL_URL") ?? joinUrl(internalStrapiUrl, "/graphql");

export const env = {
  publicEnv: mode,
  strapiUrl: publicStrapiUrl,
  strapiGraphqlUrl: isServer ? internalGraphqlUrl : publicGraphqlUrl,
  strapiToken: getEnvValue("STRAPI_TOKEN") ?? getEnvValue("STRAPI_API_TOKEN"),
  siteUrl: getEnvValue("PUBLIC_SITE_URL") ?? getEnvValue("SITE_URL"),
  useMock: parseBool(getEnvValue("STRAPI_USE_MOCK") ?? getEnvValue("USE_MOCK_DATA"), false)
};

export const isDev = env.publicEnv !== "production";
