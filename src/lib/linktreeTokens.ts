export type LinkPillVariant = "web" | "marketing" | "mixed" | "neutral";

export interface LinkPillTokens {
  border: string;
  background: string;
  iconWrap: string;
  iconColor: string;
  chevron: string;
  hover: string;
  focus: string;
}

const BASELINE: LinkPillTokens = {
  border: "border-slate-300/65 dark:border-slate-600/50",
  background:
    "bg-white/84 dark:bg-slate-900/70",
  iconWrap:
    "border-slate-300/70 bg-slate-100/85 dark:border-slate-600/55 dark:bg-slate-800/72",
  iconColor: "text-slate-700 dark:text-slate-200",
  chevron: "text-slate-600 dark:text-slate-300",
  hover:
    "hover:border-slate-400/75 dark:hover:border-slate-400/65 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)] dark:hover:shadow-[0_20px_36px_rgba(2,6,23,0.56)]",
  focus:
    "focus-visible:ring-slate-400/65 dark:focus-visible:ring-slate-300/65",
};

const VARIANT_TOKENS: Record<LinkPillVariant, LinkPillTokens> = {
  neutral: BASELINE,
  web: {
    border: "border-sky-300/65 dark:border-sky-400/45",
    background:
      "bg-[linear-gradient(110deg,rgba(240,249,255,0.92)_0%,rgba(255,255,255,0.88)_48%,rgba(186,230,253,0.38)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.78)_48%,rgba(14,165,233,0.16)_100%)]",
    iconWrap:
      "border-sky-300/70 bg-sky-100/88 dark:border-sky-500/45 dark:bg-sky-500/18",
    iconColor: "text-sky-700 dark:text-sky-200",
    chevron: "text-sky-700 dark:text-sky-200",
    hover:
      "hover:border-sky-400/85 dark:hover:border-sky-300/72 hover:shadow-[0_18px_34px_rgba(14,165,233,0.2)] dark:hover:shadow-[0_20px_36px_rgba(14,165,233,0.24)]",
    focus:
      "focus-visible:ring-sky-400/70 dark:focus-visible:ring-sky-300/70",
  },
  marketing: {
    border: "border-orange-300/65 dark:border-orange-400/45",
    background:
      "bg-[linear-gradient(110deg,rgba(255,247,237,0.92)_0%,rgba(255,255,255,0.88)_48%,rgba(254,215,170,0.34)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.78)_48%,rgba(251,146,60,0.18)_100%)]",
    iconWrap:
      "border-orange-300/70 bg-orange-100/88 dark:border-orange-500/45 dark:bg-orange-500/18",
    iconColor: "text-orange-700 dark:text-orange-200",
    chevron: "text-orange-700 dark:text-orange-200",
    hover:
      "hover:border-orange-400/85 dark:hover:border-orange-300/72 hover:shadow-[0_18px_34px_rgba(249,115,22,0.2)] dark:hover:shadow-[0_20px_36px_rgba(249,115,22,0.24)]",
    focus:
      "focus-visible:ring-orange-400/70 dark:focus-visible:ring-orange-300/70",
  },
  mixed: {
    border: "border-sky-300/65 dark:border-sky-400/45",
    background:
      "bg-[linear-gradient(110deg,rgba(240,249,255,0.92)_0%,rgba(255,255,255,0.88)_52%,rgba(254,215,170,0.34)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.8)_52%,rgba(251,146,60,0.16)_100%)]",
    iconWrap:
      "border-sky-300/70 bg-[linear-gradient(120deg,rgba(224,242,254,0.88)_0%,rgba(255,237,213,0.78)_100%)] dark:border-sky-500/45 dark:bg-[linear-gradient(120deg,rgba(14,165,233,0.22)_0%,rgba(251,146,60,0.2)_100%)]",
    iconColor: "text-sky-700 dark:text-sky-200",
    chevron: "text-sky-700 dark:text-sky-200",
    hover:
      "hover:border-sky-400/85 dark:hover:border-sky-300/72 hover:shadow-[0_18px_34px_rgba(56,189,248,0.2)] dark:hover:shadow-[0_20px_36px_rgba(56,189,248,0.24)]",
    focus:
      "focus-visible:ring-sky-400/70 dark:focus-visible:ring-sky-300/70",
  },
};

