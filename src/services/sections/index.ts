
// Re-exporter les fonctions du nouveau service MySQL
// Cela permet aux composants existants de continuer à fonctionner sans modifications
import { 
  getHomepageConfig, 
  saveHomepageConfig,
  addSection,
  removeSection
} from '@/services/mysql';

// Export des types
export * from './types';

// Export des opérations de sections
export * from './sectionOperations';

// Export du service de stockage (compatibilité)
export * from './storageService';

// Export des données par défaut
export * from './defaultData';

// Re-export explicite du DEFAULT_TEMPLATE_CONFIG depuis defaultData
export { DEFAULT_TEMPLATE_CONFIG, DEFAULT_HOMEPAGE_CONFIG } from './defaultData';

// Re-exporter les fonctions du service MySQL
export { getHomepageConfig, saveHomepageConfig, addSection, removeSection };
