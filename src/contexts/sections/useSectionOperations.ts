
import { useCallback } from 'react';
import { Section, HomepageConfig, SectionData, SectionType } from '@/types/sections';

export const useSectionOperations = (
  config: HomepageConfig,
  setConfig: (config: HomepageConfig) => void
) => {
  const addNewSection = useCallback((newSection: Section) => {
    // Vérifier si la section existe déjà
    const existingSection = config.sections.find(s => s.id === newSection.id);
    if (existingSection) {
      console.log('Section déjà existante:', existingSection);
      return;
    }

    console.log('Ajout d\'une nouvelle section:', newSection);
    
    setConfig({
      ...config,
      sections: [...config.sections, newSection],
    });
  }, [config, setConfig]);

  const removeExistingSection = useCallback((sectionId: string) => {
    console.log('Suppression de la section:', sectionId);
    
    setConfig({
      ...config,
      sections: config.sections.filter(s => s.id !== sectionId),
    });
  }, [config, setConfig]);

  const updateSectionOrder = useCallback((updatedSections: Section[]) => {
    console.log('Mise à jour de l\'ordre des sections:', updatedSections);
    
    setConfig({
      ...config,
      sections: updatedSections,
    });
  }, [config, setConfig]);

  const updateSectionVisibility = useCallback((sectionId: string, isVisible: boolean) => {
    console.log(`Mise à jour de la visibilité de la section ${sectionId}:`, isVisible);
    
    setConfig({
      ...config,
      sections: config.sections.map(s =>
        s.id === sectionId ? { ...s, visible: isVisible } : s
      ),
    });
  }, [config, setConfig]);

  const updateExistingSectionData = useCallback((sectionId: string, data: SectionData) => {
    console.log('Mise à jour des données de section:', sectionId, data);
    
    setConfig({
      ...config,
      sectionData: {
        ...config.sectionData,
        [sectionId]: data,
      },
    });
  }, [config, setConfig]);

  const updateExistingSection = useCallback((updatedSection: Section) => {
    console.log('Mise à jour de la section:', updatedSection);
    
    setConfig({
      ...config,
      sections: config.sections.map(s =>
        s.id === updatedSection.id ? updatedSection : s
      ),
    });
  }, [config, setConfig]);

  return {
    addNewSection,
    removeExistingSection,
    updateSectionOrder,
    updateSectionVisibility,
    updateExistingSectionData,
    updateExistingSection,
  };
};
