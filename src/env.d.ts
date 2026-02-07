/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_STRAPI_URL?: string;
    PUBLIC_STRAPI_GRAPHQL_URL?: string;
    STRAPI_TOKEN?: string;
    PUBLIC_SITE_URL?: string;
    PUBLIC_ENV?: string;
    STRAPI_USE_MOCK?: string;
    USE_MOCK_DATA?: string;
    SITE_URL?: string;
    STRAPI_URL?: string;
    STRAPI_API_TOKEN?: string;
    STRAPI_INTERNAL_URL?: string;
    STRAPI_INTERNAL_GRAPHQL_URL?: string;
    NODE_ENV?: string;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_STRAPI_URL?: string;
  readonly PUBLIC_STRAPI_GRAPHQL_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ENV?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
