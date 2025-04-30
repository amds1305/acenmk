
import { supabase } from "@/lib/supabase";
import { TeamMember } from '@/components/admin/team/types';

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des membres de l\'équipe:', error);
    throw error;
  }

  return data || [];
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Erreur lors de la récupération du membre d'équipe ${id}:`, error);
    if (error.code === 'PGRST116') { // "No rows found" error code
      return null;
    }
    throw error;
  }

  return data;
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .insert([member])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du membre d\'équipe:', error);
    throw error;
  }

  return data;
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .update(member)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour du membre d'équipe ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression du membre d'équipe ${id}:`, error);
    throw error;
  }
}
