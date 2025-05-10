
import React from 'react';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeaderContext } from '@/contexts/HeaderContext';

interface MobileNavProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleTheme: () => void;
  toggleSearch: () => void;
  theme: string;
  showThemeSelector?: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  toggleTheme,
  toggleSearch,
  theme,
  showThemeSelector = true
}) => {
  const { headerStyle } = useHeaderContext();
  
  // Styles personnalisés pour les icônes d'utilité
  const utilityIconStyle = {
    color: headerStyle?.utilityIconColor,
    backgroundColor: headerStyle?.utilityIconBgColor,
    borderColor: headerStyle?.utilityIconBorderColor,
  };
  
  return (
    <div className="md:hidden flex items-center space-x-3">
      {showThemeSelector && (
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 hover-scale"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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
      )}
      
      <Button
        onClick={toggleSearch}
        variant="ghost"
        size="icon"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 hover-scale"
        aria-label="Search"
        style={utilityIconStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.color = headerStyle?.utilityIconHoverColor;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = headerStyle?.utilityIconColor;
        }}
      >
        <Search size={18} />
      </Button>
      
      <Button 
        variant="ghost"
        size="icon"
        onClick={toggleMobileMenu}
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors hover-scale"
        aria-label="Toggle Menu"
        style={utilityIconStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.color = headerStyle?.utilityIconHoverColor;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = headerStyle?.utilityIconColor;
        }}
      >
        {mobileMenuOpen ? 
          <X size={24} className="animate-fade-in" /> : 
          <Menu size={24} className="animate-fade-in" />
        }
      </Button>
    </div>
  );
};

export default MobileNav;
