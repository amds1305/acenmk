
// src/services/sections/index.ts
import { HomepageConfig, Section, SectionData } from './types';

// Initialize with default empty config
const defaultConfig: HomepageConfig = {
  sections: [],
  sectionData: {},
};

let cachedConfig: HomepageConfig = { ...defaultConfig };

// Synchronously get the homepage config from cache
export const getHomepageConfig = (): HomepageConfig => {
  return cachedConfig;
};

// Asynchronously load the homepage config
export const loadHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // Here you'd fetch from your API or local storage
    // For now we'll just use the cached config
    return cachedConfig;
  } catch (error) {
    console.error('Error loading homepage config:', error);
    return defaultConfig;
  }
};

// Update the cached config
export const updateHomepageConfig = (config: HomepageConfig): void => {
  cachedConfig = { ...config };
};

// Save the homepage config
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    // Here you'd save to your API or local storage
    cachedConfig = { ...config };
    return true;
  } catch (error) {
    console.error('Error saving homepage config:', error);
    return false;
  }
};
