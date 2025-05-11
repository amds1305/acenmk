import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { FooterStyle, defaultFooterStyle } from './types';

export const useFooterStyle = () => {
  const { toast } = useToast();
  const [footerStyle, setFooterStyle] = useState<FooterStyle>(defaultFooterStyle);
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFooterStyle = async () => {
      try {
        setLoading(true);
        // Charger les styles
        const { data: styleData, error: styleError } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'footer-style')
          .single();

        if (styleError) {
          if (styleError.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
            console.error("Erreur lors du chargement des styles:", styleError);
          }
          // Utiliser les styles par défaut si aucun style n'est trouvé
        } else if (styleData) {
          // Make sure we merge with default styles to ensure all properties exist
          // Use recursive merge to handle nested properties
          const mergedStyles = mergeWithDefaults(defaultFooterStyle, styleData.data);
          setFooterStyle(mergedStyles);
        }

        // Charger les données du footer
        const { data: footerDataResult, error: footerError } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'footer')
          .single();

        if (footerError) {
          if (footerError.code !== 'PGRST116') {
            console.error("Erreur lors du chargement des données du footer:", footerError);
          }
        } else if (footerDataResult) {
          setFooterData(footerDataResult.data);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFooterStyle();
  }, []);

  // Helper function to deep merge objects ensuring all default values are preserved
  const mergeWithDefaults = (defaultObj: any, customObj: any) => {
    if (!customObj) return {...defaultObj};
    
    const result = {...defaultObj};
    
    for (const key in customObj) {
      if (typeof customObj[key] === 'object' && customObj[key] !== null && key in defaultObj) {
        // If this is a nested object and exists in default, recursively merge
        result[key] = mergeWithDefaults(defaultObj[key], customObj[key]);
      } else {
        // Otherwise just copy the value
        result[key] = customObj[key];
      }
    }
    
    return result;
  };

  const handleStyleChange = <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => {
    setFooterStyle(prev => {
      // Ensure the section exists by creating a deep copy
      const newState = {...prev};
      
      // If the section doesn't exist, initialize it from default
      if (!newState[section]) {
        newState[section] = {...defaultFooterStyle[section]};
      }
      
      // Now safely update the property
      newState[section] = {
        ...newState[section],
        [property]: value
      };
      
      return newState;
    });
  };

  const handleDataChange = (section: string, property: string, value: any) => {
    setFooterData(prev => {
      const newData = prev ? {...prev} : {};
      
      // Si cette section n'existe pas, la créer
      if (!newData[section]) {
        newData[section] = {};
      }
      
      // Mettre à jour la propriété dans la section existante
      newData[section] = {
        ...newData[section],
        [property]: value
      };
      
      return newData;
    });
  };

  const saveFooterStyle = async () => {
    try {
      // Ensure all required fields exist before saving
      const completeFooterStyle = mergeWithDefaults(defaultFooterStyle, footerStyle);
      
      // Sauvegarder les styles
      const { error: styleError } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'footer-style',
          data: completeFooterStyle,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (styleError) throw styleError;

      // Sauvegarder les données du footer si elles existent
      if (footerData) {
        const { error: dataError } = await supabase
          .from('section_data')
          .upsert({
            section_id: 'footer',
            data: footerData,
            updated_at: new Date().toISOString()
          }, { onConflict: 'section_id' });

        if (dataError) throw dataError;
      }

      toast({
        title: "Styles sauvegardés",
        description: "Les styles et données du pied de page ont été mis à jour avec succès"
      });

      // Trigger event to update the footer in real-time
      window.dispatchEvent(new CustomEvent('footer-style-updated', { 
        detail: { style: completeFooterStyle, data: footerData }
      }));
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des styles",
        variant: "destructive"
      });
    }
  };

  return { footerStyle, footerData, loading, handleStyleChange, handleDataChange, saveFooterStyle };
};
