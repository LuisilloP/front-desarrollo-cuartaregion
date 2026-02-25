export type LinkPillVariant = "web" | "marketing" | "mixed" | "neutral";

export interface LinkPillTokens {
  border: string;
  background: string;
  iconWrap: string;
  iconColor: string;
  chevron: string;
  hover: string;
  active: string;
  focus: string;
}

const BASELINE: LinkPillTokens = {
  border: "border-slate-400/70 dark:border-slate-500/60",
  background:
    "bg-[linear-gradient(112deg,rgba(248,250,252,0.92)_0%,rgba(241,245,249,0.86)_100%)] dark:bg-[linear-gradient(112deg,rgba(15,23,42,0.88)_0%,rgba(30,41,59,0.78)_100%)]",
  iconWrap:
    "border-slate-400/75 bg-slate-100/90 dark:border-slate-500/65 dark:bg-slate-800/70",
  iconColor: "text-slate-800 dark:text-slate-100",
  chevron: "text-slate-800 dark:text-slate-200",
  hover:
    "hover:border-slate-500/78 dark:hover:border-slate-400/70 hover:shadow-[0_20px_36px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_20px_38px_rgba(2,6,23,0.64)]",
  active:
    "border-slate-500/78 dark:border-slate-400/70 shadow-[0_20px_36px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_38px_rgba(2,6,23,0.64)]",
  focus:
    "focus-visible:ring-slate-500/65 dark:focus-visible:ring-slate-300/70",
};

const VARIANT_TOKENS: Record<LinkPillVariant, LinkPillTokens> = {
  neutral: BASELINE,
  web: {
    border: "border-sky-400/70 dark:border-sky-400/55",
    background:
      "bg-[linear-gradient(110deg,rgba(224,242,254,0.9)_0%,rgba(248,250,252,0.86)_52%,rgba(186,230,253,0.5)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(30,41,59,0.82)_50%,rgba(14,165,233,0.22)_100%)]",
    iconWrap:
      "border-sky-400/75 bg-sky-100/92 dark:border-sky-500/55 dark:bg-sky-500/26",
    iconColor: "text-sky-700 dark:text-sky-200",
    chevron: "text-sky-700 dark:text-sky-200",
    hover:
      "hover:border-sky-500/80 dark:hover:border-sky-300/75 hover:shadow-[0_20px_36px_rgba(14,165,233,0.22)] dark:hover:shadow-[0_20px_36px_rgba(14,165,233,0.3)]",
    active:
      "border-sky-500/80 dark:border-sky-300/75 shadow-[0_20px_36px_rgba(14,165,233,0.22)] dark:shadow-[0_20px_36px_rgba(14,165,233,0.3)]",
    focus:
      "focus-visible:ring-sky-500/68 dark:focus-visible:ring-sky-300/75",
  },
  marketing: {
    border: "border-orange-400/70 dark:border-orange-400/55",
    background:
      "bg-[linear-gradient(110deg,rgba(255,237,213,0.9)_0%,rgba(248,250,252,0.86)_52%,rgba(251,191,36,0.38)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(30,41,59,0.82)_50%,rgba(249,115,22,0.22)_100%)]",
    iconWrap:
      "border-orange-400/75 bg-orange-100/92 dark:border-orange-500/55 dark:bg-orange-500/26",
    iconColor: "text-orange-700 dark:text-orange-200",
    chevron: "text-orange-700 dark:text-orange-200",
    hover:
      "hover:border-orange-500/80 dark:hover:border-orange-300/75 hover:shadow-[0_20px_36px_rgba(249,115,22,0.22)] dark:hover:shadow-[0_20px_36px_rgba(249,115,22,0.3)]",
    active:
      "border-orange-500/80 dark:border-orange-300/75 shadow-[0_20px_36px_rgba(249,115,22,0.22)] dark:shadow-[0_20px_36px_rgba(249,115,22,0.3)]",
    focus:
      "focus-visible:ring-orange-500/68 dark:focus-visible:ring-orange-300/75",
  },
  mixed: {
    border: "border-violet-400/65 dark:border-violet-400/52",
    background:
      "bg-[linear-gradient(110deg,rgba(224,242,254,0.86)_0%,rgba(248,250,252,0.84)_50%,rgba(233,213,255,0.44)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(30,41,59,0.82)_50%,rgba(139,92,246,0.2)_100%)]",
    iconWrap:
      "border-violet-400/70 bg-[linear-gradient(120deg,rgba(224,242,254,0.9)_0%,rgba(233,213,255,0.82)_100%)] dark:border-violet-500/50 dark:bg-[linear-gradient(120deg,rgba(14,165,233,0.24)_0%,rgba(139,92,246,0.22)_100%)]",
    iconColor: "text-violet-700 dark:text-violet-200",
    chevron: "text-violet-700 dark:text-violet-200",
    hover:
      "hover:border-violet-500/78 dark:hover:border-violet-300/72 hover:shadow-[0_20px_36px_rgba(139,92,246,0.22)] dark:hover:shadow-[0_20px_36px_rgba(139,92,246,0.3)]",
    active:
      "border-violet-500/78 dark:border-violet-300/72 shadow-[0_20px_36px_rgba(139,92,246,0.22)] dark:shadow-[0_20px_36px_rgba(139,92,246,0.3)]",
    focus:
      "focus-visible:ring-violet-500/68 dark:focus-visible:ring-violet-300/72",
  },
};

