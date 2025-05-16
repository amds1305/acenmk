
// Static implementation of header service
import { homePageData } from '@/data/staticData';

export interface HeaderConfig {
  navLinks?: any[];
  socialLinks?: any[];
  showThemeSelector?: boolean;
  logo?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

export const getHeaderConfig = async (): Promise<HeaderConfig> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner le header statique
  return homePageData.header || {};
};

export const updateHeaderSettings = async (settings: any): Promise<any> => {
  console.log('Mock update header settings:', settings);
  return { success: true };
};
