
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '../sections/defaultData';

// Récupérer l'URL de l'API MySQL à partir des variables d'environnement
export const API_BASE_URL = import.meta.env.VITE_MYSQL_API_URL || 'https://votre-domaine.com/api';

// Fonction pour journaliser le statut de l'API
export const logApiStatus = (): void => {
  if (!API_BASE_URL) {
    console.warn('URL de l\'API MySQL non définie, utilisation du localStorage par défaut');
  } else {
    console.log('API MySQL configurée avec URL:', API_BASE_URL);
  }
};

// Fonction auxiliaire pour obtenir les données du localStorage
export const getFromLocalStorage = (): HomepageConfig => {
  try {
    // Récupérer les sections
    const storedSections = localStorage.getItem('homepageSections');
    const sections = storedSections ? JSON.parse(storedSections) : DEFAULT_HOMEPAGE_CONFIG.sections;
    
    // Récupérer les données des sections
    const storedSectionData = localStorage.getItem('homepageSectionData');
    const sectionData = storedSectionData ? JSON.parse(storedSectionData) : {};
    
    // Récupérer la configuration du template
    const storedTemplateConfig = localStorage.getItem('homepageTemplateConfig');
    const templateConfig = storedTemplateConfig 
      ? JSON.parse(storedTemplateConfig) 
      : DEFAULT_HOMEPAGE_CONFIG.templateConfig;
    
    return { sections, sectionData, templateConfig };
  } catch (error) {
    console.error('Erreur lors de la récupération des données du localStorage:', error);
    return DEFAULT_HOMEPAGE_CONFIG;
  }
};

// Fonction auxiliaire pour sauvegarder des données dans le localStorage
export const saveToLocalStorage = (config: HomepageConfig): void => {
  try {
    localStorage.setItem('homepageSections', JSON.stringify(config.sections));
    localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
    
    if (config.templateConfig) {
      localStorage.setItem('homepageTemplateConfig', JSON.stringify(config.templateConfig));
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans le localStorage:', error);
  }
};
