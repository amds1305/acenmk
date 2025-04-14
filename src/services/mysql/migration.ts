
import { saveHomepageConfig } from './saveConfig';
import { getFromLocalStorage } from './config';

// Function to migrate data from localStorage to Supabase
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    // Retrieve data from localStorage
    const localConfig = getFromLocalStorage();
    
    // If no data is found in localStorage, return false
    if (localConfig.sections.length === 0 && Object.keys(localConfig.sectionData).length === 0) {
      return false;
    }
    
    // Save data to MySQL via the API
    const success = await saveHomepageConfig(localConfig);
    
    return success;
  } catch (error) {
    console.error('Erreur lors de la migration des données:', error);
    return false;
  }
};
