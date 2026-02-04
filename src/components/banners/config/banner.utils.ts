import { BANNER_ACCENT_TOKENS } from "./banner.tokens";
import { BANNER_INTENSITY_TOKENS, getBannerVariantTokens } from "./banner.theme";
import type {
  BannerAccentKey,
  BannerIntensity,
  BannerResolvedAccentKey,
  BannerTone,
  BannerVariant,
  ResolvedBannerThemeTokens,
} from "./banner.types";

interface ResolveBannerThemeParams {
  variant: BannerVariant;
  accentKey?: BannerAccentKey;
  tone?: BannerTone;
  intensity?: BannerIntensity;
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

function resolveAccentKey(
  variant: BannerVariant,
  accentKey: BannerAccentKey,
  tone: BannerTone,
): BannerResolvedAccentKey {
  if (accentKey !== "auto") {
    return accentKey;
  }

  return getBannerVariantTokens(variant, tone).defaultAccent;
}

export function resolveBannerTheme({
  variant,
  accentKey = "auto",
  tone = "default",
  intensity = "md",
}: ResolveBannerThemeParams): ResolvedBannerThemeTokens {
  const variantTheme = getBannerVariantTokens(variant, tone);
  const resolvedAccentKey = resolveAccentKey(variant, accentKey, tone);
  const accent = BANNER_ACCENT_TOKENS[resolvedAccentKey];

  return {
    accentKey: resolvedAccentKey,
    variant: variantTheme,
    intensity: BANNER_INTENSITY_TOKENS[intensity],
    badge: variantTheme.badge ?? accent.badge,
    subtitle: variantTheme.subtitle ?? accent.subtitle,
    bullet: variantTheme.bullet ?? accent.bullet,
    primaryCta: variantTheme.primaryCta ?? accent.primaryCta,
    secondaryCta: variantTheme.secondaryCta ?? accent.secondaryCta,
    highlight: variantTheme.highlight ?? accent.highlight,
    arrow: variantTheme.arrow ?? accent.arrow,
    badgeIcon: variantTheme.badgeIcon ?? accent.badgeIcon,
    watermark: variantTheme.watermark ?? accent.watermark,
  };
}
