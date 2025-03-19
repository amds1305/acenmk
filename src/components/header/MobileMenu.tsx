
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavLink, SocialLink } from './types';

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
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 animate-fade-in">
      <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
        {navLinks.map((link, index) => (
          <a 
            key={link.name}
            href={link.href} 
            onClick={onNavLinkClick}
            className={cn(
              "text-xl font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] animate-fade-in-up",
              `animation-delay-${index * 100}`
            )}
          >
            {link.name}
          </a>
        ))}
        
        {/* Social Links in Mobile Menu */}
        <div className="flex space-x-6 mt-6">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              aria-label={link.ariaLabel}
              className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-2 flex items-center justify-center"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
        
        {/* Auth Links in Mobile Menu */}
        <div className="flex space-x-4 mt-2">
          <Link 
            to="/login" 
            onClick={onNavLinkClick}
            className="px-6 py-2 border border-theme-blue rounded-full text-theme-navy dark:text-white hover:bg-[#ca3c66] hover:text-white hover:border-[#ca3c66] transition-colors"
          >
            Connexion
          </Link>
          <Link 
            to="/signup" 
            onClick={onNavLinkClick}
            className="px-6 py-2 bg-theme-navy dark:bg-[#ca3c66] rounded-full text-white hover:bg-[#ca3c66] transition-colors"
          >
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
