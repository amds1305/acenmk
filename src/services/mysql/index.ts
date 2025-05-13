
import { HomepageConfig } from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG } from '@/services/sections/defaultData';
import { supabase } from '@/lib/supabase'; 

// Fonction pour récupérer la configuration de la page d'accueil
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  console.log("[API] Appel à getHomepageConfig...");
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
    console.log('Récupération des sections depuis Supabase...');
    const { data: sections, error: sectionsError } = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });

    if (sectionsError) {
      console.error('Erreur récupération sections:', sectionsError);
      throw sectionsError;
    }

    // 2. Récupérer les données des sections
    console.log('Récupération des données de sections depuis Supabase...');
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
    console.log('Récupération de la configuration du template depuis Supabase...');
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
    
    console.log('Configuration chargée avec succès:', config);
    return config;
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    
    try {
      // Tentative de charger depuis le localStorage
      console.log('Tentative de chargement depuis localStorage après erreur...');
      const sections = JSON.parse(localStorage.getItem('homepageSections') || 'null');
      const sectionData = JSON.parse(localStorage.getItem('homepageSectionData') || 'null');
      const templateConfig = JSON.parse(localStorage.getItem('homepageTemplateConfig') || 'null');
      
      if (sections) {
        console.log('Configuration récupérée depuis localStorage');
        return {
          sections,
          sectionData: sectionData || {},
          templateConfig: templateConfig || DEFAULT_HOMEPAGE_CONFIG.templateConfig
        };
      }
    } catch (localError) {
      console.error('Erreur lors du chargement depuis localStorage:', localError);
    }
    
    console.log('Utilisation de la configuration par défaut après échec de chargement');
    return DEFAULT_HOMEPAGE_CONFIG;
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
