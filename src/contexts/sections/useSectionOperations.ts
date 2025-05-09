
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig, Section, SectionType, SectionData } from '@/types/sections';
import { addSection, removeSection, saveHomepageConfig } from '@/services/mysql';
import { ExternalLinkOptions } from './types';
import { useAdminNotification } from '@/hooks/use-admin-notification'; 

export function useSectionOperations(
  config: HomepageConfig, 
  setConfig: React.Dispatch<React.SetStateAction<HomepageConfig>>
) {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError, setSaveStatus } = useAdminNotification();

  const addNewSection = async (type: SectionType, title: string, options?: ExternalLinkOptions) => {
    try {
      setSaveStatus('saving');
      // Créer une section avec les options supplémentaires pour les liens externes
      const updatedConfig = await addSection(config, type, title, options);
      setConfig(updatedConfig);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une section:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la section.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const removeExistingSection = async (id: string) => {
    try {
      setSaveStatus('saving');
      const updatedConfig = await removeSection(config, id);
      setConfig(updatedConfig);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de la suppression d\'une section:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la section.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const reorderExistingSections = async (orderedIds: string[]) => {
    try {
      setSaveStatus('saving');
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
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de la réorganisation des sections:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible de réorganiser les sections.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateSectionVisibility = async (id: string, visible: boolean) => {
    try {
      setSaveStatus('saving');
      const updatedSections = config.sections.map(section => 
        section.id === id ? { ...section, visible } : section
      );
      
      const updatedConfig = {
        ...config,
        sections: updatedSections
      };
      
      setConfig(updatedConfig);
      await saveHomepageConfig(updatedConfig);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la visibilité:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la visibilité de la section.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateExistingSectionData = async (sectionId: string, data: SectionData) => {
    try {
      setSaveStatus('saving');
      const updatedConfig = {
        ...config,
        sectionData: {
          ...config.sectionData,
          [sectionId]: data
        }
      };
      
      setConfig(updatedConfig);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de section:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données de la section.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const updateExistingSection = async (sectionId: string, updates: Partial<Section>) => {
    try {
      setSaveStatus('saving');
      const updatedSections = config.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      );
      
      const updatedConfig = {
        ...config,
        sections: updatedSections
      };
      
      setConfig(updatedConfig);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section:', error);
      setSaveStatus('error');
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la section.",
        variant: "destructive",
      });
      setTimeout(() => setSaveStatus('idle'), 3000);
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
