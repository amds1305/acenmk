
// Re-export all the section service functionality
import { loadFromStorage, saveToStorage } from './storageService';
import { addSection, removeSection, reorderSections, updateSectionData, updateSection } from './sectionOperations';
import { DEFAULT_SECTIONS, DEFAULT_SECTION_DATA } from './defaultData';
import { HomepageConfig, Section, SectionData, SectionType } from './types';

// Main function to get homepage configuration
export const getHomepageConfig = (): HomepageConfig => {
  return loadFromStorage();
};

// Main function to save homepage configuration
export const saveHomepageConfig = (config: HomepageConfig): void => {
  saveToStorage(config);
};

// Re-export all other functions
export {
  addSection,
  removeSection,
  reorderSections,
  updateSectionData,
  updateSection,
  DEFAULT_SECTIONS,
  DEFAULT_SECTION_DATA
};

// Re-export types
export type { HomepageConfig, Section, SectionData, SectionType };
