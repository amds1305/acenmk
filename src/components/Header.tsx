
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import Search from './Search';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileNav from './header/MobileNav';
import MobileMenu from './header/MobileMenu';
import { useHeader } from './header/useHeader';
import ThemeSelector from './header/ThemeSelector';
import UserMenu from './header/UserMenu';

const Header = () => {
  const { isScrolled, mobileMenuOpen, searchOpen, toggleMobileMenu, toggleSearch, navLinks, socialLinks, closeMobileMenu } = useHeader();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-8 px-6 md:px-10', // Double la taille du header avec py-8 au lieu de py-4
        isScrolled ? 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-md' : 'bg-transparent',
        searchOpen && 'h-40' // Ajusté pour la plus grande taille du header
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation and Social Links */}
        <DesktopNav 
          navLinks={navLinks}
          socialLinks={socialLinks}
          toggleSearch={toggleSearch}
          themeSelector={<ThemeSelector />}
        />
        
        {/* User Menu */}
        <div className="hidden md:flex ml-4">
          <UserMenu />
        </div>
        
        {/* Mobile Menu Button */}
        <MobileNav 
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          toggleTheme={toggleTheme}
          toggleSearch={toggleSearch}
          theme={theme}
        />
      </div>
      
      {/* Search */}
      {searchOpen && (
        <div className="max-w-3xl mx-auto mt-6 animate-fade-in"> {/* Ajusté le margin top */}
          <Search />
        </div>
      )}
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        navLinks={navLinks}
        socialLinks={socialLinks}
        onNavLinkClick={closeMobileMenu}
      />
    </header>
  );
};

export default Header;
