
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HomepageConfig, 
  Section, 
  SectionData, 
  SectionType 
} from '@/types/sections';
import { 
  getHomepageConfig, 
  saveHomepageConfig, 
  addSection, 
  removeSection, 
  reorderSections,
  updateSectionData,
  updateSection
} from '@/services/sectionsService';
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

  // Charger la configuration initiale
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

  // Ajouter une nouvelle section
  const addNewSection = (type: SectionType, title: string) => {
    setConfig(current => addSection(current, type, title));
  };

  // Supprimer une section existante
  const removeExistingSection = (id: string) => {
    setConfig(current => removeSection(current, id));
  };

  // Réorganiser les sections
  const reorderExistingSections = (orderedIds: string[]) => {
    setConfig(current => reorderSections(current, orderedIds));
  };

  // Mettre à jour la visibilité d'une section
  const updateSectionVisibility = (id: string, visible: boolean) => {
    setConfig(current => updateSection(current, id, { visible }));
  };

  // Mettre à jour les données d'une section
  const updateExistingSectionData = (sectionId: string, data: SectionData) => {
    setConfig(current => updateSectionData(current, sectionId, data));
  };

  // Mettre à jour une section
  const updateExistingSection = (sectionId: string, updates: Partial<Section>) => {
    setConfig(current => updateSection(current, sectionId, updates));
  };

  // Sauvegarder les changements
  const saveChanges = () => {
    try {
      saveHomepageConfig(config);
      
      // Invalider les requêtes pour forcer le rechargement des données
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
