import type { BannerAccentTokens, BannerResolvedAccentKey } from "./banner.types";

export const BANNER_ACCENT_TOKENS = {
  sky: {
    badge:
      "bg-white/70 border border-sky-300/70 text-sky-700 backdrop-blur-sm dark:border-sky-400/45 dark:bg-sky-500/15 dark:text-sky-100",
    badgeIcon: "text-sky-600 dark:text-sky-300",
    subtitle: "text-slate-800 dark:text-sky-100",
    bullet: "bg-sky-500 dark:bg-sky-400",
    primaryCta:
      "bg-sky-600 text-white shadow-[0_10px_24px_rgba(2,132,199,0.35)] hover:bg-sky-700 focus-visible:ring-sky-300/45 dark:bg-primary dark:text-contrast dark:shadow-primary/30 dark:hover:bg-primary/90 dark:focus-visible:ring-sky-300/40",
    secondaryCta:
      "border border-sky-300 bg-white/50 text-sky-700 hover:bg-sky-50 focus-visible:ring-sky-300/45 dark:border-sky-400/40 dark:bg-transparent dark:text-sky-100 dark:hover:bg-sky-500/10 dark:focus-visible:ring-sky-300/40",
    highlight: "text-sky-700 dark:text-sky-300",
    arrow: "text-white/90",
    watermark: "text-sky-600/20 dark:text-sky-300/25",
    rightGlow:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.16),transparent_60%)]",
    rightSheen:
      "bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(14,165,233,0.10)_100%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(2,6,23,0.35)_100%)]",
    watermarkColor: "text-slate-900/[0.08] dark:text-white/[0.10]",
  },
  orange: {
    badge:
      "bg-white/70 border border-amber-300/70 text-amber-700 backdrop-blur-sm dark:border-orange-400/45 dark:bg-orange-500/15 dark:text-orange-100",
    badgeIcon: "text-orange-600 dark:text-orange-300",
    subtitle: "text-slate-800 dark:text-orange-100",
    bullet: "bg-orange-500 dark:bg-orange-400",
    primaryCta:
      "bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.34)] hover:bg-orange-600 focus-visible:ring-orange-300/45 dark:bg-orange-500 dark:text-white dark:shadow-orange-500/30 dark:hover:bg-orange-400 dark:focus-visible:ring-orange-300/45",
    secondaryCta:
      "border border-amber-300 bg-white/50 text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-300/45 dark:border-orange-400/40 dark:bg-transparent dark:text-orange-100 dark:hover:bg-orange-500/10 dark:focus-visible:ring-orange-300/45",
    highlight: "text-orange-700 dark:text-orange-300",
    arrow: "text-white/90",
    watermark: "text-orange-600/20 dark:text-orange-300/25",
    rightGlow:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.16),transparent_60%)]",
    rightSheen:
      "bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(249,115,22,0.10)_100%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(2,6,23,0.35)_100%)]",
    watermarkColor: "text-slate-900/[0.08] dark:text-white/[0.10]",
  },
  slate: {
    badge:
      "bg-white/70 border border-slate-300/70 text-slate-700 backdrop-blur-sm dark:border-slate-400/45 dark:bg-slate-500/15 dark:text-slate-100",
    badgeIcon: "text-slate-600 dark:text-slate-300",
    subtitle: "text-slate-800 dark:text-slate-100",
    bullet: "bg-slate-500 dark:bg-slate-300",
    primaryCta:
      "bg-slate-800 text-white shadow-[0_10px_24px_rgba(15,23,42,0.26)] hover:bg-slate-900 focus-visible:ring-slate-300/45 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-200/55",
    secondaryCta:
      "border border-slate-300 bg-white/55 text-slate-700 hover:bg-white/85 focus-visible:ring-slate-300/50 dark:border-slate-400/45 dark:bg-transparent dark:text-slate-100 dark:hover:bg-slate-500/10 dark:focus-visible:ring-slate-300/45",
    highlight: "text-slate-700 dark:text-slate-300",
    arrow: "text-white/90",
    watermark: "text-slate-600/20 dark:text-slate-300/25",
    rightGlow:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(100,116,139,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(100,116,139,0.16),transparent_60%)]",
    rightSheen:
      "bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(51,65,85,0.16)_100%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(2,6,23,0.35)_100%)]",
    watermarkColor: "text-slate-900/[0.08] dark:text-white/[0.10]",
  },
  rose: {
    badge:
      "bg-white/70 border border-rose-300/70 text-rose-700 backdrop-blur-sm dark:border-rose-400/45 dark:bg-rose-500/15 dark:text-rose-100",
    badgeIcon: "text-rose-600 dark:text-rose-300",
    subtitle: "text-slate-800 dark:text-rose-100",
    bullet: "bg-rose-500 dark:bg-rose-400",
    primaryCta:
      "bg-rose-600 text-white shadow-[0_10px_24px_rgba(225,29,72,0.30)] hover:bg-rose-700 focus-visible:ring-rose-300/45 dark:bg-rose-500 dark:hover:bg-rose-400 dark:focus-visible:ring-rose-300/45",
    secondaryCta:
      "border border-rose-300 bg-white/50 text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-300/45 dark:border-rose-400/40 dark:bg-transparent dark:text-rose-100 dark:hover:bg-rose-500/10 dark:focus-visible:ring-rose-300/45",
    highlight: "text-rose-700 dark:text-rose-300",
    arrow: "text-white/90",
    watermark: "text-rose-600/20 dark:text-rose-300/25",
    rightGlow:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(244,63,94,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(244,63,94,0.16),transparent_60%)]",
    rightSheen:
      "bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(244,63,94,0.10)_100%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(2,6,23,0.00)_35%,rgba(2,6,23,0.35)_100%)]",
    watermarkColor: "text-slate-900/[0.08] dark:text-white/[0.10]",
  },
} as const satisfies Record<BannerResolvedAccentKey, BannerAccentTokens>;
