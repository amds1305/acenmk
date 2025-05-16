
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHomepageConfig } from '@/services/staticService';
import { Section } from '@/types/sections';

interface SectionsContextType {
  sections: Section[];
  isLoading: boolean;
  error: Error | null;
  refetchSections: () => Promise<void>;
}

const SectionsContext = createContext<SectionsContextType>({
  sections: [],
  isLoading: true,
  error: null,
  refetchSections: async () => {},
});

export const useSections = () => useContext(SectionsContext);

interface SectionsProviderProps {
  children: ReactNode;
}

export const SectionsProvider: React.FC<SectionsProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const config = await getHomepageConfig();
      if (config?.sections) {
        setSections(config.sections);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch sections'));
      console.error('Error fetching sections:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <SectionsContext.Provider
      value={{
        sections,
        isLoading,
        error,
        refetchSections: fetchSections,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};
