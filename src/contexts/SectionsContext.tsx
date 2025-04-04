import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HomepageConfig, 
  Section, 
  SectionData, 
  SectionType,
  getHomepageConfig, 
  saveHomepageConfig, 
  addSection, 
  removeSection, 
  reorderSections,
  updateSectionData,
  updateSection
} from '@/services/sections';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface SectionsContextProps {
  config: HomepageConfig;
  isLoading: boolean;
  addNewSection: (type: SectionType, title: string) => void;
  removeExistingSection: (id: string) => void;
  reorderExistingSections: (orderedIds: string[]) => void;
  updateSectionVisibility: (id: string, visible: boolean) => void;
  updateExistingSectionData: (sectionId: string, data: SectionData) => void;
  updateExistingSection: (sectionId: string, updates: Partial<Section>) => void;
  saveChanges: () => void;
}

const SectionsContext = createContext<SectionsContextProps | undefined>(undefined);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<HomepageConfig>({ sections: [], sectionData: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    try {
      const initialConfig = getHomepageConfig();
      setConfig(initialConfig);
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNewSection = (type: SectionType, title: string) => {
    setConfig(current => addSection(current, type, title));
  };

  const removeExistingSection = (id: string) => {
    setConfig(current => removeSection(current, id));
  };

  const reorderExistingSections = (orderedIds: string[]) => {
    setConfig(current => reorderSections(current, orderedIds));
  };

  const updateSectionVisibility = (id: string, visible: boolean) => {
    setConfig(current => updateSection(current, id, { visible }));
  };

  const updateExistingSectionData = (sectionId: string, data: SectionData) => {
    setConfig(current => updateSectionData(current, sectionId, data));
  };

  const updateExistingSection = (sectionId: string, updates: Partial<Section>) => {
    setConfig(current => updateSection(current, sectionId, updates));
  };

  const saveChanges = () => {
    try {
      saveHomepageConfig(config);
      
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      queryClient.invalidateQueries({ queryKey: ['heroData'] });
      
      toast({
        title: "Modifications enregistrées",
        description: "Les paramètres de la page d'accueil ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
    }
  };

  const value = {
    config,
    isLoading,
    addNewSection,
    removeExistingSection,
    reorderExistingSections,
    updateSectionVisibility,
    updateExistingSectionData,
    updateExistingSection,
    saveChanges
  };

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionsProvider');
  }
  return context;
};
