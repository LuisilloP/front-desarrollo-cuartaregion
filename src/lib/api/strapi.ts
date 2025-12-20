import { env, isDev } from "../env";
import type { StrapiBlocks, StrapiBullet } from "./types";

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

export const fetchGraphQL = async <T>(
  queryName: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (env.strapiToken) headers.set("Authorization", `Bearer ${env.strapiToken}`);

  if (isDev) {
    console.log(`[strapi] ${queryName} variables`, variables ?? {});
  }

  const response = await fetch(env.strapiGraphqlUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    let detail = "";
    try {
      const json = await response.json();
      detail = json?.error?.message ?? JSON.stringify(json);
    } catch {
      detail = await response.text();
    }
    throw new Error(`[${queryName}] Strapi GraphQL failed (${response.status}): ${detail || response.statusText}`);
  }

  const payload = (await response.json()) as GraphqlResponse<T>;
  if (payload.errors?.length) {
    const message = payload.errors[0]?.message ?? "GraphQL error";
    throw new Error(`[${queryName}] ${message}`);
  }
  if (!payload.data) {
    throw new Error(`[${queryName}] Strapi GraphQL error: missing data`);
  }
  if (isDev) {
    console.log(`[strapi] ${queryName} data`, payload.data);
  }
  return payload.data;
};

export const strapiGraphql = async <T>(query: string, variables?: Record<string, unknown>): Promise<T> =>
  fetchGraphQL("AnonymousQuery", query, variables);

export const withFallback = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  if (env.useMock) return fallback;
  try {
    return await fn();
  } catch (error) {
    if (isDev) {
      console.warn("[strapi] fallback to mock data:", error);
      return fallback;
    }
    throw error;
  }
};

export const bulletsToStrings = (items?: StrapiBullet[] | null): string[] =>
  Array.isArray(items)
    ? items
        .map((item) => (typeof item?.text === "string" ? item.text.trim() : ""))
        .filter((text) => text.length > 0)
    : [];

export const blocksToText = (blocks?: StrapiBlocks | string | null): string => {
  if (typeof blocks === "string") return blocks.trim();
  return Array.isArray(blocks)
    ? blocks
        .map((block) => (block?.children ?? []).map((child) => child?.text ?? "").join(""))
        .join("\n")
        .trim()
    : "";
};
