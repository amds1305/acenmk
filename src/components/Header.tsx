
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
    theme,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
    searchOpen,
    setSearchOpen,
    toggleSearch,
    isScrolled,
    navLinks,
    headerStyles,
    showThemeSelector,
    socialLinks,
    actionButtons,
    logoConfig,
    searchConfig,
    userMenuConfig,
    isAuthenticated,
    user
  } = useHeader();

  const fixedHeaderClass = `
    sticky top-0 z-50 w-full transition-all duration-300
    ${isScrolled && headerStyles?.sticky ? 'bg-opacity-80 backdrop-blur-sm shadow-sm' : ''}
    ${headerStyles?.glassmorphism && isScrolled ? 'backdrop-filter backdrop-blur-lg' : ''}
    ${headerStyles?.transparent && !isScrolled ? 'bg-transparent' : 'bg-background'}
    ${headerStyles?.border_bottom ? 'border-b' : ''}
    ${headerStyles?.drop_shadow && isScrolled ? 'shadow-md' : ''}
  `;

  return (
    <header className={fixedHeaderClass} style={{
      backgroundColor: isScrolled ? headerStyles?.scrolled_bg_color : headerStyles?.background_color,
      color: isScrolled ? headerStyles?.scrolled_text_color : headerStyles?.text_color,
      borderColor: isScrolled ? headerStyles?.scrolled_border_color : headerStyles?.border_color,
      boxShadow: isScrolled && headerStyles?.drop_shadow ? headerStyles?.scrolled_shadow : 'none',
      padding: headerStyles?.padding,
    }}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo config={logoConfig} />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav 
          links={navLinks} 
          styles={headerStyles} 
        />

        {/* Right Side Elements */}
        <div className="flex items-center space-x-2">
          {/* Only show search if configured */}
          {searchConfig?.is_enabled && (
            <SearchBar 
              isOpen={searchOpen}
              setIsOpen={setSearchOpen}
              toggleSearch={toggleSearch}
              placeholder={searchConfig?.placeholder || "Rechercher..."}
              expandOnFocus={searchConfig?.expand_on_focus}
              position={searchConfig?.position || "right"}
            />
          )}

          {/* Theme toggle */}
          {showThemeSelector && (
            <div className="hidden md:block">
              <ThemeSelector theme={theme} toggleTheme={toggleTheme} />
            </div>
          )}

          {/* User menu */}
          <UserMenu 
            isAuthenticated={isAuthenticated}
            user={user}
            config={userMenuConfig}
            actionButtons={actionButtons}
          />

          {/* Mobile menu toggle */}
          <MobileNav 
            mobileMenuOpen={mobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu} 
            toggleTheme={toggleTheme}
            toggleSearch={toggleSearch}
            theme={theme}
            showThemeSelector={showThemeSelector}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        links={navLinks} 
        socialLinks={socialLinks} 
        actionButtons={actionButtons}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
};

export default Header;
