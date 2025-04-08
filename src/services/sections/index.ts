
// Export des types
export * from './types';

// Export des opérations de sections
export * from './sectionOperations';

// Export du service de stockage
export * from './storageService';

// Export des données par défaut
export * from './defaultData';

// Re-export explicite du DEFAULT_TEMPLATE_CONFIG depuis defaultData
export { DEFAULT_TEMPLATE_CONFIG, DEFAULT_HOMEPAGE_CONFIG } from './defaultData';

// Helper functions
import { loadFromStorage, saveToStorage } from './storageService';

export const getHomepageConfig = () => {
  return loadFromStorage();
};

export const saveHomepageConfig = (config) => {
  saveToStorage(config);
};
