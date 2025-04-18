
import { HomepageConfig } from '@/types/sections';
import { saveHomepageConfig } from './saveConfig';
import { loadFromStorage } from '../sections/storageService';

/**
 * Migre les données du localStorage vers MySQL via l'API
 * @returns {Promise<boolean>} true en cas de succès, false en cas d'échec
 */
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    console.log('Début de la migration vers MySQL...');
    
    // Récupérer les données du localStorage
    const localConfig: HomepageConfig = loadFromStorage();
    
    // Si aucune donnée n'est disponible, ne rien faire
    if (localConfig.sections.length === 0 && Object.keys(localConfig.sectionData).length === 0) {
      console.log('Aucune donnée trouvée dans localStorage');
      return false;
    }
    
    console.log(`Données à migrer: ${localConfig.sections.length} sections et ${Object.keys(localConfig.sectionData).length} sections de données`);
    
    // Sauvegarder la configuration dans MySQL via l'API
    const success = await saveHomepageConfig(localConfig);
    
    if (success) {
      console.log('Migration vers MySQL réussie');
    } else {
      console.error('Erreur de migration: la sauvegarde a échoué');
    }
    
    return success;
  } catch (error) {
    console.error('Erreur lors de la migration des données vers MySQL:', error);
    return false;
  }
};
