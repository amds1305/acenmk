
import { HomepageConfig, Section, SectionType } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';
import { saveHomepageConfig } from './saveConfig';

// Function to add a section
export const addSection = async (
  config: HomepageConfig, 
  type: SectionType, 
  title: string
): Promise<HomepageConfig> => {
  const id = type === 'custom' ? uuidv4() : `${type}-${uuidv4().slice(0, 8)}`;
  const maxOrder = Math.max(...config.sections.map(s => s.order), 0);
  
  const newSection: Section = {
    id,
    type,
    title,
    visible: true,
    order: maxOrder + 1,
    ...(type === 'custom' && { customComponent: '' }),
  };
  
  const updatedConfig = {
    ...config,
    sections: [...config.sections, newSection]
  };
  
  await saveHomepageConfig(updatedConfig);
  return updatedConfig;
};

// Function to remove a section
export const removeSection = async (
  config: HomepageConfig, 
  id: string
): Promise<HomepageConfig> => {
  const updatedSections = config.sections.filter(section => section.id !== id);
  const { [id]: _, ...remainingSectionData } = config.sectionData;
  
  const updatedConfig = {
    ...config,
    sections: updatedSections,
    sectionData: remainingSectionData
  };
  
  await saveHomepageConfig(updatedConfig);
  return updatedConfig;
};
