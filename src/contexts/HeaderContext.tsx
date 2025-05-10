
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHeaderConfig } from '@/services/supabase/headerService';
import { HeaderStyle } from '@/components/admin/header/types';

interface HeaderContextType {
  headerStyle: HeaderStyle | undefined;
  isLoading: boolean;
  error: Error | null;
}

const HeaderContext = createContext<HeaderContextType>({
  headerStyle: undefined,
  isLoading: true,
  error: null
});

export const useHeaderContext = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadHeaderConfig = async () => {
      try {
        setIsLoading(true);
        const { headerStyle } = await getHeaderConfig();
        if (headerStyle) {
          setHeaderStyle(headerStyle);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de la configuration du header:', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadHeaderConfig();

    // Écouter les mises à jour de la configuration du header
    const handleHeaderConfigUpdated = () => {
      loadHeaderConfig();
    };

    window.addEventListener('header-config-updated', handleHeaderConfigUpdated);

    return () => {
      window.removeEventListener('header-config-updated', handleHeaderConfigUpdated);
    };
  }, []);

  return (
    <HeaderContext.Provider value={{ headerStyle, isLoading, error }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;
