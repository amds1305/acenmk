
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { NavLink, SocialLink } from './types';
import ThemeSelector from './ThemeSelector';

interface DesktopNavProps {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  toggleSearch: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navLinks,
  socialLinks,
  toggleSearch
}) => {
  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
      <nav className="flex space-x-4 lg:space-x-8">
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className="text-sm font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ca3c66] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>
      
      {/* Theme Selector */}
      <ThemeSelector />
      
      {/* Search button */}
      <button
        onClick={toggleSearch}
        className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
      
      {/* Social Links */}
      <div className="flex items-center space-x-4">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href}
            aria-label={link.ariaLabel}
            className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
          >
            <link.icon size={18} />
          </a>
        ))}
      </div>
      
      {/* Auth Links */}
      <div className="flex items-center space-x-3">
        <Link to="/login">
          <Button variant="ghost" className="text-sm font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66]">
            Connexion
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="default" className="text-sm font-medium bg-theme-navy dark:bg-[#ca3c66] hover:bg-[#ca3c66]">
            Inscription
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
