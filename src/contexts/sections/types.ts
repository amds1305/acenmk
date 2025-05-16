
import { Section } from "@/types/sections";

export interface SectionsStateProps {
  config: any;
  setConfig: (config: any) => void;
  isLoading: boolean;
  loadConfig: () => Promise<void>;
  isRefetching: boolean;
  isError: boolean;
}

export interface SectionsContextProps {
  config: any;
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  addNewSection: (section: Section) => void;
  removeExistingSection: (sectionId: string) => void;
  updateSectionOrder: (updatedSections: Section[]) => void;
  updateSectionVisibility: (sectionId: string, isVisible: boolean) => void;
  updateExistingSectionData: (sectionId: string, data: any) => void;
  updateExistingSection: (section: Section) => void;
  updateTemplateType: (template: string) => void;
  saveChanges: () => Promise<void>;
  reloadConfig: () => Promise<void>;
}

// Interface pour les options de liens externes
export interface ExternalLinkOptions {
  externalUrl?: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
}
