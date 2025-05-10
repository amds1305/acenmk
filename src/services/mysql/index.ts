
import axios from 'axios';
import { HomepageConfig } from '@/types/sections';

const API_BASE_URL = '/api/mysql';

// Fonction pour récupérer la configuration de la page d'accueil
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // Génère un paramètre de cache-buster pour éviter la mise en cache par le navigateur
    const cacheBuster = Date.now();
    
    // Récupérer les sections
    const sectionsResponse = await axios.get(`${API_BASE_URL}/sections.php?t=${cacheBuster}`);
    const sections = sectionsResponse.data || [];
    
    // Récupérer les données des sections
    const sectionDataResponse = await axios.get(`${API_BASE_URL}/section-data.php?t=${cacheBuster}`);
    const sectionDataArray = sectionDataResponse.data || [];
    
    // Transformer les données de section en objet
    const sectionData = {};
    sectionDataArray.forEach(item => {
      sectionData[item.section_id] = item.data;
    });
    
    // Récupérer la configuration du template
    const templateConfigResponse = await axios.get(`${API_BASE_URL}/template-config.php?t=${cacheBuster}`);
    const templateConfig = templateConfigResponse.data || { activeTemplate: 'default' };
    
    console.log("Configuration récupérée:", { sections, sectionData, templateConfig });
    
    return {
      sections,
      sectionData,
      templateConfig
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    throw error;
  }
};

// Fonction pour sauvegarder la configuration de la page d'accueil
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    console.log("Sauvegarde de la configuration:", config);
    
    // Sauvegarder les sections
    await axios.put(`${API_BASE_URL}/sections.php`, config.sections);
    
    // Préparer les données des sections pour l'API
    const sectionDataArray = Object.entries(config.sectionData).map(([section_id, data]) => ({
      section_id,
      data
    }));
    
    // Sauvegarder les données des sections
    await axios.put(`${API_BASE_URL}/section-data.php`, sectionDataArray);
    
    // Sauvegarder la configuration du template
    if (config.templateConfig) {
      await axios.put(`${API_BASE_URL}/template-config.php`, config.templateConfig);
    }
    
    // Nettoyer les caches du navigateur
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    console.log("Configuration sauvegardée avec succès!");
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    return false;
  }
};

// Réexporter tous les autres services
export * from './getTeamMembers';
export * from './testimonials';
export * from './faqs';
export * from './trustedClients';
