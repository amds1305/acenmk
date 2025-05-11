
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { FooterStyle, defaultFooterStyle } from './types';

export const useFooterStyle = () => {
  const { toast } = useToast();
  const [footerStyle, setFooterStyle] = useState<FooterStyle>(defaultFooterStyle);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFooterStyle = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'footer-style')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
            console.error("Erreur lors du chargement des styles:", error);
          }
          // Utiliser les styles par défaut si aucun style n'est trouvé
        } else if (data) {
          setFooterStyle(data.data as FooterStyle);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFooterStyle();
  }, []);

  const handleStyleChange = <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => {
    setFooterStyle(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [property]: value
      }
    }));
  };

  const saveFooterStyle = async () => {
    try {
      const { error } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'footer-style',
          data: footerStyle,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (error) throw error;

      toast({
        title: "Styles sauvegardés",
        description: "Les styles du pied de page ont été mis à jour avec succès"
      });

      // Trigger event to update the footer in real-time
      window.dispatchEvent(new CustomEvent('footer-style-updated', { detail: footerStyle }));
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des styles",
        variant: "destructive"
      });
    }
  };

  return { footerStyle, loading, handleStyleChange, saveFooterStyle };
};
