
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { NavLink, SocialLink } from './types';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface DesktopNavProps {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  toggleSearch: () => void;
  themeSelector: React.ReactNode;
}

const DesktopNav = ({ navLinks, socialLinks, toggleSearch, themeSelector }: DesktopNavProps) => {
  const location = useLocation();
  
  // Fonction pour vérifier si un lien est actif
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    
    return location.pathname.startsWith(href);
  };
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      {/* Navigation Links */}
      <nav className="flex items-center space-x-2">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "menu-item",
              isActive(link.href) && "menu-item-active"
            )}
          >
            {link.name}
          </a>
        ))}
      </nav>
      
      {/* Social & Action Links */}
      <div className="flex items-center gap-4">
        {/* Social Links */}
        <div className="flex items-center space-x-3">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
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
          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9"
        >
          <Search size={18} />
          <span className="sr-only">Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
