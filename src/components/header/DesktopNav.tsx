
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
  showThemeSelector?: boolean;
}

const DesktopNav = ({ 
  navLinks, 
  socialLinks, 
  toggleSearch, 
  themeSelector,
  showThemeSelector = true 
}: DesktopNavProps) => {
  const location = useLocation();
  
  // Log to debug visibility of social links
  console.log('DesktopNav rendering with social links:', socialLinks);
  
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
      <nav className="flex items-center space-x-3 overflow-x-auto max-w-[40vw] no-scrollbar">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "menu-item group py-2 px-3 rounded-md text-sm font-medium transition-all relative whitespace-nowrap",
              isActive(link.href) 
                ? "text-primary dark:text-primary bg-primary/5 font-semibold" 
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5"
            )}
          >
            {link.name}
            <span className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transform transition-all duration-300",
              isActive(link.href) ? "w-8" : "w-0 group-hover:w-8"
            )} />
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
              className="social-icon hover-scale"
              aria-label={link.ariaLabel}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
        
        {/* Theme Selector */}
        {showThemeSelector && themeSelector}
        
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSearch}
          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 hover-scale"
        >
          <Search size={18} />
          <span className="sr-only">Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
