
// Types pour la gestion des sections de la page d'accueil
import { HeroData } from '@/components/Hero';

export type SectionType = 
  | 'hero' 
  | 'services' 
  | 'about' 
  | 'team' 
  | 'testimonials' 
  | 'faq' 
  | 'contact'
  | 'custom'
  | 'trusted-clients'
  | 'external-link'; // Nouveau type pour les liens externes

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  customComponent?: string; // Pour les sections personnalisées
  externalUrl?: string; // Nouvelle propriété pour les liens externes
  requiresAuth?: boolean; // Indique si l'accès nécessite une authentification
  allowedRoles?: string[]; // Rôles autorisés à accéder à cette section
}

export interface SectionData {
  [key: string]: any; // Données spécifiques à chaque type de section
}

// Templates disponibles pour la page d'accueil
export type HomeTemplateType = 'default' | 'teko' | 'nmk_fire' | 'nmk_robot' | 'nmk_kink';

// Specialized section data types
export interface HeroSectionData extends HeroData {}
export interface ServicesSectionData {
  // Define properties specific to services section
}
export interface AboutSectionData {
  // Define properties specific to about section
}

// Configuration du template de la page d'accueil
export interface HomeTemplateConfig {
  activeTemplate: HomeTemplateType;
}

// Nouvelle interface pour les données de la section clients de confiance
export interface TrustedClientsSectionData {
  title: string;
  featuredLabel?: string;
  clients: ClientLogo[];
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  category?: string; // New field for client category
}

// Nouvelle interface pour les données de section de lien externe
export interface ExternalLinkSectionData {
  url: string;
  title: string;
  description?: string;
  icon?: string;
  openInNewTab?: boolean;
  requiresAuth: boolean;
  allowedRoles: string[];
}

export interface HomepageConfig {
  sections: Section[];
  sectionData: Record<string, SectionData>;
  templateConfig?: HomeTemplateConfig;
}
