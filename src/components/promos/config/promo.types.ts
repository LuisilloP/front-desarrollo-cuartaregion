export type Variant = "web" | "marketing" | "mixed";
export type Size = "tile" | "strip";
export type Tone = "default" | "vivid";
export type Intensity = "low" | "md" | "high";
export type Accent = "auto" | Variant;
export type PromoAccentName = "sky" | "orange" | "mix";

export interface PromoThemeBaseTokens {
  accentName: PromoAccentName;
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

export interface PromoSizeTokens {
  wrapper: string;
  title: string;
  descClamp: string;
  stack: string;
  watermark: string;
}

export interface PromoIconTokens {
  watermark: string;
  arrow: string;
}

export interface PromoIconOverrides {
  watermarkIcon?: string;
  arrowIcon?: string;
}

export interface PromoProps {
  badgeText: string;
  title: string;
  description: string;
  href: string;
  variant: Variant;
  size?: Size;
  hintText?: string;
  ariaLabel?: string;
  bgImage?: string;
  class?: string;
  watermarkIcon?: string;
  arrowIcon?: string;
  tone?: Tone;
  intensity?: Intensity;
  accent?: Accent;
}
