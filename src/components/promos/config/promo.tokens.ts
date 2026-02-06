import type {
  Intensity,
  PromoAccentTokens,
  PromoIntensityTokens,
  PromoResolvedAccentKey,
  PromoVariant,
  PromoVariantTokens,
  Tone,
} from "./promo.types";

const BASE_PROMO_VARIANT_TOKENS = {
  web: {
    defaultAccent: "sky",
    badge:
      "border-sky-200/90 bg-sky-50/90 text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-sky-100",
    strip:
      "bg-gradient-to-b from-sky-300 via-sky-500/85 to-sky-600/75 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.26)] dark:from-sky-300/80 dark:via-sky-400/65 dark:to-transparent dark:group-hover:shadow-none",
    sheen:
      "bg-[linear-gradient(125deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0)_44%,rgba(14,165,233,0.08)_100%)] dark:bg-[linear-gradient(125deg,rgba(255,255,255,0.05)_0%,rgba(2,6,23,0)_54%,rgba(56,189,248,0.13)_100%)]",
    ring:
      "hover:ring-1 hover:ring-sky-300/45 focus-visible:ring-sky-400/45 dark:hover:ring-sky-400/28 dark:focus-visible:ring-sky-300/55",
    footerLine: "from-sky-500/72 via-sky-400/55 to-transparent dark:from-sky-300/35",
    hint:
      "text-slate-600 group-hover:text-sky-700 group-focus-visible:text-sky-700 dark:text-slate-300/80 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    arrow:
      "text-slate-400 group-hover:text-sky-600 group-focus-visible:text-sky-600 dark:text-white/55 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(56,189,248,0)_72%)]",
    glowSoft:
      "-bottom-9 -right-8 bg-[radial-gradient(circle,rgba(14,165,233,0.08)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,rgba(56,189,248,0)_72%)]",
    watermarkPlacement: "right-3 top-[46%] sm:right-4",
  },
  marketing: {
    defaultAccent: "orange",
    badge:
      "border-orange-200/90 bg-orange-50/90 text-orange-700 dark:border-white/10 dark:bg-white/5 dark:text-orange-100",
    strip:
      "bg-gradient-to-b from-orange-300 via-orange-500/85 to-orange-600/75 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.26)] dark:from-orange-300/80 dark:via-orange-400/65 dark:to-transparent dark:group-hover:shadow-none",
    sheen:
      "bg-[linear-gradient(125deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0)_44%,rgba(251,146,60,0.08)_100%)] dark:bg-[linear-gradient(125deg,rgba(255,255,255,0.05)_0%,rgba(2,6,23,0)_54%,rgba(249,115,22,0.13)_100%)]",
    ring:
      "hover:ring-1 hover:ring-orange-300/45 focus-visible:ring-orange-400/45 dark:hover:ring-orange-400/30 dark:focus-visible:ring-orange-300/55",
    footerLine:
      "from-orange-500/72 via-orange-400/55 to-transparent dark:from-orange-300/35",
    hint:
      "text-slate-600 group-hover:text-orange-700 group-focus-visible:text-orange-700 dark:text-slate-300/80 dark:group-hover:text-orange-300 dark:group-focus-visible:text-orange-300",
    arrow:
      "text-slate-400 group-hover:text-orange-600 group-focus-visible:text-orange-600 dark:text-white/55 dark:group-hover:text-orange-300 dark:group-focus-visible:text-orange-300",
    glowMain:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.24)_0%,rgba(251,146,60,0)_72%)]",
    glowSoft:
      "-top-9 -left-8 bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,rgba(251,146,60,0)_72%)]",
    watermarkPlacement: "right-4 top-[44%] sm:right-5",
  },
  mixed: {
    defaultAccent: "orange",
    badge:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-none dark:bg-white/5 dark:text-sky-100",
    strip:
      "bg-gradient-to-b from-sky-500/92 via-sky-500/72 to-orange-500/72 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.22)] dark:from-sky-300/78 dark:via-sky-400/62 dark:to-orange-300/56 dark:group-hover:shadow-none",
    sheen:
      "bg-[linear-gradient(125deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0)_44%,rgba(14,165,233,0.07)_70%,rgba(251,146,60,0.07)_100%)] dark:bg-[linear-gradient(125deg,rgba(255,255,255,0.05)_0%,rgba(2,6,23,0)_54%,rgba(56,189,248,0.11)_72%,rgba(251,146,60,0.10)_100%)]",
    ring:
      "hover:ring-1 hover:ring-sky-300/42 focus-visible:ring-sky-400/45 dark:hover:ring-sky-400/28 dark:focus-visible:ring-sky-300/55",
    footerLine:
      "from-sky-500/62 via-orange-500/58 to-transparent dark:from-slate-300/30",
    hint:
      "text-slate-600 group-hover:text-sky-700 group-focus-visible:text-sky-700 dark:text-slate-300/80 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    arrow:
      "text-slate-400 group-hover:text-sky-600 group-focus-visible:text-sky-600 dark:text-white/55 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.14)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.20)_0%,rgba(56,189,248,0)_72%)]",
    glowSoft:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,rgba(251,146,60,0)_72%)]",
    watermarkPlacement: "right-3 top-[48%] sm:right-4",
  },
} as const satisfies Record<PromoVariant, PromoVariantTokens>;

