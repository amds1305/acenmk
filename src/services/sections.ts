
import { homePageData } from '@/data/staticData';
import { HomepageConfig, SectionType } from '@/types/sections';

/**
 * Récupère la configuration de la page d'accueil
 */
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    sections: homePageData.sections,
    header: homePageData.header
  };
};

/**
 * Récupère les données d'une section spécifique
 */
export const getSectionData = async (sectionId: string) => {
  const section = homePageData.sections.find(s => s.id === sectionId);
  return section?.data || null;
};

/**
 * Récupère toutes les sections visibles
 */
export const getVisibleSections = async () => {
  return homePageData.sections.filter(s => s.visible);
};

/**
 * Récupère une section par type
 */
export const getSectionByType = async (type: SectionType) => {
  return homePageData.sections.find(s => s.type === type);
};

// Méthodes de sauvegarde désactivées (données statiques uniquement)
export const saveHomepageConfig = async (): Promise<boolean> => {
  console.info('Méthode de sauvegarde appelée mais désactivée (mode statique)');
  return true;
};

export const updateSectionVisibility = async (): Promise<boolean> => {
  console.info('Méthode de mise à jour appelée mais désactivée (mode statique)');
  return true;
};

export const updateSectionOrder = async (): Promise<boolean> => {
  console.info('Méthode de mise à jour appelée mais désactivée (mode statique)');
  return true;
};
