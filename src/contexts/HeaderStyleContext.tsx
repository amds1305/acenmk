
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HeaderStyleConfig } from '@/services/supabase/headerService';

interface HeaderStyleContextType {
  headerStyle: HeaderStyleConfig;
  setHeaderStyle: React.Dispatch<React.SetStateAction<HeaderStyleConfig>>;
}

const HeaderStyleContext = createContext<HeaderStyleContextType | null>(null);

export const useHeaderStyle = () => {
  const context = useContext(HeaderStyleContext);
  if (!context) {
    return {
      headerStyle: defaultHeaderStyle,
      setHeaderStyle: () => console.warn('HeaderStyleContext not initialized')
    };
  }
  return context;
};

const defaultHeaderStyle: HeaderStyleConfig = {
  transparent: true,
  sticky: true,
  glassmorphism: true,
  border_bottom: false,
  drop_shadow: true,
  background_color: 'rgba(255, 255, 255, 0)',
  text_color: '#ffffff',
  border_color: 'rgba(255, 255, 255, 0.1)',
  scrolled_bg_color: 'rgba(255, 255, 255, 0.9)',
  scrolled_text_color: '#111827',
  scrolled_border_color: 'rgba(229, 231, 235, 1)',
  scrolled_shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  padding: '1rem',
};

export const HeaderStyleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyleConfig>(defaultHeaderStyle);

  return (
    <HeaderStyleContext.Provider value={{ headerStyle, setHeaderStyle }}>
      {children}
    </HeaderStyleContext.Provider>
  );
};
