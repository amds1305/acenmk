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
  | 'trusted-clients'; // Ajout du nouveau type pour la section "Ils nous font confiance"

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  customComponent?: string; // Pour les sections personnalisées
}

export interface SectionData {
  [key: string]: any; // Données spécifiques à chaque type de section
}

// Specialized section data types
export interface HeroSectionData extends HeroData {}
export interface ServicesSectionData {
  // Define properties specific to services section
}
export interface AboutSectionData {
  // Define properties specific to about section
}

// Nouvelle interface pour les données de la section clients de confiance
export interface TrustedClientsSectionData {
  title: string;
  clients: ClientLogo[];
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface HomepageConfig {
  sections: Section[];
  sectionData: Record<string, SectionData>;
}
