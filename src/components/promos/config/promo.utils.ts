import { getPromoThemeBaseTokens, promoIntensityMap } from "./promo.tokens";
import type {
  Accent,
  Intensity,
  PromoThemeTokens,
  Tone,
  Variant,
} from "./promo.types";

interface ResolveThemeParams {
  variant: Variant;
  tone?: Tone;
  intensity?: Intensity;
  accent?: Accent;
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
  accent = "auto",
}: ResolveThemeParams): PromoThemeTokens {
  const paletteVariant = accent === "auto" ? variant : accent;
  const theme = getPromoThemeBaseTokens(paletteVariant, tone);
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
