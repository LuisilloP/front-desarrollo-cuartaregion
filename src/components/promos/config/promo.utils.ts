import {
  getPromoAccentTokens,
  getPromoVariantTokens,
  promoIntensityMap,
} from "./promo.tokens";
import type {
  AccentKey,
  Intensity,
  PromoThemeTokens,
  Tone,
  Variant,
} from "./promo.types";

interface ResolveThemeParams {
  variant: Variant;
  tone?: Tone;
  intensity?: Intensity;
  accentKey?: AccentKey;
}

const localImagePathPattern =
  /^\/(?!\/)(?!.*\.\.)(?!.*(?:^|\/)\.\/)(?!.*(?:javascript:|data:|vbscript:)).+/i;

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function isSafeLocalImage(path?: string): path is `/${string}` {
  if (!path) {
    return false;
  }

  const normalized = path.trim();
  return localImagePathPattern.test(normalized);
}

export function resolveTheme({
  variant,
  tone = "default",
  intensity = "md",
  accentKey = "auto",
}: ResolveThemeParams): PromoThemeTokens {
  const variantTheme = getPromoVariantTokens(variant, tone);
  const resolvedAccentKey =
    accentKey === "auto" ? variantTheme.defaultAccent : accentKey;
  const accentTheme =
    accentKey === "auto" ? null : getPromoAccentTokens(resolvedAccentKey, tone);
  const theme = accentTheme ? { ...variantTheme, ...accentTheme } : variantTheme;
  const intensityTokens = promoIntensityMap[intensity];

  return {
    ...theme,
    strip: cx(theme.strip, intensityTokens.strip),
    glowMain: cx(theme.glowMain, intensityTokens.glowMain),
    glowSoft: cx(theme.glowSoft, intensityTokens.glowSoft),
    pattern: intensityTokens.pattern,
    rail: intensityTokens.rail,
    watermarkOpacity: intensityTokens.watermark,
  };
}
