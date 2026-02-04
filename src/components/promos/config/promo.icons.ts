import type { PromoIconOverrides, PromoIconTokens, Variant } from "./promo.types";

const defaultWatermarkIcons = {
  web: "mdi:monitor-dashboard",
  marketing: "mdi:bullseye-arrow",
  mixed: "mdi:layers-triple-outline",
} as const satisfies Record<Variant, string>;

const defaultArrowIcon = "mdi:arrow-top-right";
const iconNamePattern = /^(mdi|lucide|simple-icons):[a-z0-9-]+$/i;

function sanitizeMdiIconName(candidate?: string): string | null {
  if (!candidate) {
    return null;
  }

  const normalized = candidate.trim();
  return iconNamePattern.test(normalized) ? normalized : null;
}

export function resolvePromoIcons(
  variant: Variant,
  overrides: PromoIconOverrides = {},
): PromoIconTokens {
  return {
    watermark:
      sanitizeMdiIconName(overrides.watermarkIcon) ??
      defaultWatermarkIcons[variant],
    arrow: sanitizeMdiIconName(overrides.arrowIcon) ?? defaultArrowIcon,
  };
}
