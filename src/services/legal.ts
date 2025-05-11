
import { supabase } from '@/lib/supabase';

/**
 * Récupère le contenu légal par type
 */
export const getLegalContent = async (type: string): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('legal_contents')
      .select('content')
      .eq('type', type)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération du contenu légal:', error);
      return '';
    }

    return data?.content || '';
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return '';
  }
};

/**
 * Met à jour le contenu légal
 */
export const updateLegalContent = async (type: string, content: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('legal_contents')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('type', type);

    if (error) {
      console.error('Erreur lors de la mise à jour du contenu légal:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return false;
  }
};
