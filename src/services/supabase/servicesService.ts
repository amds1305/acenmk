
import { supabase } from "@/lib/supabase";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des services:', error);
    throw error;
  }

  return data || [];
}

export async function createService(service: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du service:', error);
    throw error;
  }

  return data;
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour du service ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression du service ${id}:`, error);
    throw error;
  }
}
