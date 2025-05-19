import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Function to check if a link is active
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    
    // Update this to match exact paths instead of hash fragments
    return location.pathname === href;
  };
  
  // Filter links to remove admin-related sections
  const filteredNavLinks = navLinks.filter(link => 
    !link.href.includes('portfolio') && 
    !link.href.includes('admin') &&
    !link.href.includes('profile')
  );
  
  // CSS style generation
  const navItemStyle = {
    color: headerStyle?.textColor,
    fontFamily: headerStyle?.fontFamily,
    fontSize: headerStyle?.fontSize,
    fontWeight: headerStyle?.fontWeight,
    letterSpacing: headerStyle?.letterSpacing,
    textTransform: headerStyle?.textTransform as any,
    transition: `color ${headerStyle?.transitionDuration || '0.3s'} ${headerStyle?.transitionTiming || 'ease'}`,
  };
  
  const navItemHoverStyle = {
    color: headerStyle?.hoverColor,
    backgroundColor: headerStyle?.menuHoverBgColor,
  };
  
  const navItemActiveStyle = {
    color: headerStyle?.activeColor,
    backgroundColor: headerStyle?.menuActiveBgColor,
    fontWeight: headerStyle?.fontWeight,
    borderRadius: headerStyle?.menuBorderRadius,
  };
  
  const socialIconStyle = {
    color: headerStyle?.socialIconColor,
    backgroundColor: headerStyle?.socialIconBgColor,
    borderColor: headerStyle?.socialIconBorderColor,
    fontSize: headerStyle?.socialIconSize,
    marginRight: headerStyle?.socialIconSpacing,
    transition: `color ${headerStyle?.transitionDuration || '0.3s'} ${headerStyle?.transitionTiming || 'ease'}`,
  };
  
  const utilityIconStyle = {
    color: headerStyle?.utilityIconColor,
    backgroundColor: headerStyle?.utilityIconBgColor,
    borderColor: headerStyle?.utilityIconBorderColor,
    fontSize: headerStyle?.utilityIconSize,
    transition: `color ${headerStyle?.transitionDuration || '0.3s'} ${headerStyle?.transitionTiming || 'ease'}`,
  };

  // Handler for navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Navigate to full paths directly
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('http')) {
      window.open(href, '_blank');
    }
  };
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      {/* Navigation Links */}
      <nav className="flex items-center space-x-3 overflow-x-auto max-w-[40vw] no-scrollbar">
        {filteredNavLinks.map((link) => {
          // Check if this link has an icon
          const IconComponent = link.icon ? iconsMap[link.icon] : null;
          
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
              className={cn(
                "menu-item group py-2 px-3 rounded-md text-sm font-medium transition-all relative whitespace-nowrap",
                isActive(link.href) 
                  ? "text-primary dark:text-primary bg-primary/5 font-semibold" 
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5"
              )}
              style={{
                ...navItemStyle,
                ...(isActive(link.href) ? navItemActiveStyle : {}),
                transition: headerStyle?.menuTransition || 'all 0.3s ease',
                borderRadius: headerStyle?.menuBorderRadius || '0.375rem',
              }}
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
                backgroundColor: isActive(link.href) ? headerStyle?.activeColor : headerStyle?.hoverColor,
                transition: `width ${headerStyle?.transitionDuration || '0.3s'} ${headerStyle?.transitionTiming || 'ease'}`,
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
              <link.icon size={parseInt(headerStyle?.socialIconSize || '18px')} />
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
          <Search size={parseInt(headerStyle?.utilityIconSize || '18px')} />
          <span className="sr-only">Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
