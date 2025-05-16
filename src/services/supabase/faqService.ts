
// Static implementation of FAQ service
import { homePageData } from '@/data/staticData';

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export const getFAQs = async (section: string = 'default'): Promise<Faq[]> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner les FAQ statiques
  return homePageData.faqItems || [];
};
