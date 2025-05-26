
import { HomepageConfig } from '@/types/sections';
import { saveAdminChanges } from '@/services/supabase/adminService';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  console.log('[MySQL Service] Tentative de sauvegarde de la configuration via Supabase...', config);
  try {
    // 1. Sauvegarde via Supabase
    const saved = await saveAdminChanges(config);
    
    if (saved) {
      console.log('[MySQL Service] Configuration sauvegardée avec succès via Supabase');
      
      // 2. Nettoyer le cache localStorage pour forcer le rechargement des données
      localStorage.removeItem('cachedHomepageConfig');
      localStorage.removeItem('cachedConfigTimestamp');
      
      // 3. Déclencher l'événement de changements administratifs
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      toast({
        title: "Modifications enregistrées",
        description: "Les paramètres ont été mis à jour avec succès.",
      });
      
      return true;
    }
    
    throw new Error('La sauvegarde via Supabase a échoué');
  } catch (error) {
    console.error('[MySQL Service] Erreur lors de la sauvegarde:', error);
    
    // En cas d'erreur, essayer de sauvegarder en localStorage
    try {
      console.log('[MySQL Service] Sauvegarde via Supabase échouée, repli sur localStorage');
      localStorage.setItem('homepageSections', JSON.stringify(config.sections));
      localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
      localStorage.setItem('homepageTemplateConfig', JSON.stringify(config.templateConfig));
      
      // Déclencher l'événement de changements administratifs même en cas de sauvegarde locale
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      toast({
        title: "Sauvegarde locale",
        description: "Les modifications ont été sauvegardées localement uniquement.",
        variant: "warning"
      });
      
      return true;
    } catch (localError) {
      console.error('[MySQL Service] Erreur lors de la sauvegarde locale:', localError);
      
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive"
      });
      
      return false;
    }
  }
};
