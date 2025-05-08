
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig, Section, SectionType, SectionData } from '@/types/sections';
import { addSection, removeSection, saveHomepageConfig } from '@/services/mysql';
import { ExternalLinkOptions } from './types';

export function useSectionOperations(
  config: HomepageConfig, 
  setConfig: React.Dispatch<React.SetStateAction<HomepageConfig>>
) {
  const { toast } = useToast();

  const addNewSection = async (type: SectionType, title: string, options?: ExternalLinkOptions) => {
    try {
      // Créer une section avec les options supplémentaires pour les liens externes
      const updatedConfig = await addSection(config, type, title, options);
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

  return {
    addNewSection,
    removeExistingSection,
    reorderExistingSections,
    updateSectionVisibility,
    updateExistingSectionData,
    updateExistingSection
  };
}
