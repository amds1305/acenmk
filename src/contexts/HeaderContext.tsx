
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeaderConfig } from '@/services/supabase/headerService';

interface HeaderContextType {
  headerConfig: any;
  headerStyle: any;
  isLoading: boolean;
  error: any;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export const useHeader = () => {
  const context = useContext(HeaderContext);
  
  if (!context) {
    console.warn("HeaderContext is being used outside its provider!");
    return {
      navLinks: [],
      socialLinks: [],
      headerStyle: {},
      headerConfig: {},
      isLoading: false
    };
  }
  
  return context;
};

export const useHeaderContext = useHeader;

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerConfig, setHeaderConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    const fetchHeaderConfig = async () => {
      try {
        const config = await getHeaderConfig();
        setHeaderConfig(config);
      } catch (err) {
        console.error("Error loading header configuration:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHeaderConfig();
  }, []);
  
  return (
    <HeaderContext.Provider 
      value={{
        headerConfig,
        headerStyle: headerConfig?.style || {},
        isLoading,
        error
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
