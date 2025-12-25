import { env } from "../env";
import type { StrapiEntity, StrapiMedia } from "./types";

const stripTrailingSlash = (value: string) => (value.endsWith("/") ? value.slice(0, -1) : value);
const stripLeadingSlash = (value: string) => (value.startsWith("/") ? value.slice(1) : value);

export const toAbsoluteUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = stripTrailingSlash(env.strapiUrl);
  return `${base}/${stripLeadingSlash(url)}`;
};

const extractMediaUrl = (media: StrapiMedia | undefined | null): string | undefined => {
  if (!media) return undefined;

  if (Array.isArray(media)) {
    const first = media[0];
    return first?.url ?? first?.attributes?.url;
  }

  const data = (media as { data?: unknown }).data;
  if (data) {
    const array = Array.isArray(data) ? data : [data];
    const first = array[0] as StrapiEntity<{ url?: string }> | undefined;
    return first?.attributes?.url;
  }

  return (media as { url?: string }).url ?? (media as { attributes?: { url?: string } }).attributes?.url;
};

export const getMediaUrl = (media?: StrapiMedia | null): string | undefined => {
  const url = extractMediaUrl(media ?? undefined);
  return toAbsoluteUrl(url);
};

const extractMediaAlt = (media: StrapiMedia | undefined | null): string | undefined => {
  if (!media) return undefined;

  if (Array.isArray(media)) {
    const first = media[0];
    return first?.alternativeText ?? first?.attributes?.alternativeText;
  }

  const data = (media as { data?: unknown }).data;
  if (data) {
    const array = Array.isArray(data) ? data : [data];
    const first = array[0] as StrapiEntity<{ alternativeText?: string }> | undefined;
    return first?.attributes?.alternativeText;
  }

  return (
    (media as { alternativeText?: string }).alternativeText ??
    (media as { attributes?: { alternativeText?: string } }).attributes?.alternativeText
  );
};

export const getMediaAlt = (media?: StrapiMedia | null): string | undefined => {
  const alt = extractMediaAlt(media ?? undefined);
  return alt?.trim() || undefined;
};
