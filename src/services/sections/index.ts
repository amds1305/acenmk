
// Re-export all the section service functionality
import { loadFromStorage, saveToStorage } from './storageService';
import { addSection, removeSection, reorderSections, updateSectionData, updateSection } from './sectionOperations';
import { DEFAULT_SECTIONS, DEFAULT_SECTION_DATA, DEFAULT_TEMPLATE_CONFIG } from './defaultData';
import { HomepageConfig, Section, SectionData, SectionType, HomeTemplateType } from '@/types/sections';

// Main function to get homepage configuration
export const getHomepageConfig = (): HomepageConfig => {
  return loadFromStorage();
};

// Main function to save homepage configuration
export const saveHomepageConfig = (config: HomepageConfig): void => {
  saveToStorage(config);
};

// Re-export all other functions and constants
export {
  addSection,
  removeSection,
  reorderSections,
  updateSectionData,
  updateSection,
  DEFAULT_SECTIONS,
  DEFAULT_SECTION_DATA,
  DEFAULT_TEMPLATE_CONFIG
};

// Re-export types
export type { HomepageConfig, Section, SectionData, SectionType, HomeTemplateType };
