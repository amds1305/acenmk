
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig, HomeTemplateType } from '@/types/sections';
import { useQueryClient } from '@tanstack/react-query';
import { saveHomepageConfig } from '@/services/mysql';

export function useTemplateOperations(
  config: HomepageConfig,
  setConfig: React.Dispatch<React.SetStateAction<HomepageConfig>>
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      
      // Invalider immédiatement les requêtes pour propager le changement
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
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
      console.log("Sauvegarde des modifications...", config);
      const result = await saveHomepageConfig(config);
      
      if (!result) {
        throw new Error("Échec de la sauvegarde");
      }
      
      // Invalider toutes les requêtes pour forcer un rechargement complet des données
      queryClient.invalidateQueries();
      
      toast({
        title: "Modifications enregistrées",
        description: "Les paramètres de la page d'accueil ont été mis à jour avec succès.",
      });
      
      // Pause pour laisser le temps aux données de se propager
      setTimeout(() => {
        // Invalider à nouveau pour garantir la mise à jour
        queryClient.invalidateQueries();
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
    }
  };

  return {
    updateTemplateType,
    saveChanges
  };
}
