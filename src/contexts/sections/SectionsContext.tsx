
import React, { createContext, useContext } from 'react';
import { useSectionsState } from './useSectionsState';
import { useSectionOperations } from './useSectionOperations';
import { useTemplateOperations } from './useTemplateOperations';
import { SectionsContextProps } from './types';
import { useAdminNotification } from '@/hooks/use-admin-notification';

const SectionsContext = createContext<SectionsContextProps | undefined>(undefined);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config, setConfig, isLoading, loadConfig, isRefetching, isError } = useSectionsState();
  const { saveStatus, setSaveStatus } = useAdminNotification();
  
  const { 
    addNewSection,
    removeExistingSection,
    reorderExistingSections,
    updateSectionVisibility,
    updateExistingSectionData,
    updateExistingSection
  } = useSectionOperations(config, setConfig);
  
  const { updateTemplateType, saveChanges } = useTemplateOperations(config, setConfig);

  const value: SectionsContextProps = {
    config,
    isLoading,
    isRefetching,
    isError,
    saveStatus,
    addNewSection,
    removeExistingSection,
    reorderExistingSections,
    updateSectionVisibility,
    updateExistingSectionData,
    updateExistingSection,
    updateTemplateType,
    saveChanges,
    reloadConfig: loadConfig
  };

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionsProvider');
  }
  return context;
};
