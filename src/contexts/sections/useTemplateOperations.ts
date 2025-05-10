
import { useCallback } from 'react';
import { HomepageConfig, HomeTemplateType } from '@/types/sections';
import { saveHomepageConfig } from '@/services/mysql';
import { useQueryClient } from '@tanstack/react-query';

export const useTemplateOperations = (
  config: HomepageConfig,
  setConfig: (config: HomepageConfig) => void,
  setSaveStatus: (status: 'idle' | 'saving' | 'success' | 'error') => void
) => {
  const queryClient = useQueryClient();
  
  const updateTemplateType = useCallback((template: HomeTemplateType) => {
    console.log('Mise à jour du template:', template);
    
    setConfig({
      ...config,
      templateConfig: {
        ...config.templateConfig,
        activeTemplate: template
      }
    });
  }, [config, setConfig]);

  const saveChanges = useCallback(async () => {
    console.log('Sauvegarde des modifications...');
    setSaveStatus('saving');

    try {
      // Assurer que les sections ont l'attribut order correctement défini
      const updatedSections = config.sections.map((section, index) => ({
        ...section,
        order: section.order !== undefined ? section.order : index
      }));

      const configToSave = {
        ...config,
        sections: updatedSections
      };

      console.log('Configuration à sauvegarder:', configToSave);
      const result = await saveHomepageConfig(configToSave);
      
      if (result) {
        console.log('Sauvegarde réussie');
        setSaveStatus('success');
        
        // Nettoyer les caches
        localStorage.removeItem('cachedHomepageConfig');
        localStorage.removeItem('cachedConfigTimestamp');
        
        // Invalider explicitement toutes les requêtes liées à la config de la page d'accueil
        queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
        
        // Force un rechargement de la configuration
        setTimeout(() => {
          queryClient.invalidateQueries();
        }, 500);
        
        return true;
      } else {
        console.error('Échec de la sauvegarde');
        setSaveStatus('error');
        throw new Error('Échec de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveStatus('error');
      throw error;
    }
  }, [config, setSaveStatus, queryClient]);

  return {
    updateTemplateType,
    saveChanges
  };
};
