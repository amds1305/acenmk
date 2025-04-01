
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
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  const { isScrolled, mobileMenuOpen, searchOpen, toggleMobileMenu, toggleSearch, navLinks, socialLinks, closeMobileMenu } = useHeader();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled ? 'bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'bg-transparent',
        searchOpen && 'h-32'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Boutons d'action */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="rounded-full h-10">
            Se connecter
          </Button>
          <Button className="rounded-full h-10 gap-1">
            Essai gratuit
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <ThemeSelector />
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
        <div className="max-w-3xl mx-auto mt-4 animate-fade-in">
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
