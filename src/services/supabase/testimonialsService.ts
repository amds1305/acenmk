
// Static implementation of testimonials service
import { homePageData } from '@/data/staticData';

export interface Testimonial {
  id?: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
  content: string;
  rating?: number;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner les témoignages statiques
  return homePageData.testimonials || [];
};
