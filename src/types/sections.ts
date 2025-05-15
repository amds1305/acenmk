
// Si ce fichier n'existe pas encore, nous le créons

export type SectionType = 
  'hero' | 
  'services' | 
  'about' | 
  'team' | 
  'testimonials' | 
  'faq' | 
  'contact' | 
  'trusted-clients' |
  'custom' |
  'external-link';

export type HomeTemplateType = 
  'default' | 
  'teko' | 
  'nmk_fire' | 
  'nmk_robot' | 
  'nmk_kink';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  customComponent?: string;
  externalUrl?: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
  openInNewTab?: boolean;
}

export interface ExternalLinkSectionData {
  url: string;
  title: string;
  requiresAuth: boolean;
  allowedRoles?: string[];
  openInNewTab?: boolean;
}

export interface TemplateConfig {
  activeTemplate: HomeTemplateType;
}

export interface HomepageConfig {
  sections: Section[];
  templateConfig?: TemplateConfig;
}
