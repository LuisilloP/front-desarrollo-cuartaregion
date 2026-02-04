import type { BannerIconTokens, BannerVariant } from "./banner.types";

interface BannerIconOverrides {
  watermarkIcon?: string;
  headerIcon?: string;
}

const DEFAULT_BANNER_ICONS = {
  web: {
    watermark: "lucide:layout-template",
    header: "lucide:monitor",
  },
  marketing: {
    watermark: "lucide:target",
    header: "simple-icons:meta",
  },
  mixed: {
    watermark: "lucide:layers",
    header: "lucide:sparkles",
  },
} as const satisfies Record<BannerVariant, Pick<BannerIconTokens, "watermark" | "header">>;

const DEFAULT_ARROW_ICON = "lucide:arrow-right";
const iconNamePattern = /^(lucide|simple-icons|mdi):[a-z0-9-]+$/i;

function sanitizeIconName(value?: string): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return iconNamePattern.test(normalized) ? normalized : null;
}

export function resolveBannerIcons(
  variant: BannerVariant,
  overrides: BannerIconOverrides = {},
): BannerIconTokens {
  const defaults = DEFAULT_BANNER_ICONS[variant];

  return {
    watermark: sanitizeIconName(overrides.watermarkIcon) ?? defaults.watermark,
    header: sanitizeIconName(overrides.headerIcon) ?? defaults.header,
    arrow: DEFAULT_ARROW_ICON,
  };
}
