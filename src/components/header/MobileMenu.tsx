
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavLink, SocialLink } from './types';
import { iconsMap } from '@/components/admin/header/iconsMap';
import { useHeaderContext } from '@/contexts/HeaderContext';

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  socialLinks: SocialLink[];
  actionButtons?: any[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  links,
  socialLinks,
  actionButtons = []
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

  // Filtrer les liens pour supprimer portfolio et admin
  const filteredLinks = links.filter(link => 
    !link.href.includes('portfolio') && 
    !link.href.includes('admin') &&
    !link.href.includes('profile')
  );

  return (
    <div className="md:hidden fixed inset-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 animate-fade-in overflow-auto">
      <div className="flex flex-col items-center justify-center h-full space-y-2 p-8">
        {filteredLinks.map((link, index) => {
          // Vérifier si ce lien a une icône à afficher
          const IconComponent = link.icon ? iconsMap[link.icon] : null;
          
          return (
            <Link 
              key={link.href}
              to={link.href}
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
            </Link>
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
      </div>
    </div>
  );
};

export default MobileMenu;
