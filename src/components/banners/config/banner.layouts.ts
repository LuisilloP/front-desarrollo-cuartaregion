import type {
  BannerLayout,
  BannerLayoutTokens,
  BannerSize,
  BannerSizeTokens,
} from "./banner.types";

export const BANNER_SIZE_TOKENS = {
  default: {
    sectionPadding: "px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
    sectionGap: "gap-8 lg:gap-10",
    title: "text-3xl sm:text-4xl lg:text-5xl",
    subtitle: "text-lg",
    description: "text-sm sm:text-base",
    visualMinHeight: "min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]",
    visualPadding: "p-4 sm:p-5",
    watermarkSize: "h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
    ctaPadding: "px-5 py-3",
    badge: "px-3 py-1 text-[11px]",
  },
  compact: {
    sectionPadding: "px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8",
    sectionGap: "gap-6 lg:gap-8",
    title: "text-2xl sm:text-3xl lg:text-4xl",
    subtitle: "text-base",
    description: "text-sm",
    visualMinHeight: "min-h-[180px] sm:min-h-[210px] lg:min-h-[240px]",
    visualPadding: "p-3.5 sm:p-4",
    watermarkSize: "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
    ctaPadding: "px-4 py-2.5",
    badge: "px-2.5 py-0.5 text-[10px]",
  },
} as const satisfies Record<BannerSize, BannerSizeTokens>;

export function resolveBannerLayoutTokens(
  layout: BannerLayout,
  reverse: boolean,
): BannerLayoutTokens {
  const isSplit = layout === "split";

  return {
    grid: isSplit ? "lg:grid-cols-2 lg:items-center" : "lg:grid-cols-1",
    textOrder: isSplit ? (reverse ? "lg:order-2" : "lg:order-1") : "",
    visualOrder: isSplit ? (reverse ? "lg:order-1" : "lg:order-2") : "",
    accentPanelPosition: reverse ? "left-0" : "right-0",
    accentPanelClipPath: reverse
      ? "clip-path: polygon(0 0, 84% 0, 100% 100%, 16% 100%);"
      : "clip-path: polygon(16% 0, 100% 0, 84% 100%, 0 100%);",
    showAccentPanel: isSplit,
  };
}
