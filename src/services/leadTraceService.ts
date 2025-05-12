
import { supabase } from '@/lib/supabase';
import { ContactRequest } from '@/types/contact';
import { Lead } from '@/types/lead';

/**
 * Convertit une demande de contact en lead
 */
export const convertContactToLead = async (contact: ContactRequest): Promise<string | null> => {
  try {
    // Préparation des données du lead
    const leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'> = {
      name: `${contact.prenom} ${contact.nom}`,
      email: contact.email,
      phone: contact.telephone || undefined,
      company: contact.entreprise || undefined,
      website: contact.site_web || undefined,
      service: contact.service_requis || undefined,
      source: contact.origine || 'Formulaire de contact',
      description: contact.description,
      status: 'new',
      tags: [],
      assignedTo: undefined,
    };

    // Enregistrement dans la base de données
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select('id')
      .single();

    if (error) {
      console.error('Erreur lors de la conversion du contact en lead:', error);
      return null;
    }

    // Mise à jour du contact pour indiquer qu'il a été converti
    await supabase
      .from('contact_requests')
      .update({ converted_to_lead: true, lead_id: data.id })
      .eq('id', contact.id);

    return data.id;
  } catch (error) {
    console.error('Erreur lors de la conversion du contact en lead:', error);
    return null;
  }
};

/**
 * Récupère tous les leads depuis la base de données
 */
export const fetchLeads = async (): Promise<Lead[]> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des leads:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des leads:', error);
    return [];
  }
};

/**
 * Récupère un lead spécifique par son ID
 */
export const fetchLeadById = async (leadId: string): Promise<Lead | null> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (error) {
      console.error(`Erreur lors de la récupération du lead ${leadId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du lead ${leadId}:`, error);
    return null;
  }
};

/**
 * Récupère les interactions d'un lead
 */
export const fetchLeadInteractions = async (leadId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('lead_interactions')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des interactions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des interactions:', error);
    return [];
  }
};

/**
 * Met à jour le statut d'un lead
 */
export const updateLeadStatus = async (leadId: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', leadId);

    if (error) {
      console.error('Erreur lors de la mise à jour du statut du lead:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut du lead:', error);
    return false;
  }
};

/**
 * Met à jour les informations d'un lead
 */
export const updateLead = async (leadId: string, leadData: Partial<Lead>): Promise<boolean> => {
  try {
    // Ajouter la date de mise à jour
    const dataToUpdate = {
      ...leadData,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('leads')
      .update(dataToUpdate)
      .eq('id', leadId);

    if (error) {
      console.error('Erreur lors de la mise à jour du lead:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du lead:', error);
    return false;
  }
};

/**
 * Ajoute une interaction à un lead
 */
export const addLeadInteraction = async (leadId: string, type: string, content: string, userName: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('lead_interactions')
      .insert({
        lead_id: leadId,
        type,
        content,
        user_name: userName,
      });

    if (error) {
      console.error("Erreur lors de l'ajout d'une interaction:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une interaction:", error);
    return false;
  }
};

/**
 * Supprime un lead et ses interactions associées
 */
export const deleteLead = async (leadId: string): Promise<boolean> => {
  try {
    // Les interactions seront automatiquement supprimées grâce à la contrainte ON DELETE CASCADE
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);

    if (error) {
      console.error('Erreur lors de la suppression du lead:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du lead:', error);
    return false;
  }
};
