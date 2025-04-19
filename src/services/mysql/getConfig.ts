
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
        console.log(`URL de l'API: ${apiUrl}`);
        
        // Timestamp pour éviter la mise en cache du navigateur
        const timestamp = new Date().getTime();
        
        // Options de fetch communes
        const fetchOptions = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store' as RequestCache
        };
        
        // Récupérer les sections
        console.log('Récupération des sections...');
        const sectionsResponse = await fetch(
          `${apiUrl}/sections.php?_=${timestamp}`, 
          fetchOptions
        );
        
        if (!sectionsResponse.ok) {
          console.error(`Erreur HTTP lors de la récupération des sections: ${sectionsResponse.status}`);
          try {
            console.error('Réponse:', await sectionsResponse.text());
          } catch (textError) {
            console.error('Impossible de lire la réponse');
          }
          throw new Error(`Erreur lors de la récupération des sections: ${sectionsResponse.status}`);
        }
        
        let sections = [];
        try {
          sections = await sectionsResponse.json();
          console.log(`Sections récupérées: ${sections.length}`);
        } catch (jsonError) {
          console.error('Erreur parsing JSON des sections:', jsonError);
          throw new Error('Erreur lors du parsing JSON des sections');
        }
        
        // Récupérer les données des sections
        console.log('Récupération des données des sections...');
        const sectionDataResponse = await fetch(
          `${apiUrl}/section-data.php?_=${timestamp}`, 
          fetchOptions
        );
        
        if (!sectionDataResponse.ok) {
          console.error(`Erreur HTTP lors de la récupération des données des sections: ${sectionDataResponse.status}`);
          try {
            console.error('Réponse:', await sectionDataResponse.text());
          } catch (textError) {
            console.error('Impossible de lire la réponse');
          }
          throw new Error(`Erreur lors de la récupération des données des sections: ${sectionDataResponse.status}`);
        }
        
        let sectionDataArray = [];
        try {
          sectionDataArray = await sectionDataResponse.json();
          console.log(`Données de sections récupérées: ${sectionDataArray.length}`);
        } catch (jsonError) {
          console.error('Erreur parsing JSON des données de sections:', jsonError);
          throw new Error('Erreur lors du parsing JSON des données de sections');
        }
        
        // Transformer le tableau de données en objet
        const sectionData = {};
        sectionDataArray.forEach(item => {
          if (item && item.section_id) {
            sectionData[item.section_id] = item.data;
          }
        });
        
        // Récupérer la configuration du template
        console.log('Récupération de la configuration du template...');
        const templateConfigResponse = await fetch(
          `${apiUrl}/template-config.php?_=${timestamp}`, 
          fetchOptions
        );
        
        let templateConfig = { activeTemplate: 'default' };
        if (templateConfigResponse.ok) {
          try {
            templateConfig = await templateConfigResponse.json();
            console.log('Configuration du template récupérée:', templateConfig);
          } catch (jsonError) {
            console.warn('Erreur parsing JSON de la config du template:', jsonError);
          }
        } else {
          console.warn(`La récupération de la configuration du template a échoué: ${templateConfigResponse.status}`);
        }
        
        console.log('Configuration chargée depuis MySQL avec succès');
        
        // Vider le cache local storage pour éviter les conflits
        localStorage.removeItem('homepageConfig');
        
        return {
          sections,
          sectionData,
          templateConfig
        };
        
      } catch (error) {
        console.error('Erreur lors du chargement depuis MySQL, repli sur localStorage:', error);
      }
    } else {
      console.log('URL de l\'API MySQL non configurée, utilisation du localStorage');
    }
    
    // Si l'API n'est pas configurée ou si la récupération a échoué, charger depuis localStorage
    console.log('Chargement de la configuration depuis localStorage');
    return loadFromStorage();
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return loadFromStorage();
  }
};
