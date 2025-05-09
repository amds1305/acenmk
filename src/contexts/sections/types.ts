
import { HomepageConfig, Section, SectionType, SectionData } from '@/types/sections';

export interface SectionsContextProps {
  config: HomepageConfig;
  isLoading: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  saveStatus?: 'idle' | 'saving' | 'success' | 'error';
  addNewSection: (type: SectionType, title: string, options?: ExternalLinkOptions) => Promise<void>;
  removeExistingSection: (id: string) => Promise<void>;
  reorderExistingSections: (orderedIds: string[]) => Promise<void>;
  updateSectionVisibility: (id: string, visible: boolean) => Promise<void>;
  updateExistingSectionData: (sectionId: string, data: SectionData) => Promise<void>;
  updateExistingSection: (sectionId: string, updates: Partial<Section>) => Promise<void>;
  updateTemplateType: (templateType: string) => Promise<void>;
  saveChanges: () => Promise<void>;
  reloadConfig: () => Promise<void>;
}

export interface ExternalLinkOptions {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  openInNewTab?: boolean;
}
