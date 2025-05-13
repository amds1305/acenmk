
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '@/services/sections/defaultData';
import { supabase } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';

// Cache expiration time in milliseconds (5 seconds)
const CACHE_EXPIRATION = 5000;

export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    console.log('Tentative de chargement de la configuration depuis Supabase...');
    
    // Vérifier si nous avons une version en cache qui est encore valide
    const cachedTimestamp = parseInt(localStorage.getItem('cachedConfigTimestamp') || '0');
    const now = Date.now();
    const cachedConfig = localStorage.getItem('cachedHomepageConfig');
    
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
      throw sectionsError;
    }

    // 2. Récupérer les données des sections
    const { data: sectionDataEntries, error: sectionDataError } = await supabase
      .from('section_data')
      .select('*');

    if (sectionDataError) {
      throw sectionDataError;
    }

    // Transformer les données de section en objet
    const sectionData = {};
    sectionDataEntries.forEach(entry => {
      sectionData[entry.section_id] = entry.data;
    });

    // 3. Récupérer la configuration du template
    const { data: templateConfig, error: templateError } = await supabase
      .from('template_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (templateError) {
      throw templateError;
    }

    const config = {
      sections: sections,
      sectionData: sectionData,
      templateConfig: templateConfig ? { activeTemplate: templateConfig.active_template } : DEFAULT_HOMEPAGE_CONFIG.templateConfig
    };

    // Mettre en cache la configuration pour une utilisation future
    localStorage.setItem('cachedHomepageConfig', JSON.stringify(config));
    localStorage.setItem('cachedConfigTimestamp', now.toString());

    console.log('Configuration chargée depuis Supabase:', config);
    
    // Invalider les requêtes associées pour forcer les composants à se rafraîchir
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['trustedClientsData'] });
    }, 500);
    
    return config;
  } catch (error) {
    console.error('Erreur lors du chargement depuis Supabase, repli sur localStorage:', error);
    
    try {
      console.log('Chargement de la configuration depuis localStorage');
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
