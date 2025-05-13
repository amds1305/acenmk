
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '@/services/sections/defaultData';
import { supabase } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';

export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    console.log('Tentative de chargement de la configuration depuis Supabase...');
    
    // Vérifier si nous avons une version en cache qui est encore valide
    const cachedTimestamp = parseInt(localStorage.getItem('cachedConfigTimestamp') || '0');
    const now = Date.now();
    const cachedConfig = localStorage.getItem('cachedHomepageConfig');
    const CACHE_EXPIRATION = 5000; // 5 secondes
    
    if (cachedConfig && now - cachedTimestamp < CACHE_EXPIRATION) {
      console.log('Utilisation de la configuration en cache');
      return JSON.parse(cachedConfig);
    }
    
    // Utiliser le mode fetch sans utiliser from() qui cause l'erreur
    const sectionsResponse = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });
    
    if (sectionsResponse.error) throw sectionsResponse.error;
    const sections = sectionsResponse.data || [];

    // Récupérer les données des sections
    const sectionDataResponse = await supabase
      .from('section_data')
      .select('*');

    if (sectionDataResponse.error) throw sectionDataResponse.error;

    // Transformer les données de section en objet
    const sectionData = {};
    sectionDataResponse.data?.forEach(entry => {
      if (entry.section_id) {
        sectionData[entry.section_id] = entry.data;
      }
    });

    // Récupérer la configuration du template
    const templateConfigResponse = await supabase
      .from('template_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (templateConfigResponse.error && templateConfigResponse.error.code !== 'PGRST116') {
      throw templateConfigResponse.error;
    }

    const config = {
      sections: sections || [],
      sectionData: sectionData || {},
      templateConfig: templateConfigResponse.data 
        ? { activeTemplate: templateConfigResponse.data.active_template } 
        : DEFAULT_HOMEPAGE_CONFIG.templateConfig
    };

    // Mettre en cache la configuration
    localStorage.setItem('cachedHomepageConfig', JSON.stringify(config));
    localStorage.setItem('cachedConfigTimestamp', now.toString());
    
    console.log('Configuration chargée depuis Supabase:', config);
    return config;
  } catch (error) {
    console.error('Erreur lors du chargement depuis Supabase, repli sur localStorage:', error);
    
    try {
      console.log('Tentative de chargement depuis localStorage');
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
    
    // Si aucune donnée n'est disponible, retourner la configuration par défaut
    console.log('Utilisation de la configuration par défaut');
    return DEFAULT_HOMEPAGE_CONFIG;
  }
};
