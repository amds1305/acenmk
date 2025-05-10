
import { HomepageConfig } from '@/types/sections';
import { saveHomepageConfig as saveConfig } from './sectionsService';

/**
 * Sauvegarde les modifications administratives
 */
export const saveAdminChanges = async (config: HomepageConfig): Promise<boolean> => {
  try {
    // Utiliser le service de sections pour sauvegarder la configuration
    return await saveConfig(config);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des modifications administratives:", error);
    throw error;
  }
};
