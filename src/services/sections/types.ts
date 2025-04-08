
// Import types from the global types
import { 
  Section as GlobalSection, 
  SectionData as GlobalSectionData, 
  SectionType as GlobalSectionType,
  HomepageConfig as GlobalHomepageConfig
} from '@/types/sections';

// Re-export types to make imports cleaner
export type { 
  GlobalSection as Section, 
  GlobalSectionData as SectionData, 
  GlobalSectionType as SectionType
};

// Type pour les templates de page d'accueil
export type HomeTemplateType = 'default' | 'teko';

// Interface pour la configuration du template
export interface TemplateConfig {
  activeTemplate: HomeTemplateType;
}

// Re-export the HomepageConfig from global types
export type HomepageConfig = GlobalHomepageConfig;
