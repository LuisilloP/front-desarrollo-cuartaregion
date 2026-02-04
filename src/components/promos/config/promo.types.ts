export type PromoVariant = "web" | "marketing" | "mixed";
export type Variant = PromoVariant;
export type Size = "tile" | "strip";
export type Tone = "default" | "vivid";
export type Intensity = "low" | "md" | "high";
export type PromoAccentKey = "auto" | "sky" | "orange" | "slate" | "rose";
export type PromoResolvedAccentKey = Exclude<PromoAccentKey, "auto">;
export type AccentKey = PromoAccentKey;
export type Accent = PromoAccentKey;

export interface PromoThemeBaseTokens {
  badge: string;
  strip: string;
  sheen: string;
  ring: string;
  footerLine: string;
  hint: string;
  arrow: string;
  glowMain: string;
  glowSoft: string;
  watermarkPlacement: string;
}

export interface PromoAccentTokens extends Partial<PromoThemeBaseTokens> {}

export interface PromoIntensityTokens {
  strip: string;
  glowMain: string;
  glowSoft: string;
  pattern: string;
  rail: string;
  watermark: string;
}

export interface PromoThemeTokens extends PromoThemeBaseTokens {
  pattern: string;
  rail: string;
  watermarkOpacity: string;
}

export interface PromoVariantTokens extends PromoThemeBaseTokens {
  defaultAccent: PromoResolvedAccentKey;
}

export interface PromoSizeTokens {
  wrapper: string;
  title: string;
  descClamp: string;
  stack: string;
  watermark: string;
}

export interface PromoIconTokens {
  watermark?: string;
  badge?: string;
  arrow?: string;
}

export interface PromoIconOverrides {
  watermarkIcon?: string;
  badgeIcon?: string;
  arrowIcon?: string;
}

export interface PromoProps {
  title: string;
  description?: string;
  badgeText?: string;
  badgeIcon?: string;
  watermarkIcon?: string;
  hintText?: string;
  href?: string;
  ariaLabel?: string;
  variant?: PromoVariant;
  accentKey?: PromoAccentKey;
  tone?: Tone;
  intensity?: Intensity;
  size?: Size;
  bgImage?: string;
  class?: string;
  arrowIcon?: string;
}