const ACCENT_TOKENS: Record<string, Partial<LinkPillTokens>> = {
  whatsapp: {
    border: "border-emerald-300/65 dark:border-emerald-400/45",
    background:
      "bg-[linear-gradient(110deg,rgba(236,253,245,0.92)_0%,rgba(255,255,255,0.88)_50%,rgba(167,243,208,0.34)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.78)_50%,rgba(16,185,129,0.16)_100%)]",
    iconWrap:
      "border-emerald-300/70 bg-emerald-100/88 dark:border-emerald-500/45 dark:bg-emerald-500/18",
    iconColor: "text-emerald-700 dark:text-emerald-200",
    chevron: "text-emerald-700 dark:text-emerald-200",
    hover:
      "hover:border-emerald-400/85 dark:hover:border-emerald-300/72 hover:shadow-[0_18px_34px_rgba(16,185,129,0.2)] dark:hover:shadow-[0_20px_36px_rgba(16,185,129,0.24)]",
    focus:
      "focus-visible:ring-emerald-400/70 dark:focus-visible:ring-emerald-300/70",
  },
  github: {
    border: "border-slate-400/65 dark:border-slate-500/50",
    background:
      "bg-[linear-gradient(110deg,rgba(248,250,252,0.93)_0%,rgba(255,255,255,0.9)_52%,rgba(226,232,240,0.5)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.84)_52%,rgba(2,6,23,0.68)_100%)]",
    iconWrap:
      "border-slate-400/70 bg-slate-200/85 dark:border-slate-500/55 dark:bg-slate-700/45",
    iconColor: "text-slate-900 dark:text-slate-100",
    chevron: "text-slate-800 dark:text-slate-200",
    hover:
      "hover:border-slate-500/80 dark:hover:border-slate-400/68 hover:shadow-[0_18px_34px_rgba(30,41,59,0.2)] dark:hover:shadow-[0_20px_36px_rgba(2,6,23,0.6)]",
    focus:
      "focus-visible:ring-slate-500/70 dark:focus-visible:ring-slate-300/70",
  },
  instagram: {
    border: "border-fuchsia-300/70 dark:border-fuchsia-400/50",
    background:
      "bg-[linear-gradient(110deg,rgba(250,245,255,0.94)_0%,rgba(255,255,255,0.9)_46%,rgba(233,213,255,0.48)_100%)] dark:bg-[linear-gradient(110deg,rgba(30,27,75,0.9)_0%,rgba(17,24,39,0.84)_50%,rgba(147,51,234,0.18)_100%)]",
    iconWrap:
      "border-fuchsia-300/75 bg-fuchsia-100/88 dark:border-fuchsia-500/50 dark:bg-fuchsia-500/20",
    iconColor: "text-fuchsia-700 dark:text-fuchsia-200",
    chevron: "text-fuchsia-700 dark:text-fuchsia-200",
    hover:
      "hover:border-fuchsia-400/85 dark:hover:border-fuchsia-300/72 hover:shadow-[0_18px_34px_rgba(192,38,211,0.24)] dark:hover:shadow-[0_20px_36px_rgba(147,51,234,0.3)]",
    focus:
      "focus-visible:ring-fuchsia-400/70 dark:focus-visible:ring-fuchsia-300/72",
  },
  facebook: {
    border: "border-blue-300/72 dark:border-blue-400/50",
    background:
      "bg-[linear-gradient(110deg,rgba(239,246,255,0.94)_0%,rgba(255,255,255,0.9)_48%,rgba(191,219,254,0.5)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.82)_50%,rgba(59,130,246,0.18)_100%)]",
    iconWrap:
      "border-blue-300/75 bg-blue-100/90 dark:border-blue-500/50 dark:bg-blue-500/20",
    iconColor: "text-blue-700 dark:text-blue-200",
    chevron: "text-blue-700 dark:text-blue-200",
    hover:
      "hover:border-blue-400/85 dark:hover:border-blue-300/72 hover:shadow-[0_18px_34px_rgba(37,99,235,0.22)] dark:hover:shadow-[0_20px_36px_rgba(59,130,246,0.28)]",
    focus:
      "focus-visible:ring-blue-400/70 dark:focus-visible:ring-blue-300/72",
  },
};

const mergeTokens = (
  base: LinkPillTokens,
  override?: Partial<LinkPillTokens>,
): LinkPillTokens => ({
  border: override?.border ?? base.border,
  background: override?.background ?? base.background,
  iconWrap: override?.iconWrap ?? base.iconWrap,
  iconColor: override?.iconColor ?? base.iconColor,
  chevron: override?.chevron ?? base.chevron,
  hover: override?.hover ?? base.hover,
  focus: override?.focus ?? base.focus,
});

export const resolveTokens = (
  variant: LinkPillVariant = "neutral",
  accentKey?: string,
): LinkPillTokens => {
  const normalizedVariant =
    variant === "web" ||
    variant === "marketing" ||
    variant === "mixed" ||
    variant === "neutral"
      ? variant
      : "neutral";
  const variantTokens = VARIANT_TOKENS[normalizedVariant];
  const normalizedAccent = accentKey?.trim().toLowerCase();
  const accentOverride = normalizedAccent ? ACCENT_TOKENS[normalizedAccent] : undefined;
  return mergeTokens(variantTokens, accentOverride);
};
