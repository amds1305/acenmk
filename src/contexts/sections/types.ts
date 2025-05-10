
import { HomepageConfig, Section, SectionData, HomeTemplateType } from "@/types/sections";

export interface SectionsStateProps {
  config: HomepageConfig;
  setConfig: (config: HomepageConfig) => void;
  isLoading: boolean;
  loadConfig: () => Promise<void>;
  isRefetching: boolean;
  isError: boolean;
}

export interface SectionsContextProps {
  config: HomepageConfig;
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  addNewSection: (section: Section) => void;
  removeExistingSection: (sectionId: string) => void;
  updateSectionOrder: (updatedSections: Section[]) => void;
  updateSectionVisibility: (sectionId: string, isVisible: boolean) => void;
  updateExistingSectionData: (sectionId: string, data: SectionData) => void;
  updateExistingSection: (section: Section) => void;
  updateTemplateType: (template: HomeTemplateType) => void;
  saveChanges: () => Promise<void>;
  reloadConfig: () => Promise<void>;
}

// Interface pour les options de liens externes
export interface ExternalLinkOptions {
  externalUrl?: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
}
