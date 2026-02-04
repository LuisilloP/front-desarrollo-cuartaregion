import type { PromoIconOverrides, PromoIconTokens } from "./promo.types";

const DEFAULT_ARROW_ICON = "lucide:arrow-up-right";
const iconNamePattern = /^(mdi|lucide|simple-icons):[a-z0-9-]+$/i;

function sanitizeIconName(candidate?: string): string | undefined {
  if (!candidate) {
    return undefined;
  }

  const normalized = candidate.trim();
  return iconNamePattern.test(normalized) ? normalized : undefined;
}

export function resolvePromoIcons(
  overrides: PromoIconOverrides = {},
): PromoIconTokens {
  return {
    watermark: sanitizeIconName(overrides.watermarkIcon),
    badge: sanitizeIconName(overrides.badgeIcon),
    arrow: sanitizeIconName(overrides.arrowIcon) ?? DEFAULT_ARROW_ICON,
  };
}
