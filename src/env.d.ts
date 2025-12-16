/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    STRAPI_URL?: string;
    STRAPI_API_TOKEN?: string;
    STRAPI_CASES_ENDPOINT?: string;
  }
}

interface ImportMetaEnv {
  readonly STRAPI_URL?: string;
  readonly STRAPI_API_TOKEN?: string;
  readonly STRAPI_CASES_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
