
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { NavLink, SocialLink } from './types';

interface DesktopNavProps {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  toggleSearch: () => void;
  themeSelector: React.ReactNode;
}

const DesktopNav = ({ navLinks, socialLinks, toggleSearch, themeSelector }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-700 dark:text-gray-200 hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors text-sm font-medium"
          >
            {link.name}
          </a>
        ))}
      </nav>
      
      {/* Social & Action Links */}
      <div className="flex items-center gap-3">
        {/* Social Links */}
        <div className="flex items-center space-x-2">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors"
              aria-label={link.ariaLabel}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
        
        {/* Theme Selector */}
        {themeSelector}
        
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSearch}
          className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full w-9 h-9"
        >
          <Search size={18} />
          <span className="sr-only">Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
