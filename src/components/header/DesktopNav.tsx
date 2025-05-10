
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { NavLink, SocialLink } from './types';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { iconsMap } from '@/components/admin/header/iconsMap';
import { useHeaderContext } from '@/contexts/HeaderContext';

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
  const { headerStyle } = useHeaderContext();
  
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
  
  // Génération de styles CSS personnalisés
  const navItemStyle = {
    color: headerStyle?.textColor,
    fontFamily: headerStyle?.fontFamily,
    fontSize: headerStyle?.fontSize,
  };
  
  const navItemHoverStyle = {
    color: headerStyle?.hoverColor,
    backgroundColor: headerStyle?.menuHoverBgColor,
  };
  
  const navItemActiveStyle = {
    color: headerStyle?.activeColor,
    backgroundColor: headerStyle?.menuActiveBgColor,
  };
  
  const socialIconStyle = {
    color: headerStyle?.socialIconColor,
    backgroundColor: headerStyle?.socialIconBgColor,
    borderColor: headerStyle?.socialIconBorderColor,
  };
  
  const utilityIconStyle = {
    color: headerStyle?.utilityIconColor,
    backgroundColor: headerStyle?.utilityIconBgColor,
    borderColor: headerStyle?.utilityIconBorderColor,
  };
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      {/* Navigation Links */}
      <nav className="flex items-center space-x-3 overflow-x-auto max-w-[40vw] no-scrollbar">
        {navLinks.map((link) => {
          // Vérifier si ce lien a une icône à afficher
          const IconComponent = link.icon ? iconsMap[link.icon] : null;
          
          return (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "menu-item group py-2 px-3 rounded-md text-sm font-medium transition-all relative whitespace-nowrap",
                isActive(link.href) 
                  ? "text-primary dark:text-primary bg-primary/5 font-semibold" 
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5"
              )}
              style={isActive(link.href) ? { ...navItemStyle, ...navItemActiveStyle } : navItemStyle}
            >
              {IconComponent ? (
                <IconComponent size={18} className="mx-auto" />
              ) : (
                <span>{link.name}</span>
              )}
              <span className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transform transition-all duration-300",
                isActive(link.href) ? "w-8" : "w-0 group-hover:w-8"
              )} 
              style={{
                backgroundColor: isActive(link.href) ? headerStyle?.activeColor : headerStyle?.hoverColor
              }}
              />
            </a>
          );
        })}
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
              className="social-icon hover-scale border border-gray-200 dark:border-gray-700 rounded-full p-2 flex items-center justify-center transition-colors"
              aria-label={link.ariaLabel}
              style={socialIconStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.color = headerStyle?.socialIconHoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = headerStyle?.socialIconColor;
              }}
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
          style={utilityIconStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.color = headerStyle?.utilityIconHoverColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = headerStyle?.utilityIconColor;
          }}
        >
          <Search size={18} />
          <span className="sr-only">Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
