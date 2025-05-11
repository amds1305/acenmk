
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { LegalContents, LegalContent } from './types';
import { defaultLegalContents } from './defaultData';
import { contentSlugs } from './types';
import { useAdminNotification } from '@/hooks/admin-notification';

export const useLegalContent = () => {
  const { toast } = useToast();
  const adminNotification = useAdminNotification();
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<LegalContents>(defaultLegalContents);
  const [activeContent, setActiveContent] = useState<keyof LegalContents>('legalNotice');

  // Load legal contents from database
  useEffect(() => {
    const loadLegalContents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'legal-contents')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
            console.error("Erreur lors du chargement des contenus légaux:", error);
          }
          // Utiliser les contenus par défaut si aucun contenu n'est trouvé
        } else if (data) {
          setContents(data.data as LegalContents);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLegalContents();
  }, []);

  // Update a specific content field
  const updateContent = (section: keyof LegalContents, field: keyof LegalContent, value: string | boolean) => {
    setContents(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Save all contents
  const saveContents = async () => {
    try {
      adminNotification?.showProcessing();
      
      const { error } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'legal-contents',
          data: contents,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (error) throw error;

      // Create or update pages for each content
      await createOrUpdateLegalPages();
      
      adminNotification?.showSaveSuccess();
      toast({
        title: "Contenus sauvegardés",
        description: "Les contenus légaux ont été mis à jour avec succès"
      });
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error);
      adminNotification?.showSaveError(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des contenus",
        variant: "destructive"
      });
    }
  };

  // Create or update pages for each legal content
  const createOrUpdateLegalPages = async () => {
    try {
      // For each legal content
      for (const [key, slug] of Object.entries(contentSlugs) as [keyof LegalContents, string][]) {
        const content = contents[key];
        
        // Check if page already exists
        const { data: existingPage } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existingPage) {
          // Update existing page
          await supabase
            .from('pages')
            .update({
              title: content.title,
              content: content.content,
              meta_description: content.metaDescription || '',
              is_published: content.isPublished,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPage.id);
        } else {
          // Create new page
          await supabase
            .from('pages')
            .insert({
              slug,
              title: content.title,
              content: content.content,
              meta_description: content.metaDescription || '',
              is_published: content.isPublished,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création/mise à jour des pages:", error);
      throw error;
    }
  };

  return {
    loading,
    contents,
    activeContent,
    setActiveContent,
    updateContent,
    saveContents
  };
};
