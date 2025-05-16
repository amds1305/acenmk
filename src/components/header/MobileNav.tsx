
import React from 'react';
import { Menu } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export interface MobileNavProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  showThemeSelector?: boolean;
  toggleTheme?: () => void;
  theme?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  toggleSearch,
  showThemeSelector,
}) => {
  return (
    <div className="flex items-center md:hidden">
      {showThemeSelector && <ThemeSelector />}
      <button
        onClick={toggleMobileMenu}
        className="p-2 ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileNav;
