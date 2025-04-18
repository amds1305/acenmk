
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { 
  HomepageConfig, 
  Section, 
  SectionData, 
  SectionType,
  HomeTemplateType
} from '@/types/sections';
import { DEFAULT_HOMEPAGE_CONFIG, DEFAULT_SECTIONS, DEFAULT_TEMPLATE_CONFIG } from '../sections/defaultData';

// Convertir une section de la base de données vers le format d'application
const mapDbSectionToAppSection = (dbSection): Section => {
  return {
    id: dbSection.id,
    type: dbSection.type as SectionType,
    title: dbSection.title,
    visible: dbSection.visible,
    order: dbSection.order,
    ...(dbSection.custom_component && { customComponent: dbSection.custom_component }),
  };
};

// Récupérer la configuration complète de la page d'accueil
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // 1. Récupérer les sections
    const { data: dbSections, error: sectionsError } = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });

    if (sectionsError) throw sectionsError;

    // Si aucune section n'existe, utiliser les sections par défaut
    const sections = dbSections.length > 0 
      ? dbSections.map(mapDbSectionToAppSection) 
      : DEFAULT_SECTIONS;

    // 2. Récupérer les données des sections
    const { data: sectionDataRecords, error: dataError } = await supabase
      .from('section_data')
      .select('*');

    if (dataError) throw dataError;

    // Transformer les enregistrements en objet sectionData
    const sectionData: Record<string, SectionData> = {};
    sectionDataRecords.forEach(record => {
      sectionData[record.section_id] = record.data;
    });

    // 3. Récupérer la configuration du template
    const { data: templateConfigData, error: templateError } = await supabase
      .from('template_config')
      .select('*')
      .limit(1)
      .single();

    if (templateError && templateError.code !== 'PGRST116') { // PGRST116 = No rows returned
      throw templateError;
    }

    const templateConfig = templateConfigData 
      ? { activeTemplate: templateConfigData.active_template as HomeTemplateType }
      : DEFAULT_TEMPLATE_CONFIG;

    return { sections, sectionData, templateConfig };
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return DEFAULT_HOMEPAGE_CONFIG;
  }
};

