
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface HeaderContextProps {
  headerConfig: any;
  headerStyle: any;
}

interface HeaderContextProviderProps {
  children: ReactNode;
}

const HeaderContext = createContext<HeaderContextProps | null>(null);

export const useHeaderContext = () => useContext(HeaderContext);

// Make sure to export the custom hook
export const useHeader = () => {
  // Get header data from context
  const headerContext = useHeaderContext();
  
  // Default values for navigation links if not available from context
  const defaultNavLinks = [
    { id: 'home', name: 'Accueil', href: '/', is_visible: true },
    { id: 'services', name: 'Services', href: '/#services', is_visible: true },
    { id: 'about', name: 'À propos', href: '/#about', is_visible: true },
    { id: 'contact', name: 'Contact', href: '/#contact', is_visible: true },
  ];
  
  const navLinks = headerContext?.headerConfig?.navLinks || defaultNavLinks;
  const socialLinks = headerContext?.headerConfig?.socialLinks || [];
  const headerStyle = headerContext?.headerStyle || {};

  return {
    navLinks,
    socialLinks,
    headerStyle,
    headerConfig: headerContext?.headerConfig || {},
  };
};

export const HeaderProvider: React.FC<HeaderContextProviderProps> = ({ children }) => {
  const [headerConfig] = useState({
    navLinks: [
      { id: 'home', name: 'Accueil', href: '/', is_visible: true },
      { id: 'services', name: 'Services', href: '/#services', is_visible: true },
      { id: 'about', name: 'À propos', href: '/#about', is_visible: true },
      { id: 'contact', name: 'Contact', href: '/#contact', is_visible: true },
    ],
    socialLinks: [],
    showThemeSelector: true
  });

  const [headerStyle] = useState({
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
  });
  
  return (
    <HeaderContext.Provider value={{ headerConfig, headerStyle }}>
      {children}
    </HeaderContext.Provider>
  );
};
