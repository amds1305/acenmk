
import { v4 as uuidv4 } from 'uuid';
import { HomepageConfig, Section, SectionData, SectionType } from './types';
import { DEFAULT_SECTIONS, DEFAULT_TEMPLATE_CONFIG } from './defaultData';

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
    sectionData: { ...config.sectionData },
    templateConfig: config.templateConfig || DEFAULT_TEMPLATE_CONFIG
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
    sectionData: remainingSectionData,
    templateConfig: config.templateConfig
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
