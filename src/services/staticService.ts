
import { homePageData } from '@/data/staticData';

export const getHomepageConfig = async () => {
  // Simulation d'un appel API avec un délai artificiel
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

export const getSectionData = async (sectionId: string) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const section = homePageData.sections.find(s => s.id === sectionId);
  return section?.data || null;
};
