import { HomepageConfig, Section, SectionData, SectionType } from '@/types/sections';

// Re-export types to make imports cleaner
export type { 
  HomepageConfig, 
  Section, 
  SectionData, 
  SectionType 
};

// Type pour les templates de page d'accueil
export type HomeTemplateType = 'default' | 'teko';

// Interface pour la configuration du template
export interface TemplateConfig {
  activeTemplate: HomeTemplateType;
}

// Interface pour la configuration complète de la page d'accueil
export interface HomepageConfig {
  sections: Section[];
  sectionData: Record<string, any>;
  templateConfig: TemplateConfig;
}
