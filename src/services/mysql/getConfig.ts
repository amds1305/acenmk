
import { HomepageConfig } from '@/types/sections';
import { loadFromStorage } from '@/services/sections/storageService';
import { getApiUrl } from './config';

/**
 * Récupère la configuration de la page d'accueil
 * Cette fonction essaie d'abord de récupérer depuis l'API MySQL,
 * puis se replie sur localStorage en cas d'échec
 */
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    const apiUrl = getApiUrl();
    
    // Si l'URL de l'API est configurée, essayer de récupérer les données depuis MySQL
    if (apiUrl) {
      try {
        console.log('Tentative de chargement de la configuration depuis MySQL...');
        
        // Récupérer les sections
        const sectionsResponse = await fetch(`${apiUrl}/sections.php`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!sectionsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des sections: ${sectionsResponse.status}`);
        }
        
        const sections = await sectionsResponse.json();
        
        // Récupérer les données des sections
        const sectionDataResponse = await fetch(`${apiUrl}/section-data.php`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!sectionDataResponse.ok) {
          throw new Error(`Erreur lors de la récupération des données des sections: ${sectionDataResponse.status}`);
        }
        
        const sectionDataArray = await sectionDataResponse.json();
        
        // Transformer le tableau de données en objet
        const sectionData = {};
        sectionDataArray.forEach(item => {
          sectionData[item.section_id] = item.data;
        });
        
        // Récupérer la configuration du template
        const templateConfigResponse = await fetch(`${apiUrl}/template-config.php`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        let templateConfig = { activeTemplate: 'default' };
        if (templateConfigResponse.ok) {
          templateConfig = await templateConfigResponse.json();
        }
        
        console.log('Configuration chargée depuis MySQL avec succès');
        
        return {
          sections,
          sectionData,
          templateConfig
        };
        
      } catch (error) {
        console.error('Erreur lors du chargement depuis MySQL, repli sur localStorage:', error);
      }
    }
    
    // Si l'API n'est pas configurée ou si la récupération a échoué, charger depuis localStorage
    console.log('Chargement de la configuration depuis localStorage');
    return loadFromStorage();
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return loadFromStorage();
  }
};
