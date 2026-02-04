export type BannerVariant = "web" | "marketing" | "mixed";
export type BannerAccentKey = "auto" | "sky" | "orange" | "slate" | "rose";
export type BannerResolvedAccentKey = Exclude<BannerAccentKey, "auto">;
export type BannerTone = "default" | "vivid";
export type BannerIntensity = "low" | "md" | "high";
export type BannerLayout = "split" | "stack";
export type BannerSize = "default" | "compact";

export interface BannerLink {
  label: string;
  href: string;
}

export interface BannerMedia {
  bgImage?: string;
  icon?: string;
  grid?: boolean;
}

export interface BannerProps {
  sectionId?: string;
  variant?: BannerVariant;
  accentKey?: BannerAccentKey;
  tone?: BannerTone;
  intensity?: BannerIntensity;
  layout?: BannerLayout;
  reverse?: boolean;
  size?: BannerSize;
  badgeText?: string;
  badgeIcon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  primaryLink?: BannerLink;
  secondaryLink?: BannerLink;
  ariaLabel?: string;
  media?: BannerMedia | null;
  bgImage?: string;
  imageAlt?: string;
  watermarkIcon?: string;
  rightIcon?: string;
  headerIcon?: string;
  class?: string;
}

export interface BannerAccentTokens {
  badge: string;
  badgeIcon: string;
  subtitle: string;
  bullet: string;
  primaryCta: string;
  secondaryCta: string;
  highlight: string;
  arrow: string;
  watermark: string;
  rightGlow: string;
  rightSheen: string;
  watermarkColor?: string;
}

export interface BannerVariantThemeTokens {
  defaultAccent: BannerResolvedAccentKey;
  lightOverlay: string;
  lightPanel: string;
  darkGlowStart: string;
  darkGlowEnd: string;
  darkPanel: string;
  visualWrap: string;
  visualTint: string;
  visualGlowA: string;
  visualGlowB: string;
  darkVisualGlowA: string;
  darkVisualGlowB: string;
  watermarkPlacement: string;
  badge?: string;
  subtitle?: string;
  bullet?: string;
  primaryCta?: string;
  secondaryCta?: string;
  highlight?: string;
  arrow?: string;
  badgeIcon?: string;
  watermark?: string;
  rightGlow?: string;
  rightSheen?: string;
  watermarkColor?: string;
}

export interface BannerIntensityTokens {
  lightOverlay: string;
  lightPanel: string;
  lightPattern: string;
  darkPattern: string;
  darkPanel: string;
  darkGlow: string;
  visualGlow: string;
  watermark: string;
}

export interface BannerSizeTokens {
  sectionPadding: string;
  sectionGap: string;
  title: string;
  subtitle: string;
  description: string;
  visualMinHeight: string;
  visualPadding: string;
  watermarkSize: string;
  ctaPadding: string;
  badge: string;
}

export interface BannerLayoutTokens {
  grid: string;
  textOrder: string;
  visualOrder: string;
  accentPanelPosition: string;
  accentPanelClipPath: string;
  showAccentPanel: boolean;
}

export interface ResolvedBannerThemeTokens {
  accentKey: BannerResolvedAccentKey;
  variant: BannerVariantThemeTokens;
  intensity: BannerIntensityTokens;
  badge: string;
  subtitle: string;
  bullet: string;
  primaryCta: string;
  secondaryCta: string;
  highlight: string;
  arrow: string;
  badgeIcon: string;
  watermark: string;
  rightGlow: string;
  rightSheen: string;
  watermarkColor: string;
}

export interface BannerIconTokens {
  watermark?: string;
  badge?: string;
  arrow: string;
}
