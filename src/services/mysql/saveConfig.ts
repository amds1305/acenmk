
import { HomepageConfig } from '@/types/sections';
import { saveAdminChanges } from '@/services/supabase/adminService';
import { toast } from '@/components/ui/use-toast';

export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  console.log('[MySQL Service] Tentative de sauvegarde de la configuration via Supabase...');
  try {
    // Essayer d'abord de sauvegarder via Supabase
    const saved = await saveAdminChanges(config);
    
    if (saved) {
      console.log('[MySQL Service] Configuration sauvegardée avec succès via Supabase');
      return true;
    }
    
    // Si la sauvegarde via Supabase échoue, sauvegarder en localStorage
    console.log('[MySQL Service] Sauvegarde via Supabase échouée, repli sur localStorage');
    localStorage.setItem('homepageSections', JSON.stringify(config.sections));
    localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
    localStorage.setItem('homepageTemplateConfig', JSON.stringify(config.templateConfig));
    
    toast({
      title: "Sauvegarde locale",
      description: "Les modifications ont été sauvegardées localement uniquement.",
      variant: "warning"
    });
    
    return true;
  } catch (error) {
    console.error('[MySQL Service] Erreur lors de la sauvegarde:', error);
    
    // En cas d'erreur, essayer de sauvegarder en localStorage
    try {
      localStorage.setItem('homepageSections', JSON.stringify(config.sections));
      localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
      localStorage.setItem('homepageTemplateConfig', JSON.stringify(config.templateConfig));
      
      toast({
        title: "Sauvegarde locale",
        description: "Les modifications ont été sauvegardées localement uniquement.",
        variant: "warning"
      });
      
      return true;
    } catch (localError) {
      console.error('[MySQL Service] Erreur lors de la sauvegarde locale:', localError);
      return false;
    }
  }
};
