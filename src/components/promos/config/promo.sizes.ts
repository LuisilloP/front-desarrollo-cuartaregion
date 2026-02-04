import type { PromoSizeTokens, Size } from "./promo.types";

export const promoSizeTokens = {
  tile: {
    wrapper:
      "min-h-[172px] sm:min-h-[166px] lg:min-h-[160px] px-4 py-3.5 sm:px-5 sm:py-4",
    title: "text-lg sm:text-xl",
    descClamp: "[-webkit-line-clamp:2]",
    stack: "space-y-1.5",
    watermark: "h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32",
  },
  strip: {
    wrapper:
      "min-h-[140px] sm:min-h-[134px] lg:min-h-[126px] px-4 py-3 sm:px-5 sm:py-3.5",
    title: "text-base sm:text-lg",
    descClamp: "[-webkit-line-clamp:2]",
    stack: "space-y-1",
    watermark: "h-24 w-24 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
  },
} as const satisfies Record<Size, PromoSizeTokens>;
