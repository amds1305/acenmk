
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

  return {
    updateTemplateType,
    saveChanges
  };
}
