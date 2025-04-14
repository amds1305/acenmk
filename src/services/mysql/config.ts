
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '../sections/defaultData';

// Get the MySQL API URL from environment variables
export const API_BASE_URL = import.meta.env.VITE_MYSQL_API_URL || 'https://votre-domaine.com/api';

// Helper function to log API status
export const logApiStatus = (): void => {
  if (!API_BASE_URL) {
    console.warn('URL de l\'API MySQL non définie, utilisation du localStorage par défaut');
  } else {
    console.log('API MySQL configurée avec URL:', API_BASE_URL);
  }
};

// Auxiliary function to get data from localStorage
export const getFromLocalStorage = (): HomepageConfig => {
  try {
    // Retrieve sections
    const storedSections = localStorage.getItem('homepageSections');
    const sections = storedSections ? JSON.parse(storedSections) : DEFAULT_HOMEPAGE_CONFIG.sections;
    
    // Retrieve section data
    const storedSectionData = localStorage.getItem('homepageSectionData');
    const sectionData = storedSectionData ? JSON.parse(storedSectionData) : {};
    
    // Retrieve template configuration
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

// Auxiliary function to save data to localStorage
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
