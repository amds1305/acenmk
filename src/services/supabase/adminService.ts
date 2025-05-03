
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { HomepageConfig } from "@/types/sections";

export async function saveAdminChanges(config: HomepageConfig): Promise<boolean> {
  try {
    console.log("Sauvegarde des modifications admin via Supabase:", config);
    
    // 1. Sauvegarde des sections
    if (config.sections && config.sections.length > 0) {
      for (const section of config.sections) {
        console.log(`Traitement de la section: ${section.id}`);
        const { error } = await supabase
          .from('sections')
          .upsert({
            id: section.id,
            type: section.type,
            title: section.title,
            visible: section.visible,
            order: section.order,
            custom_component: section.customComponent || null,
          }, { onConflict: 'id' });

        if (error) {
          console.error(`Erreur lors de la sauvegarde de la section ${section.id}:`, error);
          throw error;
        }
      }
    }
    
    // 2. Sauvegarde des données de section
    if (config.sectionData) {
      for (const [sectionId, data] of Object.entries(config.sectionData)) {
        console.log(`Sauvegarde des données pour la section: ${sectionId}`);
        const { error } = await supabase
          .from('section_data')
          .upsert({
            section_id: sectionId, 
            data
          }, {
            onConflict: 'section_id'
          });

        if (error) {
          console.error(`Erreur lors de la sauvegarde des données pour la section ${sectionId}:`, error);
          throw error;
        }
      }
    }
    
    // 3. Sauvegarde de la configuration du template
    if (config.templateConfig) {
      console.log("Sauvegarde de la configuration du template", config.templateConfig);
      const { error } = await supabase
        .from('template_config')
        .upsert({
          id: 'default',
          active_template: config.templateConfig.activeTemplate
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error("Erreur lors de la sauvegarde de la configuration du template:", error);
        throw error;
      }
    }
    
    // Invalider le cache local pour forcer le rechargement
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des modifications:", error);
    toast({
      title: "Erreur de sauvegarde",
      description: "Impossible de sauvegarder les modifications.",
      variant: "destructive"
    });
    return false;
  }
}
