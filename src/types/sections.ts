
// Types pour la gestion des sections de la page d'accueil

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

export interface HomepageConfig {
  sections: Section[];
  sectionData: Record<string, SectionData>;
}
