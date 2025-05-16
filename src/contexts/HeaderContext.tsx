
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHeaderConfig } from '@/services/staticService';

// Types simplifiés pour le header
interface HeaderLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface NavLink {
  id: string;
  name: string;
  href: string;
  is_visible: boolean;
}

interface HeaderConfig {
  logo: HeaderLogo;
  navLinks: NavLink[];
}

interface HeaderContextType {
  headerConfig: HeaderConfig | null;
  isLoading: boolean;
  error: Error | null;
  refetchHeader: () => Promise<void>;
}

const HeaderContext = createContext<HeaderContextType>({
  headerConfig: null,
  isLoading: true,
  error: null,
  refetchHeader: async () => {},
});

export const useHeader = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHeader = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const config = await getHeaderConfig();
      setHeaderConfig(config);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch header configuration'));
      console.error('Error fetching header:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        headerConfig,
        isLoading,
        error,
        refetchHeader: fetchHeader,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
