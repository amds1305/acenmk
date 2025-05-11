
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
import { HeaderProvider } from '@/contexts/HeaderContext';
import { HeaderStyleProvider } from '@/contexts/HeaderStyleContext';

// Configuration par défaut du header - À terme, cela pourrait être chargé depuis une API
const defaultHeaderConfig = {
  showThemeSelector: true,
  // Autres options de configuration possibles
};

const HeaderContent = () => {
  const { 
    isScrolled, 
    mobileMenuOpen, 
    searchOpen, 
    toggleMobileMenu, 
    toggleSearch, 
    navLinks, 
    socialLinks, 
    closeMobileMenu, 
    headerConfig = defaultHeaderConfig, 
    headerStyle 
  } = useHeader();
  const { theme, toggleTheme } = useTheme();
  
  // Appliquer les styles personnalisés au header lors du défilement
  const scrolledHeaderStyle = isScrolled ? {
    backgroundColor: headerStyle?.scrolledBgColor || 'rgba(255, 255, 255, 0.8)',
    color: headerStyle?.scrolledTextColor || '#333333',
    borderColor: headerStyle?.scrolledBorderColor || '#e5e7eb',
    boxShadow: headerStyle?.scrolledShadow || '0 2px 4px rgba(0, 0, 0, 0.05)',
  } : {};
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2',
        isScrolled ? 'header-glass border-b border-gray-200 dark:border-gray-800 backdrop-blur-md' : 'bg-transparent',
        searchOpen && 'h-32'
      )}
      style={{
        transition: `all ${headerStyle?.transitionDuration || '0.3s'} ${headerStyle?.transitionTiming || 'ease'}`,
        ...scrolledHeaderStyle
      }}
    >
      <div className="header-container h-16" style={{ padding: headerStyle?.padding }}>
        <Logo />
        
        {/* Desktop Navigation and Social Links */}
        <DesktopNav 
          navLinks={navLinks}
          socialLinks={socialLinks}
          toggleSearch={toggleSearch}
          themeSelector={<ThemeSelector />}
          showThemeSelector={headerConfig.showThemeSelector}
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
          showThemeSelector={headerConfig.showThemeSelector}
        />
      </div>
      
      {/* Search */}
      {searchOpen && (
        <div className="max-w-3xl mx-auto mt-4 px-4 animate-fade-in">
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

const Header = () => {
  return (
    <HeaderProvider>
      <HeaderStyleProvider>
        <HeaderContent />
      </HeaderStyleProvider>
    </HeaderProvider>
  );
};

export default Header;
