
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { LegalContent, LegalContents, contentSlugs } from './types';

// Initialize with default values
const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: "<h1>Mentions légales</h1><p>Ajoutez ici vos mentions légales...</p>",
    metaDescription: "Mentions légales de notre entreprise",
    isPublished: true
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: "<h1>Politique de confidentialité</h1><p>Ajoutez ici votre politique de confidentialité...</p>",
    metaDescription: "Notre politique de confidentialité concernant vos données personnelles",
    isPublished: true
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: "<h1>Conditions d'utilisation</h1><p>Ajoutez ici vos conditions d'utilisation...</p>",
    metaDescription: "Conditions d'utilisation de nos services",
    isPublished: true
  },
  cookiesPolicy: {
    title: "Politique des cookies",
    content: "<h1>Politique des cookies</h1><p>Ajoutez ici votre politique des cookies...</p>",
    metaDescription: "Notre politique concernant l'utilisation des cookies",
    isPublished: true
  }
};

export const useLegalContent = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<LegalContents>(defaultLegalContents);
  const [activeContent, setActiveContent] = useState<keyof LegalContents>('legalNotice');

  // Charger les contenus depuis la base de données
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
        } else if (data && data.data) {
          // Type assertion to ensure the data is of LegalContents type
          setContents({ ...defaultLegalContents, ...data.data as any });
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLegalContents();
  }, []);

  // Mettre à jour un contenu
  const updateContent = (section: keyof LegalContents, field: keyof LegalContent, value: string | boolean) => {
    setContents(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Sauvegarder les contenus
  const saveContents = async () => {
    try {
      // Serialize the contents for Supabase
      const { error } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'legal-contents',
          data: contents as any,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (error) throw error;

      toast({
        title: "Contenus sauvegardés",
        description: "Les contenus légaux ont été mis à jour avec succès"
      });

      // Créer ou mettre à jour les pages pour chaque contenu légal
      await createOrUpdateLegalPages();
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des contenus",
        variant: "destructive"
      });
    }
  };

  // Créer ou mettre à jour les pages pour chaque contenu légal
  const createOrUpdateLegalPages = async () => {
    try {
      // Pour chaque contenu légal
      for (const [key, slug] of Object.entries(contentSlugs)) {
        const legalKey = key as keyof LegalContents;
        const content = contents[legalKey];
        
        // Vérifier si la page existe déjà
        const { data: existingPage } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existingPage) {
          // Mettre à jour la page existante
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
          // Créer une nouvelle page
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

      toast({
        title: "Pages mises à jour",
        description: "Les pages légales ont été créées ou mises à jour"
      });
    } catch (error) {
      console.error("Erreur lors de la création/mise à jour des pages:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des pages légales",
        variant: "destructive"
      });
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

export default useLegalContent;
