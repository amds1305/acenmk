
import { supabase } from "@/lib/supabase";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  template: string;
  order_index: number;
  created_at: string;
}

export async function getFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des FAQs:', error);
    throw error;
  }

  return data || [];
}

export async function createFaq(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ> {
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

export async function updateFaq(id: string, faq: Partial<FAQ>): Promise<FAQ> {
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

export async function deleteFaq(id: string): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression de la FAQ ${id}:`, error);
    throw error;
  }
}
