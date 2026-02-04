import type {
  BannerIntensity,
  BannerIntensityTokens,
  BannerTone,
  BannerVariant,
  BannerVariantThemeTokens,
} from "./banner.types";

const BASE_VARIANT_TOKENS = {
  web: {
    defaultAccent: "sky",
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(56,189,248,0.20)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(56,189,248,0.14)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.44))]",
    lightPanel: "bg-gradient-to-b from-sky-300/45 via-sky-200/15 to-transparent",
    darkGlowStart: "bg-primary/35",
    darkGlowEnd: "bg-sky-500/25",
    darkPanel: "bg-gradient-to-b from-primary/30 via-sky-500/15 to-transparent",
    visualWrap:
      "border border-slate-200/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/5 dark:bg-gradient-to-br dark:from-primary/25 dark:via-surface-strong/80 dark:to-surface/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_45px_rgba(0,0,0,0.55)]",
    visualTint: "from-sky-300/25 via-sky-100/5 to-transparent",
    visualGlowA: "bg-sky-400/20",
    visualGlowB: "bg-sky-300/16",
    darkVisualGlowA: "bg-primary/45",
    darkVisualGlowB: "bg-sky-400/35",
    watermarkPlacement: "right-4 top-4",
  },
  marketing: {
    defaultAccent: "orange",
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(251,146,60,0.18)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(251,146,60,0.18)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.44))]",
    lightPanel: "bg-gradient-to-b from-amber-300/40 via-orange-200/15 to-transparent",
    darkGlowStart: "bg-orange-500/25",
    darkGlowEnd: "bg-amber-400/25",
    darkPanel: "bg-gradient-to-b from-orange-500/25 via-amber-500/15 to-transparent",
    visualWrap:
      "border border-slate-200/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/5 dark:bg-gradient-to-br dark:from-orange-500/20 dark:via-surface-strong/80 dark:to-surface/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_45px_rgba(0,0,0,0.55)]",
    visualTint: "from-amber-300/24 via-orange-100/5 to-transparent",
    visualGlowA: "bg-orange-300/18",
    visualGlowB: "bg-amber-300/16",
    darkVisualGlowA: "bg-orange-400/40",
    darkVisualGlowB: "bg-amber-300/35",
    watermarkPlacement: "right-4 top-4",
  },
  mixed: {
    defaultAccent: "orange",
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(56,189,248,0.20)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(251,146,60,0.14)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.44))]",
    lightPanel:
      "bg-gradient-to-b from-sky-300/36 via-orange-200/14 to-transparent",
    darkGlowStart: "bg-primary/30",
    darkGlowEnd: "bg-orange-500/25",
    darkPanel: "bg-gradient-to-b from-primary/25 via-orange-500/15 to-transparent",
    visualWrap:
      "border border-slate-200/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/5 dark:bg-gradient-to-br dark:from-primary/20 dark:via-surface-strong/75 dark:to-orange-500/15 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_45px_rgba(0,0,0,0.55)]",
    visualTint: "from-sky-300/18 via-orange-200/10 to-transparent",
    visualGlowA: "bg-sky-400/18",
    visualGlowB: "bg-orange-300/14",
    darkVisualGlowA: "bg-primary/35",
    darkVisualGlowB: "bg-orange-400/35",
    watermarkPlacement: "right-3 top-5",
    subtitle: "text-slate-800 dark:text-orange-100",
    bullet:
      "bg-gradient-to-r from-sky-500 to-orange-400 dark:from-sky-400 dark:to-orange-400",
    primaryCta:
      "bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.34)] hover:bg-orange-600 focus-visible:ring-orange-300/45 dark:bg-orange-500 dark:text-white dark:shadow-orange-500/30 dark:hover:bg-orange-400 dark:focus-visible:ring-orange-300/45",
    secondaryCta:
      "border border-slate-300 bg-white/50 text-slate-700 hover:bg-white/80 focus-visible:ring-slate-300/60 dark:border-sky-400/40 dark:bg-transparent dark:text-sky-100 dark:hover:bg-sky-500/10 dark:focus-visible:ring-sky-300/40",
    watermark: "text-slate-500/20 dark:text-sky-300/25",
    rightGlow:
      "bg-[radial-gradient(circle_at_62%_30%,rgba(56,189,248,0.16),transparent_52%),radial-gradient(circle_at_78%_66%,rgba(249,115,22,0.14),transparent_58%)] dark:bg-[radial-gradient(circle_at_62%_30%,rgba(56,189,248,0.14),transparent_56%),radial-gradient(circle_at_78%_66%,rgba(249,115,22,0.12),transparent_62%)]",
    rightSheen:
      "bg-[linear-gradient(116deg,transparent_0%,rgba(2,6,23,0.00)_30%,rgba(14,165,233,0.10)_66%,rgba(249,115,22,0.10)_100%)] dark:bg-[linear-gradient(116deg,transparent_0%,rgba(2,6,23,0.00)_30%,rgba(56,189,248,0.18)_66%,rgba(249,115,22,0.20)_100%)]",
    watermarkColor: "text-slate-900/[0.08] dark:text-white/[0.10]",
  },
} as const satisfies Record<BannerVariant, BannerVariantThemeTokens>;