const VIVID_VARIANT_OVERRIDES = {
  web: {
    badge:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-sky-100",
    strip:
      "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.35)] dark:from-sky-300/80 dark:via-sky-400/65 dark:to-transparent dark:group-hover:shadow-none",
    footerLine: "from-sky-600/90 via-sky-500/80 to-transparent dark:from-sky-300/35",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.22)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(56,189,248,0)_72%)]",
    glowSoft:
      "-bottom-9 -right-8 bg-[radial-gradient(circle,rgba(14,165,233,0.10)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,rgba(56,189,248,0)_72%)]",
  },
  marketing: {
    badge:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-white/10 dark:bg-white/5 dark:text-orange-100",
    strip:
      "bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.35)] dark:from-orange-300/80 dark:via-orange-400/65 dark:to-transparent dark:group-hover:shadow-none",
    footerLine:
      "from-orange-600/90 via-orange-500/80 to-transparent dark:from-orange-300/35",
    glowMain:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.22)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.24)_0%,rgba(251,146,60,0)_72%)]",
    glowSoft:
      "-top-9 -left-8 bg-[radial-gradient(circle,rgba(249,115,22,0.10)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,rgba(251,146,60,0)_72%)]",
  },
  mixed: {
    strip:
      "bg-gradient-to-b from-sky-500 via-sky-500/85 to-orange-500 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.26)] dark:from-sky-300/78 dark:via-sky-400/62 dark:to-orange-300/56 dark:group-hover:shadow-none",
    footerLine:
      "from-sky-600/78 via-orange-500/72 to-transparent dark:from-slate-300/30",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.20)_0%,rgba(56,189,248,0)_72%)]",
    glowSoft:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,rgba(251,146,60,0)_72%)]",
  },
} as const satisfies Record<PromoVariant, PromoAccentTokens>;

