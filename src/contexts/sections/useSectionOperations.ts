
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Section } from '../sections/types';
import { toast } from '@/hooks/use-toast';

export const useSectionOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateExistingSection = async (sectionId: string, updates: Partial<Section>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('sections')
        .update(updates)
        .eq('id', sectionId);

      if (error) throw error;

      // Déclencher un événement pour notifier les autres composants
      window.dispatchEvent(new CustomEvent('admin-changes-saved', {
        detail: { type: 'section-updated', sectionId, updates }
      }));

      return data;
    } catch (err) {
      console.error('Error updating section:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingSectionData = async (sectionId: string, data: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('section_data')
        .update({ data, updated_at: new Date() })
        .eq('section_id', sectionId);

      if (error) throw error;

      // Déclencher un événement pour notifier les autres composants
      window.dispatchEvent(new CustomEvent('admin-changes-saved', {
        detail: { type: 'section-data-updated', sectionId, data }
      }));

      return true;
    } catch (err) {
      console.error('Error updating section data:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveChanges = async () => {
    try {
      // Déclencher un événement pour forcer le rechargement
      window.dispatchEvent(new CustomEvent('admin-changes-saved', {
        detail: { type: 'save-all', timestamp: Date.now() }
      }));
      
      // Montrer une notification
      toast({
        title: "Sauvegarde réussie",
        description: "Les modifications ont été enregistrées et seront visibles sur le site.",
      });
      
      return true;
    } catch (err) {
      console.error('Error saving all changes:', err);
      setError(err as Error);
      
      // Montrer une notification d'erreur
      toast({
        title: "Erreur de sauvegarde",
        description: "Une erreur est survenue lors de la sauvegarde des modifications.",
        variant: "destructive"
      });
      
      throw err;
    }
  };

  return {
    isLoading,
    error,
    updateExistingSection,
    updateExistingSectionData,
    saveChanges
  };
};
