export type BackgroundType = 'gradient' | 'image' | 'video';
export type AnimationType = 'none' | 'glow-pulse' | 'shine' | 'float' | 'border-glow' | 'hover-lift' | 'neon-pulse';

export interface BackgroundSettings {
  type: BackgroundType;
  gradient: {
    colorStart: string;
    colorEnd: string;
    direction: string; // e.g., 'to bottom right'
    opacity: number;
  };
  image: {
    url: string;
    zoom: number; // 100 to 150
    position: string; // 'center', 'top', etc.
    overlayDarkness: number; // 0 to 1
    blur: number; // 0 to 20px
  };
  video: {
    url: string;
    overlayDarkness: number;
    blur: number;
  };
}

export interface IndividualColors {
  buttonBg: string;
  buttonText: string;
  cardBg: string;
  cardBorder: string;
  neonAccent: string;
  textPrimary: string;
  textSecondary: string;
  priceBadgeBg: string;
  priceBadgeText: string;
  icons: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconName: string;
  price?: string;
  animation: AnimationType;
  customColors?: Partial<IndividualColors>;
  enabled: boolean;
  clicks: number;
}

export interface BioProfile {
  subdomain: string;
  name: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  background: BackgroundSettings;
  colors: IndividualColors;
  globalAnimation: AnimationType;
  links: LinkItem[];
}