export const PROMO_ACCENT_TOKENS = {
  sky: {
    badge:
      "border-sky-200/90 bg-sky-50/90 text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-sky-100",
    strip:
      "bg-gradient-to-b from-sky-300 via-sky-500/85 to-sky-600/75 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.26)] dark:from-sky-300/80 dark:via-sky-400/65 dark:to-transparent dark:group-hover:shadow-none",
    ring:
      "hover:ring-1 hover:ring-sky-300/45 focus-visible:ring-sky-400/45 dark:hover:ring-sky-400/28 dark:focus-visible:ring-sky-300/55",
    footerLine: "from-sky-500/72 via-sky-400/55 to-transparent dark:from-sky-300/35",
    hint:
      "text-slate-600 group-hover:text-sky-700 group-focus-visible:text-sky-700 dark:text-slate-300/80 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    arrow:
      "text-slate-400 group-hover:text-sky-600 group-focus-visible:text-sky-600 dark:text-white/55 dark:group-hover:text-sky-300 dark:group-focus-visible:text-sky-300",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.18)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(56,189,248,0)_72%)]",
    glowSoft:
      "-bottom-9 -right-8 bg-[radial-gradient(circle,rgba(14,165,233,0.08)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,rgba(56,189,248,0)_72%)]",
  },
  orange: {
    badge:
      "border-orange-200/90 bg-orange-50/90 text-orange-700 dark:border-white/10 dark:bg-white/5 dark:text-orange-100",
    strip:
      "bg-gradient-to-b from-orange-300 via-orange-500/85 to-orange-600/75 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.26)] dark:from-orange-300/80 dark:via-orange-400/65 dark:to-transparent dark:group-hover:shadow-none",
    ring:
      "hover:ring-1 hover:ring-orange-300/45 focus-visible:ring-orange-400/45 dark:hover:ring-orange-400/30 dark:focus-visible:ring-orange-300/55",
    footerLine:
      "from-orange-500/72 via-orange-400/55 to-transparent dark:from-orange-300/35",
    hint:
      "text-slate-600 group-hover:text-orange-700 group-focus-visible:text-orange-700 dark:text-slate-300/80 dark:group-hover:text-orange-300 dark:group-focus-visible:text-orange-300",
    arrow:
      "text-slate-400 group-hover:text-orange-600 group-focus-visible:text-orange-600 dark:text-white/55 dark:group-hover:text-orange-300 dark:group-focus-visible:text-orange-300",
    glowMain:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.24)_0%,rgba(251,146,60,0)_72%)]",
    glowSoft:
      "-top-9 -left-8 bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,rgba(251,146,60,0)_72%)]",
  },
  slate: {
    badge:
      "border-slate-300/90 bg-slate-100/90 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
    strip:
      "bg-gradient-to-b from-slate-300 via-slate-500/80 to-slate-700/70 group-hover:shadow-[0_0_8px_rgba(51,65,85,0.24)] dark:from-slate-300/70 dark:via-slate-400/55 dark:to-transparent dark:group-hover:shadow-none",
    ring:
      "hover:ring-1 hover:ring-slate-300/45 focus-visible:ring-slate-400/45 dark:hover:ring-slate-400/28 dark:focus-visible:ring-slate-300/55",
    footerLine: "from-slate-500/72 via-slate-400/55 to-transparent dark:from-slate-300/35",
    hint:
      "text-slate-600 group-hover:text-slate-800 group-focus-visible:text-slate-800 dark:text-slate-300/80 dark:group-hover:text-slate-100 dark:group-focus-visible:text-slate-100",
    arrow:
      "text-slate-400 group-hover:text-slate-700 group-focus-visible:text-slate-700 dark:text-white/55 dark:group-hover:text-slate-100 dark:group-focus-visible:text-slate-100",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(100,116,139,0.18)_0%,rgba(100,116,139,0)_68%)] dark:bg-[radial-gradient(circle,rgba(148,163,184,0.22)_0%,rgba(148,163,184,0)_72%)]",
    glowSoft:
      "-bottom-9 -right-8 bg-[radial-gradient(circle,rgba(100,116,139,0.08)_0%,rgba(100,116,139,0)_68%)] dark:bg-[radial-gradient(circle,rgba(148,163,184,0.14)_0%,rgba(148,163,184,0)_72%)]",
  },
  rose: {
    badge:
      "border-rose-200/90 bg-rose-50/90 text-rose-700 dark:border-white/10 dark:bg-white/5 dark:text-rose-100",
    strip:
      "bg-gradient-to-b from-rose-300 via-rose-500/85 to-rose-600/75 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.26)] dark:from-rose-300/80 dark:via-rose-400/65 dark:to-transparent dark:group-hover:shadow-none",
    ring:
      "hover:ring-1 hover:ring-rose-300/45 focus-visible:ring-rose-400/45 dark:hover:ring-rose-400/30 dark:focus-visible:ring-rose-300/55",
    footerLine: "from-rose-500/72 via-rose-400/55 to-transparent dark:from-rose-300/35",
    hint:
      "text-slate-600 group-hover:text-rose-700 group-focus-visible:text-rose-700 dark:text-slate-300/80 dark:group-hover:text-rose-300 dark:group-focus-visible:text-rose-300",
    arrow:
      "text-slate-400 group-hover:text-rose-600 group-focus-visible:text-rose-600 dark:text-white/55 dark:group-hover:text-rose-300 dark:group-focus-visible:text-rose-300",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(244,63,94,0.18)_0%,rgba(244,63,94,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,113,133,0.22)_0%,rgba(251,113,133,0)_72%)]",
    glowSoft:
      "-bottom-9 -right-8 bg-[radial-gradient(circle,rgba(244,63,94,0.08)_0%,rgba(244,63,94,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,113,133,0.14)_0%,rgba(251,113,133,0)_72%)]",
  },
} as const satisfies Record<PromoResolvedAccentKey, PromoAccentTokens>;

