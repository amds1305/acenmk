
// Cette fichier remplace l'ancien service mysql par une version statique
import { homePageData } from "@/data/staticData";
import { HomepageConfig } from "@/types/sections";

export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    sections: homePageData.sections,
    header: homePageData.header
  };
};

export const getHeaderConfig = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return homePageData.header;
};
