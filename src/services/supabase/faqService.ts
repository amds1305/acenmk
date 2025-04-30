
import { supabase } from "@/lib/supabase";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  order_index: number;
  template: string;
  created_at: string;
}

export async function getFAQs(template: string = 'default'): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('template', template)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des FAQs:', error);
    throw error;
  }

  return data || [];
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .insert([faq])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de la FAQ:', error);
    throw error;
  }

  return data;
}

export async function updateFAQ(id: string, faq: Partial<FAQ>): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .update(faq)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour de la FAQ ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteFAQ(id: string): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression de la FAQ ${id}:`, error);
    throw error;
  }
}
