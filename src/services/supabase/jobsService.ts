
import { supabase } from "@/lib/supabase";

export type JobType = 'full-time' | 'part-time' | 'remote' | 'hybrid';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  posted_date: string;
  created_at: string;
  updated_at: string;
}

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_date', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des offres d\'emploi:', error);
    throw error;
  }

  return data || [];
}

export async function getJob(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Erreur lors de la récupération de l'offre d'emploi ${id}:`, error);
    if (error.code === 'PGRST116') { // "No rows found" error code
      return null;
    }
    throw error;
  }

  return data;
}

export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert([job])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de l\'offre d\'emploi:', error);
    throw error;
  }

  return data;
}

export async function updateJob(id: string, job: Partial<Job>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour de l'offre d'emploi ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression de l'offre d'emploi ${id}:`, error);
    throw error;
  }
}
