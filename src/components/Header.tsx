
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeader } from './header/useHeader';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileNav from './header/MobileNav';
import MobileMenu from './header/MobileMenu';
import UserMenu from './header/UserMenu';
import ThemeSelector from './header/ThemeSelector';
import SearchBar from './SearchBar';

const Header = () => {
  const {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    closeMobileMenu,
    navLinks,
    socialLinks,
    headerStyle,
    headerConfig
  } = useHeader();

  // Obtenir les valeurs du contexte d'authentification
  // Normalement, cela viendrait de useAuth mais pour simplifier, on utilise des valeurs fictives
  const isAuthenticated = true;
  const user = {
    name: 'User Test',
    email: 'user@example.com',
    role: 'admin'
  };

  const fixedHeaderClass = `
    sticky top-0 z-50 w-full transition-all duration-300
    ${isScrolled && headerStyle?.sticky ? 'bg-opacity-80 backdrop-blur-sm shadow-sm' : ''}
    ${headerStyle?.glassmorphism && isScrolled ? 'backdrop-filter backdrop-blur-lg' : ''}
    ${headerStyle?.transparent && !isScrolled ? 'bg-transparent' : 'bg-background'}
    ${headerStyle?.border_bottom ? 'border-b' : ''}
    ${headerStyle?.drop_shadow && isScrolled ? 'shadow-md' : ''}
  `;

  return (
    <header className={fixedHeaderClass} style={{
      backgroundColor: isScrolled ? headerStyle?.scrolled_bg_color : headerStyle?.background_color,
      color: isScrolled ? headerStyle?.scrolled_text_color : headerStyle?.text_color,
      borderColor: isScrolled ? headerStyle?.scrolled_border_color : headerStyle?.border_color,
      boxShadow: isScrolled && headerStyle?.drop_shadow ? headerStyle?.scrolled_shadow : 'none',
      padding: headerStyle?.padding,
    }}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo config={headerConfig?.logoConfig} />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav 
          navLinks={navLinks}
          socialLinks={socialLinks}
          toggleSearch={toggleSearch}
          themeSelector={<ThemeSelector />}
          showThemeSelector={headerConfig?.showThemeSelector}
        />

        {/* Right Side Elements */}
        <div className="flex items-center space-x-2">
          {/* Only show search if configured */}
          {headerConfig?.searchConfig?.is_enabled && (
            <SearchBar 
              isOpen={searchOpen}
              setIsOpen={setSearchOpen}
              toggleSearch={toggleSearch}
              placeholder={headerConfig?.searchConfig?.placeholder || "Rechercher..."}
              expandOnFocus={headerConfig?.searchConfig?.expand_on_focus}
              position={headerConfig?.searchConfig?.position || "right"}
            />
          )}

          {/* Theme toggle */}
          {headerConfig?.showThemeSelector && (
            <div className="hidden md:block">
              <ThemeSelector />
            </div>
          )}

          {/* User menu */}
          <UserMenu 
            isAuthenticated={isAuthenticated}
            user={user}
            config={headerConfig?.userMenuConfig}
            actionButtons={headerConfig?.actionButtons}
          />

          {/* Mobile menu toggle */}
          <MobileNav 
            mobileMenuOpen={mobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu} 
            toggleSearch={toggleSearch}
            showThemeSelector={headerConfig?.showThemeSelector}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        links={navLinks} 
        socialLinks={socialLinks} 
        actionButtons={headerConfig?.actionButtons}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
};

export default Header;
