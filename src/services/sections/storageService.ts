
import { HomepageConfig } from './types';
import { DEFAULT_SECTIONS, DEFAULT_SECTION_DATA } from './defaultData';

// Récupérer la configuration de la page d'accueil depuis le localStorage
export const loadFromStorage = (): HomepageConfig => {
  try {
    // Récupérer les sections
    const storedSections = localStorage.getItem('homepageSections');
    const sections = storedSections ? JSON.parse(storedSections) : DEFAULT_SECTIONS;
    
    // Récupérer les données des sections
    const storedSectionData = localStorage.getItem('homepageSectionData');
    const sectionData = storedSectionData ? JSON.parse(storedSectionData) : DEFAULT_SECTION_DATA;
    
    // Récupérer les anciennes données du hero pour la rétrocompatibilité
    const storedHeroData = localStorage.getItem('heroData');
    if (storedHeroData && !sectionData.hero) {
      sectionData.hero = JSON.parse(storedHeroData);
    }
    
    // Récupérer l'ancienne configuration de visibilité pour la rétrocompatibilité
    const storedVisibility = localStorage.getItem('homeVisibility');
    if (storedVisibility) {
      const visibility = JSON.parse(storedVisibility);
      sections.forEach(section => {
        if (visibility[section.type] !== undefined) {
          section.visible = visibility[section.type];
        }
      });
    }
    
    return { sections, sectionData };
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return { sections: DEFAULT_SECTIONS, sectionData: DEFAULT_SECTION_DATA };
  }
};

// Sauvegarder la configuration de la page d'accueil dans le localStorage
export const saveToStorage = (config: HomepageConfig): void => {
  try {
    localStorage.setItem('homepageSections', JSON.stringify(config.sections));
    localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
    
    // Maintenir la rétrocompatibilité avec l'ancien système
    if (config.sectionData.hero) {
      localStorage.setItem('heroData', JSON.stringify(config.sectionData.hero));
    }
    
    // Sauvegarder la visibilité des sections pour la rétrocompatibilité
    const visibility: Record<string, boolean> = {};
    config.sections.forEach(section => {
      visibility[section.type] = section.visible;
    });
    localStorage.setItem('homeVisibility', JSON.stringify(visibility));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
  }
};