const VIVID_ACCENT_OVERRIDES = {
  sky: {
    strip:
      "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.35)] dark:from-sky-300/80 dark:via-sky-400/65 dark:to-transparent dark:group-hover:shadow-none",
    footerLine: "from-sky-600/90 via-sky-500/80 to-transparent dark:from-sky-300/35",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(14,165,233,0.22)_0%,rgba(14,165,233,0)_68%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(56,189,248,0)_72%)]",
  },
  orange: {
    strip:
      "bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.35)] dark:from-orange-300/80 dark:via-orange-400/65 dark:to-transparent dark:group-hover:shadow-none",
    footerLine:
      "from-orange-600/90 via-orange-500/80 to-transparent dark:from-orange-300/35",
    glowMain:
      "-bottom-10 -right-10 bg-[radial-gradient(circle,rgba(249,115,22,0.22)_0%,rgba(249,115,22,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,146,60,0.24)_0%,rgba(251,146,60,0)_72%)]",
  },
  slate: {
    strip:
      "bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 group-hover:shadow-[0_0_8px_rgba(51,65,85,0.30)] dark:from-slate-300/70 dark:via-slate-400/55 dark:to-transparent dark:group-hover:shadow-none",
    footerLine: "from-slate-600/85 via-slate-500/75 to-transparent dark:from-slate-300/35",
  },
  rose: {
    strip:
      "bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.32)] dark:from-rose-300/80 dark:via-rose-400/65 dark:to-transparent dark:group-hover:shadow-none",
    footerLine: "from-rose-600/85 via-rose-500/75 to-transparent dark:from-rose-300/35",
    glowMain:
      "-top-10 -left-10 bg-[radial-gradient(circle,rgba(244,63,94,0.22)_0%,rgba(244,63,94,0)_68%)] dark:bg-[radial-gradient(circle,rgba(251,113,133,0.24)_0%,rgba(251,113,133,0)_72%)]",
  },
} as const satisfies Record<PromoResolvedAccentKey, PromoAccentTokens>;

export const promoIntensityMap = {
  low: {
    strip: "opacity-85 group-hover:[filter:brightness(1.04)]",
    glowMain: "h-28 w-28 opacity-85 blur-xl",
    glowSoft: "h-20 w-20 opacity-75 blur-xl",
    pattern: "opacity-[0.03] dark:opacity-[0.10]",
    rail: "opacity-60 group-hover:opacity-90 group-focus-visible:opacity-90",
    watermark: "opacity-40 dark:opacity-75",
  },
  md: {
    strip: "opacity-95 group-hover:[filter:brightness(1.08)]",
    glowMain: "h-32 w-32 opacity-100 blur-xl",
    glowSoft: "h-24 w-24 opacity-90 blur-xl",
    pattern: "opacity-[0.04] dark:opacity-[0.12]",
    rail: "opacity-75 group-hover:opacity-100 group-focus-visible:opacity-100",
    watermark: "opacity-50 dark:opacity-90",
  },
  high: {
    strip: "opacity-100 group-hover:[filter:brightness(1.12)]",
    glowMain: "h-36 w-36 opacity-100 blur-xl",
    glowSoft: "h-28 w-28 opacity-100 blur-xl",
    pattern: "opacity-[0.05] dark:opacity-[0.14]",
    rail: "opacity-90 group-hover:opacity-100 group-focus-visible:opacity-100",
    watermark: "opacity-60 dark:opacity-100",
  },
} as const satisfies Record<Intensity, PromoIntensityTokens>;

export function getPromoVariantTokens(
  variant: PromoVariant,
  tone: Tone,
): PromoVariantTokens {
  const base = BASE_PROMO_VARIANT_TOKENS[variant];

  if (tone === "default") {
    return base;
  }

  return {
    ...base,
    ...VIVID_VARIANT_OVERRIDES[variant],
  };
}

export function getPromoAccentTokens(
  accentKey: PromoResolvedAccentKey,
  tone: Tone,
): PromoAccentTokens {
  const base = PROMO_ACCENT_TOKENS[accentKey];

  if (tone === "default") {
    return base;
  }

  return {
    ...base,
    ...VIVID_ACCENT_OVERRIDES[accentKey],
  };
}