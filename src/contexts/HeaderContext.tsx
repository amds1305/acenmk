
import React, { createContext, useContext, ReactNode } from 'react';
import { useHeader } from '@/components/header/useHeader';

interface HeaderContextProviderProps {
  children: ReactNode;
}

const HeaderContext = createContext<any>({});

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider: React.FC<HeaderContextProviderProps> = ({ children }) => {
  const headerData = useHeader();
  
  return (
    <HeaderContext.Provider value={headerData}>
      {children}
    </HeaderContext.Provider>
  );
};
