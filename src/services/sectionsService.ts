
import { v4 as uuidv4 } from 'uuid';
import { HomepageConfig, Section, SectionData, SectionType } from '@/types/sections';
import { HeroData } from '@/components/Hero';

// Configuration par défaut de la page d'accueil
const DEFAULT_SECTIONS: Section[] = [
  { id: 'hero', type: 'hero', title: 'Hero', visible: true, order: 0 },
  { id: 'services', type: 'services', title: 'Services', visible: true, order: 1 },
  { id: 'about', type: 'about', title: 'À propos', visible: true, order: 2 },
  { id: 'team', type: 'team', title: 'Équipe', visible: true, order: 3 },
  { id: 'testimonials', type: 'testimonials', title: 'Témoignages', visible: true, order: 4 },
  { id: 'faq', type: 'faq', title: 'FAQ', visible: true, order: 5 },
  { id: 'contact', type: 'contact', title: 'Contact', visible: true, order: 6 },
];

const DEFAULT_SECTION_DATA: Record<string, SectionData> = {
  hero: {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
  },
  // Les autres sections utilisent leurs valeurs par défaut définies dans leurs composants respectifs
};

// Récupérer la configuration de la page d'accueil
export const getHomepageConfig = (): HomepageConfig => {
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

// Sauvegarder la configuration de la page d'accueil
export const saveHomepageConfig = (config: HomepageConfig): void => {
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

// Ajouter une nouvelle section
export const addSection = (config: HomepageConfig, type: SectionType, title: string): HomepageConfig => {
  const id = type === 'custom' ? uuidv4() : type;
  const maxOrder = Math.max(...config.sections.map(s => s.order), -1);
  
  const newSection: Section = {
    id,
    type,
    title,
    visible: true,
    order: maxOrder + 1,
    ...(type === 'custom' && { customComponent: '' }),
  };
  
  return {
    sections: [...config.sections, newSection],
    sectionData: { ...config.sectionData }
  };
};

// Supprimer une section
export const removeSection = (config: HomepageConfig, id: string): HomepageConfig => {
  // Si c'est une section standard, on la garde mais on la cache
  const isStandardSection = DEFAULT_SECTIONS.some(s => s.id === id);
  
  if (isStandardSection) {
    const updatedSections = config.sections.map(section => 
      section.id === id ? { ...section, visible: false } : section
    );
    return { ...config, sections: updatedSections };
  }
  
  // Sinon, on la supprime complètement
  const updatedSections = config.sections.filter(section => section.id !== id);
  const { [id]: _, ...remainingSectionData } = config.sectionData;
  
  return {
    sections: updatedSections,
    sectionData: remainingSectionData
  };
};

// Réorganiser les sections
export const reorderSections = (config: HomepageConfig, orderedIds: string[]): HomepageConfig => {
  const updatedSections = [...config.sections];
  
  orderedIds.forEach((id, index) => {
    const sectionIndex = updatedSections.findIndex(s => s.id === id);
    if (sectionIndex !== -1) {
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        order: index
      };
    }
  });
  
  return {
    ...config,
    sections: updatedSections.sort((a, b) => a.order - b.order)
  };
};

// Mettre à jour les données d'une section
export const updateSectionData = (
  config: HomepageConfig, 
  sectionId: string, 
  data: SectionData
): HomepageConfig => {
  return {
    ...config,
    sectionData: {
      ...config.sectionData,
      [sectionId]: data
    }
  };
};

// Mettre à jour une section
export const updateSection = (
  config: HomepageConfig,
  sectionId: string,
  updates: Partial<Section>
): HomepageConfig => {
  const updatedSections = config.sections.map(section => 
    section.id === sectionId ? { ...section, ...updates } : section
  );
  
  return {
    ...config,
    sections: updatedSections
  };
};
