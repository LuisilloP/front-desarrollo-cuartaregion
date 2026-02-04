import type { BannerIconTokens } from "./banner.types";

interface BannerIconOverrides {
  watermarkIcon?: string;
  badgeIcon?: string;
}

const DEFAULT_ARROW_ICON = "lucide:arrow-right";
const iconNamePattern = /^(lucide|simple-icons|mdi):[a-z0-9-]+$/i;

function sanitizeIconName(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();
  return iconNamePattern.test(normalized) ? normalized : undefined;
}

export function resolveBannerIcons(
  overrides: BannerIconOverrides = {},
): BannerIconTokens {
  return {
    watermark: sanitizeIconName(overrides.watermarkIcon),
    badge: sanitizeIconName(overrides.badgeIcon),
    arrow: DEFAULT_ARROW_ICON,
  };
}
