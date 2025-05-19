import { HeroData } from '@/components/Hero';

export interface HeroVersion extends HeroData {
  id: string;
  name: string;
  textColor: string;
  titleFontSize: string;
  subtitleFontSize: string;
  backgroundColor: string;
  backgroundType: 'color' | 'image' | 'gradient';
  backgroundGradient?: string;
  marginTop: string;
  marginBottom: string;
  padding: string;
  blocks: HeroBlock[];
  buttonStyle?: {
    primary: ButtonStyle;
    secondary: ButtonStyle;
  };
}

export interface HeroBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'stat';
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: string;
    height: string;
  };
  style: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
  };
}

export interface HeroCarouselSettings {
  enabled: boolean;
  transitionTime: number; // seconds
  transitionType: 'fade' | 'slide' | 'zoom';
  autoplay: boolean;
  autoplaySpeed: number; // seconds
}

export interface HeroSettings {
  versions: HeroVersion[];
  activeVersion: string;
  carousel: HeroCarouselSettings;
}

// Type pour le style des boutons
export interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  borderColor: string;
  borderWidth: string;
  hoverBackgroundColor?: string;
}
