
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleTheme: () => void;
  toggleSearch: () => void;
  theme: string;
  showThemeSelector?: boolean;
}

const MobileNav = ({
  mobileMenuOpen,
  toggleMobileMenu,
  toggleTheme,
  toggleSearch,
  theme,
  showThemeSelector = true
}: MobileNavProps) => {
  return (
    <div className="flex md:hidden items-center">
      {/* Theme Toggle */}
      {showThemeSelector && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="mr-2 hover-scale"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      )}
      
      {/* Mobile Menu Button */}
      <Button
        onClick={toggleMobileMenu}
        variant="ghost"
        size="icon"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        className="hover-scale"
      >
        {mobileMenuOpen ? (
          <X className={cn("h-5 w-5 transition-all", mobileMenuOpen ? "rotate-90" : "rotate-0")} />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default MobileNav;
