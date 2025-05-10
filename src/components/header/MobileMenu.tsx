
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
  
  return (
    <div className="md:hidden fixed inset-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 animate-fade-in overflow-auto">
      <div className="flex flex-col items-center justify-center h-full space-y-2 p-8">
        {navLinks.map((link, index) => {
          // Vérifier si ce lien a une icône à afficher
          const IconComponent = link.icon ? iconsMap[link.icon] : null;
          
          return (
            <a 
              key={link.name}
              href={link.href} 
              onClick={onNavLinkClick}
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
