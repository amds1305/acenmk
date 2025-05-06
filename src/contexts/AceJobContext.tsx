
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AceJobContextType {
  // Basic state needed for AceJob functionality
  selectedCandidates: string[];
  filters: {
    skills: string[];
    experience: string[];
    location: string[];
  };
  // Actions
  toggleCandidateSelection: (candidateId: string) => void;
  updateFilters: (filterType: string, values: string[]) => void;
  clearFilters: () => void;
}

const initialState: AceJobContextType = {
  selectedCandidates: [],
  filters: {
    skills: [],
    experience: [],
    location: [],
  },
  toggleCandidateSelection: () => {},
  updateFilters: () => {},
  clearFilters: () => {},
};

const AceJobContext = createContext<AceJobContextType>(initialState);

export const useAceJob = () => {
  const context = useContext(AceJobContext);
  if (!context) {
    throw new Error('useAceJob must be used within an AceJobProvider');
  }
  return context;
};

export const AceJobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    skills: [],
    experience: [],
    location: [],
  });

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const updateFilters = (filterType: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const clearFilters = () => {
    setFilters({
      skills: [],
      experience: [],
      location: [],
    });
  };

  const value = {
    selectedCandidates,
    filters,
    toggleCandidateSelection,
    updateFilters,
    clearFilters
  };

  return (
    <AceJobContext.Provider value={value}>
      {children}
    </AceJobContext.Provider>
  );
};

export default AceJobContext;
