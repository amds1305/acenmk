
// Import types from the global types
import { 
  Section as GlobalSection, 
  SectionData as GlobalSectionData, 
  SectionType as GlobalSectionType,
  HomepageConfig as GlobalHomepageConfig,
  HomeTemplateType as GlobalHomeTemplateType
} from '@/types/sections';

// Re-export types to make imports cleaner
export type { 
  GlobalSection as Section, 
  GlobalSectionData as SectionData, 
  GlobalSectionType as SectionType,
  GlobalHomeTemplateType as HomeTemplateType
};

// Re-export the HomepageConfig from global types
export type HomepageConfig = GlobalHomepageConfig;
