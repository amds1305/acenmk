
import { supabase } from "@/lib/supabase";
import { CV } from "@/components/acejob/cv-library/types";

export async function getCVs(): Promise<CV[]> {
  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .order('upload_date', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des CVs:', error);
    throw error;
  }

  // Transformer les données pour correspondre au format CV attendu
  return data?.map(item => ({
    id: item.id,
    candidateName: item.candidate_name,
    email: item.email,
    phone: item.phone,
    title: item.title,
    uploadDate: item.upload_date,
    skills: item.skills,
    experience: item.experience,
    education: item.education,
    tags: item.tags,
    rating: item.rating,
    lastInteraction: item.last_interaction
  })) || [];
}

export async function createCV(cv: Omit<CV, 'id'>): Promise<CV> {
  // Transformer les données pour correspondre au schéma de la base de données
  const dbCV = {
    candidate_name: cv.candidateName,
    email: cv.email,
    phone: cv.phone,
    title: cv.title,
    upload_date: cv.uploadDate,
    skills: cv.skills,
    experience: cv.experience,
    education: cv.education,
    tags: cv.tags,
    rating: cv.rating,
    last_interaction: cv.lastInteraction
  };

  const { data, error } = await supabase
    .from('cvs')
    .insert([dbCV])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du CV:', error);
    throw error;
  }

  // Transformer la réponse pour correspondre au format CV attendu
  return {
    id: data.id,
    candidateName: data.candidate_name,
    email: data.email,
    phone: data.phone,
    title: data.title,
    uploadDate: data.upload_date,
    skills: data.skills,
    experience: data.experience,
    education: data.education,
    tags: data.tags,
    rating: data.rating,
    lastInteraction: data.last_interaction
  };
}

export async function updateCV(id: string, cv: Partial<CV>): Promise<CV> {
  // Transformer les données pour correspondre au schéma de la base de données
  const dbCV: any = {};
  
  if (cv.candidateName !== undefined) dbCV.candidate_name = cv.candidateName;
  if (cv.email !== undefined) dbCV.email = cv.email;
  if (cv.phone !== undefined) dbCV.phone = cv.phone;
  if (cv.title !== undefined) dbCV.title = cv.title;
  if (cv.uploadDate !== undefined) dbCV.upload_date = cv.uploadDate;
  if (cv.skills !== undefined) dbCV.skills = cv.skills;
  if (cv.experience !== undefined) dbCV.experience = cv.experience;
  if (cv.education !== undefined) dbCV.education = cv.education;
  if (cv.tags !== undefined) dbCV.tags = cv.tags;
  if (cv.rating !== undefined) dbCV.rating = cv.rating;
  if (cv.lastInteraction !== undefined) dbCV.last_interaction = cv.lastInteraction;

  const { data, error } = await supabase
    .from('cvs')
    .update(dbCV)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour du CV ${id}:`, error);
    throw error;
  }

  // Transformer la réponse pour correspondre au format CV attendu
  return {
    id: data.id,
    candidateName: data.candidate_name,
    email: data.email,
    phone: data.phone,
    title: data.title,
    uploadDate: data.upload_date,
    skills: data.skills,
    experience: data.experience,
    education: data.education,
    tags: data.tags,
    rating: data.rating,
    lastInteraction: data.last_interaction
  };
}

export async function deleteCV(id: string): Promise<void> {
  const { error } = await supabase
    .from('cvs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erreur lors de la suppression du CV ${id}:`, error);
    throw error;
  }
}
