
import { HomepageConfig, Section, SectionData, SectionType } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_HOMEPAGE_CONFIG } from '../sections/defaultData';
import { supabase } from '@/lib/supabase';

// URL de base de l'API MySQL (à configurer)
const API_BASE_URL = import.meta.env.VITE_MYSQL_API_URL || '';

// Fonction pour récupérer la configuration de la page d'accueil depuis MySQL
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // Vérifier si l'URL de l'API est définie
    if (!API_BASE_URL) {
      console.warn('URL de l\'API MySQL non définie, utilisation du localStorage par défaut');
      // Fallback au localStorage si l'API n'est pas configurée
      return fallbackToLocalStorage();
    }

    // Récupérer les sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections`);
    if (!sectionsResponse.ok) {
      throw new Error('Erreur lors de la récupération des sections');
    }
    const sections = await sectionsResponse.json();

    // Récupérer les données des sections
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data`);
    if (!sectionDataResponse.ok) {
      throw new Error('Erreur lors de la récupération des données des sections');
    }
    const sectionDataArray = await sectionDataResponse.json();

    // Formater les données des sections dans le format attendu
    const sectionData: Record<string, SectionData> = {};
    sectionDataArray.forEach((data: any) => {
      sectionData[data.section_id] = data.data;
    });

    // Récupérer la configuration du template
    const templateConfigResponse = await fetch(`${API_BASE_URL}/template-config`);
    const templateConfig = templateConfigResponse.ok 
      ? await templateConfigResponse.json() 
      : { activeTemplate: 'default' };

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

    // Sauvegarder les sections
    const sectionsResponse = await fetch(`${API_BASE_URL}/sections`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config.sections)
    });
    if (!sectionsResponse.ok) {
      throw new Error('Erreur lors de la sauvegarde des sections');
    }

    // Préparer les données des sections pour l'API
    const sectionDataArray = Object.entries(config.sectionData).map(([sectionId, data]) => ({
      section_id: sectionId,
      data
    }));

    // Sauvegarder les données des sections
    const sectionDataResponse = await fetch(`${API_BASE_URL}/section-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sectionDataArray)
    });
    if (!sectionDataResponse.ok) {
      throw new Error('Erreur lors de la sauvegarde des données des sections');
    }

    // Sauvegarder la configuration du template
    if (config.templateConfig) {
      const templateConfigResponse = await fetch(`${API_BASE_URL}/template-config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.templateConfig)
      });
      if (!templateConfigResponse.ok) {
        throw new Error('Erreur lors de la sauvegarde de la configuration du template');
      }
    }

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
