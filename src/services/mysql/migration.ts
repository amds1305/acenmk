
import { HomepageConfig } from '@/types/sections';
import { loadFromStorage } from '../sections/storageService';
import { getApiUrl } from './config';
import { supabase } from '@/lib/supabase';

/**
 * Migre les données du localStorage vers Supabase
 * @returns {Promise<boolean>} true en cas de succès, false en cas d'échec
 */
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    console.log('Début de la migration vers Supabase...');
    
    // Récupérer les données du localStorage
    const localConfig: HomepageConfig = loadFromStorage();
    
    // Si aucune donnée n'est disponible, ne rien faire
    if (localConfig.sections.length === 0 && Object.keys(localConfig.sectionData).length === 0) {
      console.log('Aucune donnée trouvée dans localStorage');
      return false;
    }
    
    console.log(`Données à migrer: ${localConfig.sections.length} sections et ${Object.keys(localConfig.sectionData).length} sections de données`);
    
    // 1. Sauvegarde des sections
    for (const section of localConfig.sections) {
      const { error } = await supabase
        .from('sections')
        .upsert({
          id: section.id,
          type: section.type,
          title: section.title,
          visible: section.visible,
          order: section.order,
          custom_component: section.customComponent
        }, { onConflict: 'id' });

      if (error) throw error;
    }
    
    // 2. Sauvegarde des données de section
    const sectionDataArray = Object.entries(localConfig.sectionData).map(([section_id, data]) => ({
      section_id,
      data
    }));
    
    for (const entry of sectionDataArray) {
      const { error } = await supabase
        .from('section_data')
        .upsert({ 
          section_id: entry.section_id,
          data: entry.data
        }, { onConflict: 'section_id' });

      if (error) throw error;
    }
    
    // 3. Sauvegarde de la configuration du template
    if (localConfig.templateConfig) {
      const { error } = await supabase
        .from('template_config')
        .upsert({
          id: 'default',
          active_template: localConfig.templateConfig.activeTemplate
        }, { onConflict: 'id' });

      if (error) throw error;
    }
    
    console.log('Migration vers Supabase réussie');
    return true;
  } catch (error) {
    console.error('Erreur lors de la migration des données vers Supabase:', error);
    return false;
  }
};

/**
 * Migre les données du localStorage vers MySQL via l'API
 * @returns {Promise<boolean>} true en cas de succès, false en cas d'échec
 */
export const migrateLocalStorageToMySQL = async (): Promise<boolean> => {
  try {
    console.log('Début de la migration vers MySQL...');
    
    // Cette fonction est maintenant juste un alias de migrateLocalStorageToSupabase
    // puisque nous n'utilisons plus d'API MySQL séparée
    return await migrateLocalStorageToSupabase();
  } catch (error) {
    console.error('Erreur lors de la migration des données vers MySQL:', error);
    return false;
  }
};
