
import { HomepageConfig } from '@/types/sections';
import { API_BASE_URL, getFromLocalStorage, logApiStatus } from './config';

// Function to retrieve homepage configuration from MySQL
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // Check if API URL is defined
    if (!API_BASE_URL) {
      logApiStatus();
      // Fallback to localStorage if API is not configured
      return getFromLocalStorage();
    }

    console.log('Tentative de récupération des données depuis:', `${API_BASE_URL}/sections.php`);
    
    // Retrieve sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections.php`);
    if (!sectionsResponse.ok) {
      console.error('Erreur HTTP:', sectionsResponse.status, sectionsResponse.statusText);
      throw new Error('Erreur lors de la récupération des sections');
    }
    const sections = await sectionsResponse.json();
    console.log('Sections récupérées:', sections);

    // Retrieve section data
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data.php`);
    if (!sectionDataResponse.ok) {
      console.error('Erreur HTTP:', sectionDataResponse.status, sectionDataResponse.statusText);
      throw new Error('Erreur lors de la récupération des données des sections');
    }
    const sectionDataArray = await sectionDataResponse.json();
    console.log('Données des sections récupérées:', sectionDataArray);

    // Format section data in the expected format
    const sectionData: Record<string, any> = {};
    sectionDataArray.forEach((data: any) => {
      sectionData[data.section_id] = data.data;
    });

    // Retrieve template configuration
    const templateConfigResponse = await fetch(`${API_BASE_URL}/template-config.php`);
    const templateConfig = templateConfigResponse.ok 
      ? await templateConfigResponse.json() 
      : { activeTemplate: 'default' };
    console.log('Configuration du template récupérée:', templateConfig);

    return {
      sections,
      sectionData,
      templateConfig
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    // Fallback to localStorage in case of error
    return getFromLocalStorage();
  }
};
