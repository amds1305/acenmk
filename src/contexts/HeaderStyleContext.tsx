
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { getHeaderConfig, saveHeaderStyle } from '@/services/supabase/headerService';

interface HeaderStyleContextType {
  headerStyle: HeaderStyle;
  isLoading: boolean;
  error: Error | null;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
  saveChanges: () => Promise<boolean>;
  loadPreset: (preset: HeaderStyle) => void;
  resetToDefaults: () => void;
  availablePresets: { name: string; style: HeaderStyle }[];
}

// Valeurs par défaut du contexte
const defaultHeaderStyle: HeaderStyle = {
  backgroundColor: 'transparent',
  textColor: '#ffffff',
  hoverColor: '#f3f4f6',
  activeColor: '#e5e7eb',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '16px',
  padding: '1rem',
  sticky: true,
  transparent: true,
  glassmorphism: true,
  borderBottom: false,
  borderColor: '#e5e7eb',
  dropShadow: true,
  showThemeSelector: true,
  menuHoverBgColor: 'rgba(239, 246, 255, 0.15)',
  menuActiveBgColor: 'rgba(239, 246, 255, 0.1)',
  socialIconColor: '#6B7280',
  socialIconHoverColor: 'hsl(var(--primary))',
  socialIconBgColor: 'transparent',
  socialIconBorderColor: '#E5E7EB',
  utilityIconColor: '#6B7280',
  utilityIconHoverColor: 'hsl(var(--primary))',
  utilityIconBgColor: 'transparent',
  utilityIconBorderColor: '#E5E7EB',
  fontWeight: '500',
  letterSpacing: 'normal',
  textTransform: 'none',
  transitionDuration: '0.3s',
  transitionTiming: 'ease',
  menuTransition: 'all 0.3s ease',
  menuBorderRadius: '0.375rem',
  socialIconSize: '18px',
  socialIconSpacing: '0.75rem',
  utilityIconSize: '18px',
  scrolledBgColor: 'rgba(255, 255, 255, 0.8)',
  scrolledTextColor: '#333333',
  scrolledBorderColor: '#e5e7eb',
  scrolledShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
};

// Préréglages disponibles
const presets = [
  {
    name: 'Clair',
    style: {
      ...defaultHeaderStyle,
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      hoverColor: '#4b5563',
      activeColor: '#6b7280',
      borderBottom: true,
      transparent: false,
      glassmorphism: false,
    }
  },
  {
    name: 'Sombre',
    style: {
      ...defaultHeaderStyle,
      backgroundColor: '#111827',
      textColor: '#f9fafb',
      hoverColor: '#d1d5db',
      activeColor: '#9ca3af',
      borderBottom: false,
      transparent: false,
      glassmorphism: false,
    }
  },
  {
    name: 'Transparent',
    style: {
      ...defaultHeaderStyle,
    }
  },
  {
    name: 'Verre',
    style: {
      ...defaultHeaderStyle,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      textColor: '#ffffff',
      borderBottom: true,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      dropShadow: false,
    }
  }
];

const HeaderStyleContext = createContext<HeaderStyleContextType>({
  headerStyle: defaultHeaderStyle,
  isLoading: true,
  error: null,
  updateStyle: () => {},
  saveChanges: async () => false,
  loadPreset: () => {},
  resetToDefaults: () => {},
  availablePresets: presets,
});

export const useHeaderStyle = () => useContext(HeaderStyleContext);

interface HeaderStyleProviderProps {
  children: ReactNode;
}

export const HeaderStyleProvider: React.FC<HeaderStyleProviderProps> = ({ children }) => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(defaultHeaderStyle);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadHeaderStyle = async () => {
      try {
        setIsLoading(true);
        const config = await getHeaderConfig();
        
        if (config.headerStyle) {
          // S'assurer que tous les champs requis sont présents
          setHeaderStyle({
            ...defaultHeaderStyle,
            ...config.headerStyle
          });
        }
      } catch (err) {
        console.error('Erreur lors du chargement des styles d\'en-tête:', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadHeaderStyle();
  }, []);

  const updateStyle = <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => {
    setHeaderStyle(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveChanges = async (): Promise<boolean> => {
    try {
      const result = await saveHeaderStyle(headerStyle);
      if (result) {
        // Émettre un événement pour informer les autres composants de la mise à jour
        window.dispatchEvent(new CustomEvent('header-style-updated'));
      }
      return result;
    } catch (err) {
      console.error('Erreur lors de la sauvegarde des styles d\'en-tête:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      return false;
    }
  };

  const loadPreset = (preset: HeaderStyle) => {
    setHeaderStyle(prev => ({
      ...prev,
      ...preset,
    }));
  };

  const resetToDefaults = () => {
    setHeaderStyle(defaultHeaderStyle);
  };

  return (
    <HeaderStyleContext.Provider value={{
      headerStyle,
      isLoading,
      error,
      updateStyle,
      saveChanges,
      loadPreset,
      resetToDefaults,
      availablePresets: presets,
    }}>
      {children}
    </HeaderStyleContext.Provider>
  );
};

export default HeaderStyleContext;
