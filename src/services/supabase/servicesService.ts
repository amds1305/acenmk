
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return [];
  }
};

export const saveService = async (service: Omit<ServiceItem, 'id'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return data?.id || null;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du service:', error);
    return null;
  }
};

export const updateService = async (service: ServiceItem): Promise<boolean> => {
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

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du service:', error);
    return false;
  }
};

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return false;
  }
};

export const updateServicesOrder = async (services: ServiceItem[]): Promise<boolean> => {
  try {
    // Mise à jour en masse des index d'ordre
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
};
