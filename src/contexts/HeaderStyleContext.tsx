
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define header style type
interface HeaderStyle {
  textColor?: string;
  activeColor?: string;
  hoverColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textTransform?: string;
  menuHoverBgColor?: string;
  menuActiveBgColor?: string;
  menuBorderRadius?: string;
  menuTransition?: string;
  socialIconColor?: string;
  socialIconBgColor?: string;
  socialIconBorderColor?: string;
  socialIconHoverColor?: string;
  socialIconSize?: string;
  socialIconSpacing?: string;
  utilityIconColor?: string;
  utilityIconBgColor?: string;
  utilityIconBorderColor?: string;
  utilityIconHoverColor?: string;
  utilityIconSize?: string;
  transitionDuration?: string;
  transitionTiming?: string;
  showThemeSelector?: boolean;
}

interface HeaderStyleContextType {
  headerStyle: HeaderStyle;
  setHeaderStyle: (style: HeaderStyle) => void;
}

const HeaderStyleContext = createContext<HeaderStyleContextType>({
  headerStyle: {},
  setHeaderStyle: () => {}
});

export const useHeaderStyle = () => useContext(HeaderStyleContext);

export const HeaderStyleProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>({
    textColor: '#111827',
    activeColor: '#3B82F6',
    hoverColor: '#3B82F6',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: 'normal',
    textTransform: 'none',
    menuHoverBgColor: 'rgba(59, 130, 246, 0.05)',
    menuActiveBgColor: 'rgba(59, 130, 246, 0.05)',
    menuBorderRadius: '0.375rem',
    menuTransition: 'all 0.3s ease',
    socialIconColor: '#6B7280',
    socialIconBgColor: 'transparent',
    socialIconBorderColor: '#e5e7eb',
    socialIconHoverColor: '#3B82F6',
    socialIconSize: '18px',
    socialIconSpacing: '0.75rem',
    utilityIconColor: '#6B7280',
    utilityIconBgColor: 'transparent',
    utilityIconBorderColor: '#e5e7eb',
    utilityIconHoverColor: '#3B82F6',
    utilityIconSize: '18px',
    transitionDuration: '0.3s',
    transitionTiming: 'ease',
    showThemeSelector: true
  });

  useEffect(() => {
    // Dispatch an event when header style is updated
    const event = new CustomEvent('header-style-updated');
    window.dispatchEvent(event);
  }, [headerStyle]);

  return (
    <HeaderStyleContext.Provider value={{ headerStyle, setHeaderStyle }}>
      {children}
    </HeaderStyleContext.Provider>
  );
};
