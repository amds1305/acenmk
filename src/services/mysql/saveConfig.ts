
import { HomepageConfig } from '@/types/sections';
import { API_BASE_URL, saveToLocalStorage, logApiStatus } from './config';

// Function to save homepage configuration to MySQL
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    // Check if API URL is defined
    if (!API_BASE_URL) {
      logApiStatus();
      // Fallback to localStorage if API is not configured
      saveToLocalStorage(config);
      return true;
    }

    console.log('Tentative de sauvegarde des sections vers:', `${API_BASE_URL}/sections.php`);
    
    // Save sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config.sections)
    });
    if (!sectionsResponse.ok) {
      console.error('Erreur HTTP sections:', sectionsResponse.status, sectionsResponse.statusText);
      throw new Error('Erreur lors de la sauvegarde des sections');
    }

    // Prepare section data for the API
    const sectionDataArray = Object.entries(config.sectionData).map(([sectionId, data]) => ({
      section_id: sectionId,
      data
    }));

    console.log('Tentative de sauvegarde des données des sections vers:', `${API_BASE_URL}/section-data.php`);
    
    // Save section data
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sectionDataArray)
    });
    if (!sectionDataResponse.ok) {
      console.error('Erreur HTTP section-data:', sectionDataResponse.status, sectionDataResponse.statusText);
      throw new Error('Erreur lors de la sauvegarde des données des sections');
    }

    // Save template configuration
    if (config.templateConfig) {
      console.log('Tentative de sauvegarde de la configuration du template vers:', `${API_BASE_URL}/template-config.php`);
      const templateConfigResponse = await fetch(`${API_BASE_URL}/template-config.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.templateConfig)
      });
      if (!templateConfigResponse.ok) {
        console.error('Erreur HTTP template-config:', templateConfigResponse.status, templateConfigResponse.statusText);
        throw new Error('Erreur lors de la sauvegarde de la configuration du template');
      }
    }

    console.log('Sauvegarde des données réussie dans MySQL');
    // Also save to localStorage for redundancy
    saveToLocalStorage(config);
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    // Fallback to localStorage in case of error
    saveToLocalStorage(config);
    return false;
  }
};
