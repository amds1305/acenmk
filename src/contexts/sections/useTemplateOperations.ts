
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig, HomeTemplateType } from '@/types/sections';
import { useQueryClient } from '@tanstack/react-query';
import { saveHomepageConfig } from '@/services/supabase/sectionsService';

export function useTemplateOperations(
  config: HomepageConfig,
  setConfig: React.Dispatch<React.SetStateAction<HomepageConfig>>
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTemplateType = async (templateType: HomeTemplateType) => {
    try {
      console.log(`Mise à jour du template: ${templateType}`);
      
      const updatedConfig = {
        ...config,
        templateConfig: {
          ...config.templateConfig,
          activeTemplate: templateType
        }
      };
      
      setConfig(updatedConfig);
      
      // Invalider immédiatement les requêtes pour propager le changement
      queryClient.invalidateQueries();
      
      // Tenter de sauvegarder immédiatement la modification
      try {
        await saveChanges(updatedConfig);
      } catch (saveError) {
        console.error('Erreur lors de la sauvegarde immédiate du template:', saveError);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du type de template:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le type de template.",
        variant: "destructive",
      });
    }
  };

  const saveChanges = async (configToSave = config) => {
    try {
      console.log("Sauvegarde des modifications...", configToSave);
      const result = await saveHomepageConfig(configToSave);
      
      if (!result) {
        throw new Error("Échec de la sauvegarde");
      }
      
      // Invalider toutes les requêtes pour forcer un rechargement complet des données
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      queryClient.invalidateQueries({ queryKey: ['trustedClientsData'] });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      
      toast({
        title: "Modifications enregistrées",
        description: "Les paramètres de la page d'accueil ont été mis à jour avec succès.",
      });
      
      // Forcer un rechargement complet après 1 seconde pour s'assurer que les données sont à jour
      setTimeout(() => {
        queryClient.invalidateQueries();
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      }, 1000);
      
      return true;
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    updateTemplateType,
    saveChanges
  };
}
