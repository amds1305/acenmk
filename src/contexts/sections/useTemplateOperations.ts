
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
      console.log(`Mise à jour du template: ${templateType}`);
      
      const updatedConfig = {
        ...config,
        templateConfig: {
          ...config.templateConfig,
          activeTemplate: templateType
        }
      };
      
      setConfig(updatedConfig);
      
      // Tenter de sauvegarder immédiatement la modification
      const success = await saveChanges(updatedConfig);
      
      if (success) {
        toast({
          title: "Template modifié",
          description: `Le template a été changé pour ${templateType}. Rechargement de la page...`,
        });
        
        // Invalider toutes les requêtes pour forcer un rechargement complet
        setTimeout(() => {
          queryClient.invalidateQueries();
          window.location.reload(); // Force un rechargement complet de la page
        }, 1000);
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
      
      // Déclencher l'événement de sauvegarde administrative
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
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
