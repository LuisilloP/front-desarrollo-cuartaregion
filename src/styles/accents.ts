export type ServiceAccent = {
  banner: string;
  icon: string;
  modality: string;
  check: string;
  cta: string;
  shine: string;
};

export const serviceCardWebAccent: ServiceAccent = {
  banner:
    "bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20",
  icon: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/20",
  modality:
    "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  check: "text-sky-500 dark:text-sky-300",
  cta: "text-sky-600 group-hover:text-sky-500 dark:text-sky-300 dark:group-hover:text-sky-200",
  shine: "rgba(100, 116, 139, 0.1)"
};

export const serviceCardMarketingAccents: Record<"amber" | "orange", ServiceAccent> = {
  amber: {
    banner:
      "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
    icon: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
    modality:
      "bg-amber-50 text-amber-700 ring-amber-700/10 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
    check: "text-amber-500 dark:text-amber-300",
    cta: "text-amber-600 group-hover:text-amber-500 dark:text-amber-300 dark:group-hover:text-amber-200",
    shine: "rgba(245, 158, 11, 0.16)"
  },
  orange: {
    banner:
      "bg-orange-500/10 text-orange-600 ring-orange-500/20 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/20",
    icon: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-400/10 dark:text-orange-300 dark:border-orange-400/20",
    modality:
      "bg-orange-50 text-orange-700 ring-orange-700/10 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/30",
    check: "text-orange-500 dark:text-orange-300",
    cta: "text-orange-600 group-hover:text-orange-500 dark:text-orange-300 dark:group-hover:text-orange-200",
    shine: "rgba(249, 115, 22, 0.16)"
  }
};

export const serviceCardMixedAccent: ServiceAccent = {
  banner:
    "bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20",
  icon: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-400/10 dark:text-orange-300 dark:border-orange-400/20",
  modality:
    "bg-orange-50 text-orange-700 ring-orange-700/10 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/30",
  check: "text-amber-500 dark:text-amber-300 group-hover:text-sky-500 dark:group-hover:text-sky-300",
  cta: "text-amber-500 group-hover:text-sky-500 dark:text-amber-300 dark:group-hover:text-sky-300",
  shine: "rgba(56, 189, 248, 0.16)"
};