const ACCENT_TOKENS: Record<string, Partial<LinkPillTokens>> = {
  whatsapp: {
    border: "border-emerald-400/70 dark:border-emerald-400/55",
    background:
      "bg-[linear-gradient(110deg,rgba(220,252,231,0.9)_0%,rgba(248,250,252,0.86)_52%,rgba(110,231,183,0.4)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.9)_0%,rgba(30,41,59,0.82)_50%,rgba(16,185,129,0.22)_100%)]",
    iconWrap:
      "border-emerald-400/75 bg-emerald-100/92 dark:border-emerald-500/55 dark:bg-emerald-500/26",
    iconColor: "text-emerald-700 dark:text-emerald-200",
    chevron: "text-emerald-700 dark:text-emerald-200",
    hover:
      "hover:border-emerald-500/80 dark:hover:border-emerald-300/75 hover:shadow-[0_20px_36px_rgba(16,185,129,0.22)] dark:hover:shadow-[0_20px_36px_rgba(16,185,129,0.3)]",
    active:
      "border-emerald-500/80 dark:border-emerald-300/75 shadow-[0_20px_36px_rgba(16,185,129,0.22)] dark:shadow-[0_20px_36px_rgba(16,185,129,0.3)]",
    focus:
      "focus-visible:ring-emerald-500/68 dark:focus-visible:ring-emerald-300/75",
  },
  github: {
    border: "border-slate-600/80 dark:border-slate-300/60",
    background:
      "bg-[linear-gradient(110deg,rgba(241,245,249,0.92)_0%,rgba(226,232,240,0.86)_52%,rgba(203,213,225,0.58)_100%)] dark:bg-[linear-gradient(110deg,rgba(15,23,42,0.94)_0%,rgba(30,41,59,0.86)_52%,rgba(2,6,23,0.74)_100%)]",
    iconWrap:
      "border-slate-600/80 bg-slate-200/95 dark:border-slate-400/70 dark:bg-slate-700/30",
    iconColor: "text-slate-900 dark:text-slate-100",
    chevron: "text-slate-800 dark:text-slate-200",
    hover:
      "hover:border-slate-700/80 dark:hover:border-slate-200/75 hover:shadow-[0_20px_36px_rgba(30,41,59,0.24)] dark:hover:shadow-[0_20px_36px_rgba(2,6,23,0.66)]",
    active:
      "border-slate-700/80 dark:border-slate-200/75 shadow-[0_20px_36px_rgba(30,41,59,0.24)] dark:shadow-[0_20px_36px_rgba(2,6,23,0.66)]",
    focus:
      "focus-visible:ring-slate-700/70 dark:focus-visible:ring-slate-200/75",
  },
  instagram: {
    border: "border-fuchsia-600/60 dark:border-fuchsia-300/50",
    background:
      "bg-[linear-gradient(110deg,rgba(252,244,255,0.95)_0%,rgba(243,232,255,0.86)_42%,rgba(217,70,239,0.22)_100%)] dark:bg-[linear-gradient(110deg,rgba(39,23,64,0.84)_0%,rgba(30,27,75,0.72)_52%,rgba(232,121,249,0.16)_100%)]",
    iconWrap:
      "border-fuchsia-600/90 bg-fuchsia-100/95 dark:border-fuchsia-300/70 dark:bg-fuchsia-500/10",
    iconColor: "text-fuchsia-700 dark:text-fuchsia-200",
    chevron: "text-fuchsia-700 dark:text-fuchsia-200",
    hover:
      "hover:border-fuchsia-700/90 dark:hover:border-fuchsia-200/75 hover:shadow-[0_20px_36px_rgba(192,38,211,0.32)] dark:hover:shadow-[0_20px_36px_rgba(232,121,249,0.38)]",
    active:
      "border-fuchsia-700/90 dark:border-fuchsia-200/75 shadow-[0_20px_36px_rgba(192,38,211,0.32)] dark:shadow-[0_20px_36px_rgba(232,121,249,0.38)]",
    focus:
      "focus-visible:ring-fuchsia-700/75 dark:focus-visible:ring-fuchsia-200/75",
  },
  facebook: {
    border: "border-blue-600/60 dark:border-blue-300/50",
    background:
      "bg-[linear-gradient(110deg,rgba(239,246,255,0.94)_0%,rgba(255,255,255,0.9)_52%,rgba(147,197,253,0.32)_100%)] dark:bg-[linear-gradient(110deg,rgba(12,27,68,0.9)_0%,rgba(15,23,42,0.82)_52%,rgba(59,130,246,0.32)_100%)]",
    iconWrap:
      "border-blue-600/90 bg-blue-100/95 dark:border-blue-300/70 dark:bg-blue-500/10",
    iconColor: "text-blue-700 dark:text-blue-200",
    chevron: "text-blue-700 dark:text-blue-200",
    hover:
      "hover:border-blue-700/90 dark:hover:border-blue-200/75 hover:shadow-[0_20px_36px_rgba(37,99,235,0.32)] dark:hover:shadow-[0_20px_36px_rgba(96,165,250,0.38)]",
    active:
      "border-blue-700/90 dark:border-blue-200/75 shadow-[0_20px_36px_rgba(37,99,235,0.32)] dark:shadow-[0_20px_36px_rgba(96,165,250,0.38)]",
    focus:
      "focus-visible:ring-blue-700/75 dark:focus-visible:ring-blue-200/75",
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
  active: override?.active ?? base.active,
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
