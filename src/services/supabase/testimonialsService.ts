
import { supabase } from "@/lib/supabase";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  image?: string | null;
  content: string;
  rating: number;
  created_at: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('rating', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    throw error;
  }

  return data || [];
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du témoignage:', error);
    throw error;
  }

  return data;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour du témoignage ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression du témoignage ${id}:`, error);
    throw error;
  }
}
