
import React from 'react';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';

interface MobileNavProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleTheme: () => void;
  toggleSearch: () => void;
  theme: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  toggleTheme,
  toggleSearch,
  theme
}) => {
  return (
    <div className="md:hidden flex items-center space-x-3">
      <button
        onClick={toggleTheme}
        className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      
      <button
        onClick={toggleSearch}
        className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
      
      <button 
        className="flex items-center justify-center"
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? 
          <X size={24} className="text-theme-navy dark:text-white" /> : 
          <Menu size={24} className="text-theme-navy dark:text-white" />
        }
      </button>
    </div>
  );
};

export default MobileNav;
