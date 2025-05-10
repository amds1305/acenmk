
import { supabase } from "@/lib/supabase";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

// Alias pour la compatibilité avec le composant AdminServices.tsx
export type ServiceItem = Service;

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

export async function saveService(service: Omit<Service, 'id' | 'created_at'>): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select('id')
      .single();

    if (error) throw error;
    return data?.id || null;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du service:', error);
    return null;
  }
}

export async function updateService(service: Partial<Service> & { id: string }): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .update({
        title: service.title,
        description: service.description,
        icon: service.icon,
        order_index: service.order_index
      })
      .eq('id', service.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du service ${service.id}:`, error);
    return false;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du service ${id}:`, error);
    return false;
  }
}

export async function updateServicesOrder(services: Service[]): Promise<boolean> {
  try {
    // Mise à jour par lots de tous les services avec leur nouvel ordre
    for (const service of services) {
      const { error } = await supabase
        .from('services')
        .update({ order_index: service.order_index })
        .eq('id', service.id);
        
      if (error) throw error;
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'ordre des services:', error);
    return false;
  }
}
