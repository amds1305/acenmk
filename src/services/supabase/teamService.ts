
// Static implementation of team service
import { homePageData } from '@/data/staticData';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  delay?: number;
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner les membres de l'équipe statiques
  return homePageData.teamMembers || [];
};
