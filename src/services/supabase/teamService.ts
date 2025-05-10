
import { supabase } from "@/lib/supabase";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
  created_at: string;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*');

  if (error) {
    console.error('Erreur lors de la récupération des membres de l\'équipe:', error);
    throw error;
  }

  return data || [];
}

export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at'>): Promise<TeamMember> {
  const { data, error } = await supabase
    .from('team_members')
    .insert([member])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du membre de l\'équipe:', error);
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
    console.error(`Erreur lors de la mise à jour du membre de l'équipe ${id}:`, error);
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
    console.error(`Erreur lors de la suppression du membre de l'équipe ${id}:`, error);
    throw error;
  }
}
