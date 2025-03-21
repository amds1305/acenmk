
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
  | 'custom';

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
// Add more specialized section data types as needed

export interface HomepageConfig {
  sections: Section[];
  sectionData: Record<string, SectionData>;
}
