
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HomepageConfig, 
  Section, 
  SectionData, 
  SectionType,
  HomeTemplateType
} from '@/types/sections';
import { 
  getHomepageConfig, 
  saveHomepageConfig, 
  addSection, 
  removeSection 
} from '@/services/mysql'; // Updated import path
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { DEFAULT_TEMPLATE_CONFIG } from '@/services/sections/defaultData';

interface SectionsContextProps {
  config: HomepageConfig;
  isLoading: boolean;
  addNewSection: (type: SectionType, title: string) => Promise<void>;
  removeExistingSection: (id: string) => Promise<void>;
  reorderExistingSections: (orderedIds: string[]) => Promise<void>;
  updateSectionVisibility: (id: string, visible: boolean) => Promise<void>;
  updateExistingSectionData: (sectionId: string, data: SectionData) => Promise<void>;
  updateExistingSection: (sectionId: string, updates: Partial<Section>) => Promise<void>;
  updateTemplateType: (templateType: HomeTemplateType) => Promise<void>;
  saveChanges: () => Promise<void>;
  reloadConfig: () => Promise<void>;
}

const SectionsContext = createContext<SectionsContextProps | undefined>(undefined);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<HomepageConfig>({ sections: [], sectionData: {}, templateConfig: DEFAULT_TEMPLATE_CONFIG });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const initialConfig = await getHomepageConfig();
      setConfig(initialConfig);
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la configuration du site.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Charger la configuration initiale
  useEffect(() => {
    loadConfig();
  }, []);

  const reloadConfig = async () => {
    await loadConfig();
  };

  const addNewSection = async (type: SectionType, title: string) => {
    try {
      const updatedConfig = await addSection(config, type, title);
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une section:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la section.",
        variant: "destructive",
      });
    }
  };

  const removeExistingSection = async (id: string) => {
    try {
      const updatedConfig = await removeSection(config, id);
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la suppression d\'une section:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la section.",
        variant: "destructive",
      });
    }
  };

  const reorderExistingSections = async (orderedIds: string[]) => {
    try {
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
      
      const sortedSections = updatedSections.sort((a, b) => a.order - b.order);
      const updatedConfig = {
        ...config,
        sections: sortedSections
      };
      
      setConfig(updatedConfig);
      await saveHomepageConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la réorganisation des sections:', error);
      toast({
        title: "Erreur",
        description: "Impossible de réorganiser les sections.",
        variant: "destructive",
      });
    }
  };

  const updateSectionVisibility = async (id: string, visible: boolean) => {
    try {
      const updatedSections = config.sections.map(section => 
        section.id === id ? { ...section, visible } : section
      );
      
      const updatedConfig = {
        ...config,
        sections: updatedSections
      };
      
      setConfig(updatedConfig);
      await saveHomepageConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la visibilité:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la visibilité de la section.",
        variant: "destructive",
      });
    }
  };

  const updateExistingSectionData = async (sectionId: string, data: SectionData) => {
    try {
      const updatedConfig = {
        ...config,
        sectionData: {
          ...config.sectionData,
          [sectionId]: data
        }
      };
      
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de section:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données de la section.",
        variant: "destructive",
      });
    }
  };

  const updateExistingSection = async (sectionId: string, updates: Partial<Section>) => {
    try {
      const updatedSections = config.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      );
      
      const updatedConfig = {
        ...config,
        sections: updatedSections
      };
      
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la section.",
        variant: "destructive",
      });
    }
  };

  const updateTemplateType = async (templateType: HomeTemplateType) => {
    try {
      const updatedConfig = {
        ...config,
        templateConfig: {
          ...config.templateConfig,
          activeTemplate: templateType
        }
      };
      
      setConfig(updatedConfig);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du type de template:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le type de template.",
        variant: "destructive",
      });
    }
  };

  const saveChanges = async () => {
    try {
      await saveHomepageConfig(config);
      
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      queryClient.invalidateQueries({ queryKey: ['heroData'] });
      queryClient.invalidateQueries({ queryKey: ['templateConfig'] });
      queryClient.invalidateQueries({ queryKey: ['trustedClientsData'] });
      
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
    updateTemplateType,
    saveChanges,
    reloadConfig
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
