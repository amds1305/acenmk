
// Export des types
export * from './types';

// Export des opérations de sections
export * from './sectionOperations';

// Export du service de stockage
export * from './storageService';

// Export des données par défaut
export * from './defaultData';

// Re-export explicite du DEFAULT_TEMPLATE_CONFIG depuis defaultData
export { DEFAULT_TEMPLATE_CONFIG } from './defaultData';

// Helper functions
export const getHomepageConfig = () => {
  const { loadFromStorage } = require('./storageService');
  return loadFromStorage();
};

export const saveHomepageConfig = (config) => {
  const { saveToStorage } = require('./storageService');
  saveToStorage(config);
};
