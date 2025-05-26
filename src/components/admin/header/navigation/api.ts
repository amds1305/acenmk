
import { saveNavLinks, getHeaderConfig } from '@/services/supabase/headerService';
import { NavLink } from '../../header/types';

// Load navigation links from the database
export const loadNavLinks = async (): Promise<NavLink[]> => {
  try {
    const { navLinks: links } = await getHeaderConfig();
    return links && links.length > 0 ? links : [];
  } catch (error) {
    console.error('Error loading navigation links:', error);
    throw error;
  }
};

// Save navigation links to the database
export const saveNavLinksToDatabase = async (links: NavLink[]): Promise<boolean> => {
  try {
    const success = await saveNavLinks(links);
    return success;
  } catch (error) {
    console.error('Error saving navigation links:', error);
    throw error;
  }
};
