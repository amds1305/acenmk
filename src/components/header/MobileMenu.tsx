
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavLink, SocialLink } from './types';
import { ArrowRight } from 'lucide-react';
import { iconsMap } from '@/components/admin/header/iconsMap';
import { useHeaderContext } from '@/contexts/HeaderContext';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  onNavLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navLinks,
  socialLinks,
  onNavLinkClick
}) => {
  const location = useLocation();
  const { headerStyle } = useHeaderContext();
  
  if (!isOpen) return null;

  // Function to check if a link is active
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    
    return location.pathname.startsWith(href);
  };

  // Generate custom CSS styles
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

  // Function to handle click based on link type
  const handleLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      // For hash links on the homepage
      if (location.pathname === '/') {
        // We're already on the homepage, just scroll to the section
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // We need to navigate to the homepage first, then scroll
        // The hash in the URL will cause the browser to scroll to the element
        // after the page loads
        window.location.href = href;
      }
    }
    // Close the mobile menu after clicking
    onNavLinkClick();
  };
  
  return (
    <div className="md:hidden fixed inset-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 animate-fade-in overflow-auto">
      <div className="flex flex-col items-center justify-center h-full space-y-2 p-8">
        {navLinks.map((link, index) => {
          // Check if this link has an icon to display
          const IconComponent = link.icon ? iconsMap[link.icon] : null;
          
          return (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className={cn(
                "text-lg font-medium transition-colors animate-fade-in-up px-4 py-2 rounded-md w-full text-center flex items-center justify-center gap-2",
                isActive(link.href) 
                  ? "text-primary dark:text-primary bg-primary/5 font-semibold" 
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-primary/5",
                `animation-delay-${index * 50}`
              )}
              style={isActive(link.href) ? { ...navItemStyle, ...navItemActiveStyle } : navItemStyle}
            >
              {IconComponent ? <IconComponent size={20} /> : null}
              <span>{link.name}</span>
            </a>
          );
        })}
        
        {/* Social Links in Mobile Menu */}
        <div className="flex space-x-6 mt-6">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              aria-label={link.ariaLabel}
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-gray-200 dark:border-gray-700 rounded-full p-2 flex items-center justify-center"
              style={socialIconStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.color = headerStyle?.socialIconHoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = headerStyle?.socialIconColor;
              }}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
        
        {/* Auth Links in Mobile Menu */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 w-full sm:w-auto">
          <Link 
            to="/login" 
            onClick={onNavLinkClick}
            className="w-full sm:w-auto px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-colors text-center"
          >
            Connexion
          </Link>
          <Link 
            to="/signup" 
            onClick={onNavLinkClick}
            className="w-full sm:w-auto px-6 py-3 bg-primary rounded-md text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
          >
            Inscription
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