const VIVID_VARIANT_OVERRIDES = {
  web: {
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(56,189,248,0.26)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(14,165,233,0.20)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.46))]",
    lightPanel: "bg-gradient-to-b from-sky-400/50 via-sky-300/20 to-transparent",
    visualTint: "from-sky-300/32 via-sky-100/8 to-transparent",
  },
  marketing: {
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(251,146,60,0.24)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(249,115,22,0.22)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.46))]",
    lightPanel:
      "bg-gradient-to-b from-orange-400/45 via-amber-300/20 to-transparent",
    visualTint: "from-amber-300/30 via-orange-200/10 to-transparent",
  },
  mixed: {
    lightOverlay:
      "bg-[radial-gradient(560px_circle_at_10%_8%,rgba(56,189,248,0.24)_0%,transparent_60%),radial-gradient(620px_circle_at_88%_92%,rgba(249,115,22,0.20)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.46))]",
    lightPanel:
      "bg-gradient-to-b from-sky-400/42 via-orange-300/18 to-transparent",
    visualTint: "from-sky-300/24 via-orange-200/15 to-transparent",
  },
} as const satisfies Record<BannerVariant, Partial<BannerVariantThemeTokens>>;

export const BANNER_INTENSITY_TOKENS = {
  low: {
    lightOverlay: "opacity-85",
    lightPanel: "opacity-60",
    lightPattern: "opacity-[0.05]",
    darkPattern: "opacity-[0.10]",
    darkPanel: "opacity-50",
    darkGlow: "opacity-75",
    visualGlow: "opacity-80",
    watermark: "opacity-50 dark:opacity-65",
  },
  md: {
    lightOverlay: "opacity-100",
    lightPanel: "opacity-75",
    lightPattern: "opacity-[0.07]",
    darkPattern: "opacity-[0.14]",
    darkPanel: "opacity-60",
    darkGlow: "opacity-100",
    visualGlow: "opacity-100",
    watermark: "opacity-65 dark:opacity-80",
  },
  high: {
    lightOverlay: "opacity-100",
    lightPanel: "opacity-90",
    lightPattern: "opacity-[0.09]",
    darkPattern: "opacity-[0.16]",
    darkPanel: "opacity-75",
    darkGlow: "opacity-100",
    visualGlow: "opacity-100",
    watermark: "opacity-80 dark:opacity-95",
  },
} as const satisfies Record<BannerIntensity, BannerIntensityTokens>;

export function getBannerVariantTokens(
  variant: BannerVariant,
  tone: BannerTone,
): BannerVariantThemeTokens {
  const base = BASE_VARIANT_TOKENS[variant];

  if (tone === "default") {
    return base;
  }

  return {
    ...base,
    ...VIVID_VARIANT_OVERRIDES[variant],
  };
}
