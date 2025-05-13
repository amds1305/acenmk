
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '@/services/sections/defaultData';
import { supabase } from '@/lib/supabase'; 

// Fonction pour récupérer la configuration de la page d'accueil
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    console.log('Tentative de chargement de la configuration depuis Supabase...');
    
    // Vérifier si nous avons une version en cache qui est encore valide
    const cachedTimestamp = parseInt(localStorage.getItem('cachedConfigTimestamp') || '0');
    const now = Date.now();
    const cachedConfig = localStorage.getItem('cachedHomepageConfig');
    const CACHE_EXPIRATION = 5000;
    
    if (cachedConfig && now - cachedTimestamp < CACHE_EXPIRATION) {
      console.log('Utilisation de la configuration en cache');
      return JSON.parse(cachedConfig);
    }
    
    // 1. Récupérer les sections
    const { data: sections, error: sectionsError } = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });

    if (sectionsError) {
      console.error('Erreur récupération sections:', sectionsError);
      throw sectionsError;
    }

    // 2. Récupérer les données des sections
    const { data: sectionDataEntries, error: sectionDataError } = await supabase
      .from('section_data')
      .select('*');

    if (sectionDataError) {
      console.error('Erreur récupération données sections:', sectionDataError);
      throw sectionDataError;
    }

    // Transformer les données de section en objet
    const sectionData = {};
    sectionDataEntries?.forEach(entry => {
      if (entry.section_id) {
        sectionData[entry.section_id] = entry.data;
      }
    });

    // 3. Récupérer la configuration du template
    const { data: templateConfig, error: templateError } = await supabase
      .from('template_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (templateError && templateError.code !== 'PGRST116') { // PGRST116 = No rows returned
      console.error('Erreur récupération template:', templateError);
      throw templateError;
    }

    const config = {
      sections: sections || [],
      sectionData: sectionData || {},
      templateConfig: templateConfig 
        ? { activeTemplate: templateConfig.active_template } 
        : DEFAULT_HOMEPAGE_CONFIG.templateConfig
    };

    // Mettre en cache la configuration
    localStorage.setItem('cachedHomepageConfig', JSON.stringify(config));
    localStorage.setItem('cachedConfigTimestamp', now.toString());
    
    return config;
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    
    try {
      // Tentative de charger depuis le localStorage
      const sections = JSON.parse(localStorage.getItem('homepageSections') || 'null');
      const sectionData = JSON.parse(localStorage.getItem('homepageSectionData') || 'null');
      const templateConfig = JSON.parse(localStorage.getItem('homepageTemplateConfig') || 'null');
      
      if (sections) {
        return {
          sections,
          sectionData: sectionData || {},
          templateConfig: templateConfig || DEFAULT_HOMEPAGE_CONFIG.templateConfig
        };
      }
    } catch (localError) {
      console.error('Erreur lors du chargement depuis localStorage:', localError);
    }
    
    return DEFAULT_HOMEPAGE_CONFIG;
  }
};

// Fonction pour sauvegarder la configuration de la page d'accueil
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    console.log("Sauvegarde de la configuration:", config);
    
    // 1. Sauvegarde des sections
    for (const section of config.sections) {
      await supabase
        .from('sections')
        .upsert({
          id: section.id,
          type: section.type,
          title: section.title,
          visible: section.visible,
          order: section.order,
          custom_component: section.customComponent
        }, { onConflict: 'id' });
    }
    
    // 2. Sauvegarde des données de section
    const sectionDataArray = Object.entries(config.sectionData).map(([section_id, data]) => ({
      section_id,
      data
    }));
    
    for (const entry of sectionDataArray) {
      await supabase
        .from('section_data')
        .upsert({ 
          section_id: entry.section_id,
          data: entry.data
        }, { onConflict: 'section_id' });
    }
    
    // 3. Sauvegarde de la configuration du template
    if (config.templateConfig) {
      await supabase
        .from('template_config')
        .upsert({
          id: 'default',
          active_template: config.templateConfig.activeTemplate
        }, { onConflict: 'id' });
    }
    
    // Nettoyer les caches
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    // Déclencher un événement de mise à jour
    window.dispatchEvent(new CustomEvent('admin-changes-saved'));
    
    console.log("Configuration sauvegardée avec succès!");
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    
    // Sauvegarde de secours en localStorage
    try {
      localStorage.setItem('homepageSections', JSON.stringify(config.sections));
      localStorage.setItem('homepageSectionData', JSON.stringify(config.sectionData));
      localStorage.setItem('homepageTemplateConfig', JSON.stringify(config.templateConfig));
      return true;
    } catch (localError) {
      console.error('Erreur lors de la sauvegarde locale:', localError);
      return false;
    }
  }
};

// Instead of importing from local files, directly re-export from the supabase services
export { 
  getTeamMembers,
  getTestimonials, 
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getTrustedClients,
  upsertTrustedClient,
  deleteTrustedClient
} from '@/services/supabase';

