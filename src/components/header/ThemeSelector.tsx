
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useHeaderContext } from '@/contexts/HeaderContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const headerContext = useHeaderContext();
  const headerStyle = headerContext?.headerStyle || {};
  
  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Styles personnalisés pour les icônes d'utilité
  const utilityIconStyle = {
    color: headerStyle?.utilityIconColor,
    backgroundColor: headerStyle?.utilityIconBgColor,
    borderColor: headerStyle?.utilityIconBorderColor,
  };
  
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 hover-scale"
      aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
      style={utilityIconStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.color = headerStyle?.utilityIconHoverColor;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = headerStyle?.utilityIconColor;
      }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeSelector;
