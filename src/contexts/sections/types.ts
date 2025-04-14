
import { HomepageConfig, Section, SectionData, SectionType, HomeTemplateType } from '@/types/sections';

export interface SectionsContextProps {
  config: HomepageConfig;
  isLoading: boolean;
  addNewSection: (type: SectionType, title: string) => Promise<void>;
  removeExistingSection: (id: string) => Promise<void>;
  reorderExistingSections: (orderedIds: string[]) => Promise<void>;
  updateSectionVisibility: (id: string, visible: boolean) => Promise<void>;
  updateExistingSectionData: (sectionId: string, data: SectionData) => Promise<void>;
  updateExistingSection: (sectionId: string, updates: Partial<Section>) => Promise<void>;
  updateTemplateType: (templateType: HomeTemplateType) => Promise<void>;
  saveChanges: () => Promise<void>;
  reloadConfig: () => Promise<void>;
}
