import { getPublicStrapiUrl } from "../env";
import type { StrapiMedia, StrapiMediaAttributes, StrapiMediaEntity, StrapiMediaItem } from "./types";

const stripTrailingSlash = (value: string) => (value.endsWith("/") ? value.slice(0, -1) : value);
const stripLeadingSlash = (value: string) => (value.startsWith("/") ? value.slice(1) : value);

export const toAbsoluteUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = getPublicStrapiUrl();
  if (!base) return `/${stripLeadingSlash(url)}`;
  return `${stripTrailingSlash(base)}/${stripLeadingSlash(url)}`;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isMediaAttributes = (value: unknown): value is StrapiMediaAttributes =>
  isRecord(value) && ("url" in value || "alternativeText" in value);

const isMediaEntity = (value: unknown): value is StrapiMediaEntity =>
  isRecord(value) && "attributes" in value && isRecord(value.attributes);

const isMediaRelation = (value: unknown): value is { data?: StrapiMediaEntity | StrapiMediaEntity[] | null } =>
  isRecord(value) && "data" in value;

const getUrlFromItem = (item?: StrapiMediaItem | null): string | undefined => {
  if (!item) return undefined;
  if (isMediaEntity(item)) return item.attributes?.url ?? undefined;
  if (isMediaAttributes(item)) return item.url ?? undefined;
  return undefined;
};

const getAltFromItem = (item?: StrapiMediaItem | null): string | undefined => {
  if (!item) return undefined;
  if (isMediaEntity(item)) return item.attributes?.alternativeText ?? undefined;
  if (isMediaAttributes(item)) return item.alternativeText ?? undefined;
  return undefined;
};

const extractMediaUrl = (media: StrapiMedia | undefined | null): string | undefined => {
  if (!media) return undefined;

  if (Array.isArray(media)) {
    return getUrlFromItem(media[0]);
  }

  if (isMediaRelation(media)) {
    const first = Array.isArray(media.data) ? media.data[0] : media.data;
    return getUrlFromItem(first);
  }

  return getUrlFromItem(media);
};

export const getMediaUrl = (media?: StrapiMedia | null): string | undefined => {
  const url = extractMediaUrl(media ?? undefined);
  return toAbsoluteUrl(url);
};

const extractMediaAlt = (media: StrapiMedia | undefined | null): string | undefined => {
  if (!media) return undefined;

  if (Array.isArray(media)) {
    return getAltFromItem(media[0]);
  }

  if (isMediaRelation(media)) {
    const first = Array.isArray(media.data) ? media.data[0] : media.data;
    return getAltFromItem(first);
  }

  return getAltFromItem(media);
};

export const getMediaAlt = (media?: StrapiMedia | null): string | undefined => {
  const alt = extractMediaAlt(media ?? undefined);
  return alt?.trim() || undefined;
};