// Sauvegarder la configuration complète de la page d'accueil
export const saveHomepageConfig = async (config: HomepageConfig): Promise<void> => {
  try {
    // Démarrer une transaction pour assurer la cohérence des données
    const { error: transactionError } = await supabase.rpc('begin_transaction');
    if (transactionError) throw transactionError;

    try {
      // 1. Mettre à jour ou insérer les sections
      for (const section of config.sections) {
        const { error } = await supabase
          .from('sections')
          .upsert({
            id: section.id,
            type: section.type,
            title: section.title,
            visible: section.visible,
            order: section.order,
            custom_component: section.customComponent,
          }, { onConflict: 'id' });

        if (error) throw error;
      }

      // 2. Mettre à jour ou insérer les données des sections
      for (const [sectionId, data] of Object.entries(config.sectionData)) {
        const { error } = await supabase
          .from('section_data')
          .upsert({
            id: uuidv4(),
            section_id: sectionId,
            data,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'section_id' });

        if (error) throw error;
      }

      // 3. Mettre à jour ou insérer la configuration du template
      if (config.templateConfig) {
        const { error } = await supabase
          .from('template_config')
          .upsert({
            id: 'default',
            active_template: config.templateConfig.activeTemplate,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });

        if (error) throw error;
      }

      // Valider la transaction
      const { error: commitError } = await supabase.rpc('commit_transaction');
      if (commitError) throw commitError;

    } catch (error) {
      // Annuler la transaction en cas d'erreur
      await supabase.rpc('rollback_transaction');
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    throw error;
  }
};

// Fonction pour migrer les données du localStorage vers Supabase
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    // Récupérer les données du localStorage
    const storedSections = localStorage.getItem('homepageSections');
    const storedSectionData = localStorage.getItem('homepageSectionData');
    const storedTemplateConfig = localStorage.getItem('homepageTemplateConfig');

    // Si aucune donnée n'est disponible, ne rien faire
    if (!storedSections && !storedSectionData && !storedTemplateConfig) {
      return false;
    }

    // Préparer la configuration à partir des données localStorage
    const sections = storedSections ? JSON.parse(storedSections) : DEFAULT_SECTIONS;
    const sectionData = storedSectionData ? JSON.parse(storedSectionData) : {};
    const templateConfig = storedTemplateConfig ? JSON.parse(storedTemplateConfig) : DEFAULT_TEMPLATE_CONFIG;

    // Sauvegarder la configuration dans Supabase
    await saveHomepageConfig({ sections, sectionData, templateConfig });

    // Migrer les clients en vedette s'ils existent
    if (sectionData['trusted-clients']) {
      const trustedClients = sectionData['trusted-clients'].clients || [];
      
      // Insérer chaque client dans la table trusted_clients
      for (const client of trustedClients) {
        const { error } = await supabase
          .from('trusted_clients')
          .upsert({
            id: client.id,
            name: client.name,
            logo_url: client.logoUrl,
            website_url: client.websiteUrl || null,
            category: client.category || null,
          }, { onConflict: 'id' });

        if (error) throw error;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la migration des données:', error);
    return false;
  }
};

// Ajouter une nouvelle section
export const addSection = async (config: HomepageConfig, type: SectionType, title: string): Promise<HomepageConfig> => {
  const id = type === 'custom' ? uuidv4() : type;
  const maxOrder = Math.max(...config.sections.map(s => s.order), -1);
  
  const newSection: Section = {
    id,
    type,
    title,
    visible: true,
    order: maxOrder + 1,
    ...(type === 'custom' && { customComponent: '' }),
  };
  
  const { error } = await supabase
    .from('sections')
    .insert({
      id: newSection.id,
      type: newSection.type,
      title: newSection.title,
      visible: newSection.visible,
      order: newSection.order,
      custom_component: newSection.customComponent,
    });

  if (error) throw error;
  
  return {
    ...config,
    sections: [...config.sections, newSection],
  };
};

// Supprimer une section
export const removeSection = async (config: HomepageConfig, id: string): Promise<HomepageConfig> => {
  // Si c'est une section standard, on la cache mais on la garde
  const isStandardSection = DEFAULT_SECTIONS.some(s => s.id === id);
  
  if (isStandardSection) {
    const { error } = await supabase
      .from('sections')
      .update({ visible: false })
      .eq('id', id);
    
    if (error) throw error;
    
    const updatedSections = config.sections.map(section => 
      section.id === id ? { ...section, visible: false } : section
    );
    
    return { ...config, sections: updatedSections };
  }
  
  // Sinon, on la supprime complètement
  const { error: sectionError } = await supabase
    .from('sections')
    .delete()
    .eq('id', id);
  
  if (sectionError) throw sectionError;
  
  const { error: dataError } = await supabase
    .from('section_data')
    .delete()
    .eq('section_id', id);
  
  if (dataError) throw dataError;
  
  const updatedSections = config.sections.filter(section => section.id !== id);
  const { [id]: _, ...remainingSectionData } = config.sectionData;
  
  return {
    sections: updatedSections,
    sectionData: remainingSectionData,
    templateConfig: config.templateConfig
  };
};

// Services supplémentaires pour les trusted_clients
export const getTrustedClients = async () => {
  const { data, error } = await supabase
    .from('trusted_clients')
    .select('*');

  if (error) throw error;
  
  // Convertir le format de base de données vers le format d'application
  return data.map(client => ({
    id: client.id,
    name: client.name,
    logoUrl: client.logo_url,
    websiteUrl: client.website_url,
    category: client.category,
  }));
};

export const upsertTrustedClient = async (client) => {
  const { error } = await supabase
    .from('trusted_clients')
    .upsert({
      id: client.id,
      name: client.name,
      logo_url: client.logoUrl,
      website_url: client.websiteUrl || null,
      category: client.category || null,
    }, { onConflict: 'id' });

  if (error) throw error;
  return true;
};

export const deleteTrustedClient = async (id) => {
  const { error } = await supabase
    .from('trusted_clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
