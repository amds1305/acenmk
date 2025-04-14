
import { HomepageConfig, Section, SectionData, SectionType } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_HOMEPAGE_CONFIG } from '../sections/defaultData';
import { supabase } from '@/lib/supabase';

// URL de base de l'API MySQL (configuré)
const API_BASE_URL = 'https://votre-domaine.com/api';

// Fonction pour récupérer la configuration de la page d'accueil depuis MySQL
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // Vérifier si l'URL de l'API est définie
    if (!API_BASE_URL) {
      console.warn('URL de l\'API MySQL non définie, utilisation du localStorage par défaut');
      // Fallback au localStorage si l'API n'est pas configurée
      return fallbackToLocalStorage();
    }

    console.log('Tentative de récupération des données depuis:', `${API_BASE_URL}/sections.php`);
    
    // Récupérer les sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections.php`);
    if (!sectionsResponse.ok) {
      console.error('Erreur HTTP:', sectionsResponse.status, sectionsResponse.statusText);
      throw new Error('Erreur lors de la récupération des sections');
    }
    const sections = await sectionsResponse.json();
    console.log('Sections récupérées:', sections);

    // Récupérer les données des sections
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data.php`);
    if (!sectionDataResponse.ok) {
      console.error('Erreur HTTP:', sectionDataResponse.status, sectionDataResponse.statusText);
      throw new Error('Erreur lors de la récupération des données des sections');
    }
    const sectionDataArray = await sectionDataResponse.json();
    console.log('Données des sections récupérées:', sectionDataArray);

    // Formater les données des sections dans le format attendu
    const sectionData: Record<string, SectionData> = {};
    sectionDataArray.forEach((data: any) => {
      sectionData[data.section_id] = data.data;
    });

    // Récupérer la configuration du template
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
    // Fallback au localStorage en cas d'erreur
    return fallbackToLocalStorage();
  }
};

// Fonction pour sauvegarder la configuration de la page d'accueil dans MySQL
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    // Vérifier si l'URL de l'API est définie
    if (!API_BASE_URL) {
      console.warn('URL de l\'API MySQL non définie, sauvegarde dans le localStorage par défaut');
      // Fallback au localStorage si l'API n'est pas configurée
      saveToLocalStorage(config);
      return true;
    }

    console.log('Tentative de sauvegarde des sections vers:', `${API_BASE_URL}/sections.php`);
    
    // Sauvegarder les sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config.sections)
    });
    if (!sectionsResponse.ok) {
      console.error('Erreur HTTP sections:', sectionsResponse.status, sectionsResponse.statusText);
      throw new Error('Erreur lors de la sauvegarde des sections');
    }

    // Préparer les données des sections pour l'API
    const sectionDataArray = Object.entries(config.sectionData).map(([sectionId, data]) => ({
      section_id: sectionId,
      data
    }));

    console.log('Tentative de sauvegarde des données des sections vers:', `${API_BASE_URL}/section-data.php`);
    
    // Sauvegarder les données des sections
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sectionDataArray)
    });
    if (!sectionDataResponse.ok) {
      console.error('Erreur HTTP section-data:', sectionDataResponse.status, sectionDataResponse.statusText);
      throw new Error('Erreur lors de la sauvegarde des données des sections');
    }

    // Sauvegarder la configuration du template
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
    // Sauvegarde également dans le localStorage pour la redondance
    saveToLocalStorage(config);
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    // Fallback au localStorage en cas d'erreur
    saveToLocalStorage(config);
    return false;
  }
};

// Fonction pour ajouter une section
export const addSection = async (
  config: HomepageConfig, 
  type: SectionType, 
  title: string
): Promise<HomepageConfig> => {
  const id = type === 'custom' ? uuidv4() : `${type}-${uuidv4().slice(0, 8)}`;
  const maxOrder = Math.max(...config.sections.map(s => s.order), 0);
  
  const newSection: Section = {
    id,
    type,
    title,
    visible: true,
    order: maxOrder + 1,
    ...(type === 'custom' && { customComponent: '' }),
  };
  
  const updatedConfig = {
    ...config,
    sections: [...config.sections, newSection]
  };
  
  await saveHomepageConfig(updatedConfig);
  return updatedConfig;
};

// Fonction pour supprimer une section
export const removeSection = async (
  config: HomepageConfig, 
  id: string
): Promise<HomepageConfig> => {
  const updatedSections = config.sections.filter(section => section.id !== id);
  const { [id]: _, ...remainingSectionData } = config.sectionData;
  
  const updatedConfig = {
    ...config,
    sections: updatedSections,
    sectionData: remainingSectionData
  };
  
  await saveHomepageConfig(updatedConfig);
  return updatedConfig;
};

// Fonction pour migrer les données du localStorage vers MySQL
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    // Récupérer les données du localStorage
    const localConfig = fallbackToLocalStorage();
    
    // Si aucune donnée n'est trouvée dans le localStorage, retourner false
    if (localConfig.sections.length === 0 && Object.keys(localConfig.sectionData).length === 0) {
      return false;
    }
    
    // Sauvegarder les données dans MySQL via l'API
    const success = await saveHomepageConfig(localConfig);
    
    return success;
  } catch (error) {
    console.error('Erreur lors de la migration des données:', error);
    return false;
  }
};

// Fonction auxiliaire pour récupérer les données du localStorage
const fallbackToLocalStorage = (): HomepageConfig => {
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

// Fonction auxiliaire pour sauvegarder les données dans le localStorage
const saveToLocalStorage = (config: HomepageConfig): void => {
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
