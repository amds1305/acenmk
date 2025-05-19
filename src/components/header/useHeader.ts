
import { useState, useEffect, useCallback } from 'react';
import { useHeader as useHeaderContext } from '@/contexts/HeaderContext';
import { HeaderStyleConfig } from '@/services/supabase/headerService';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Get header data from context
  const headerContext = useHeaderContext();
  const headerConfig = headerContext?.headerConfig;
  const isLoading = headerContext?.isLoading || false;
  
  // Default values for navigation links if not available from context
  const defaultNavLinks = [
    { id: 'home', name: 'Accueil', href: '/', is_visible: true },
    { id: 'services', name: 'Services', href: '/services', is_visible: true },
    { id: 'about', name: 'À propos', href: '/about', is_visible: true },
    { id: 'contact', name: 'Contact', href: '/contact', is_visible: true },
  ];
  
  const navLinks = headerConfig?.navLinks || defaultNavLinks;
  const socialLinks = headerConfig?.socialLinks || [];
  
  // Default header style
  const headerStyle: HeaderStyleConfig = headerConfig?.style || {
    transparent: true,
    sticky: true,
    glassmorphism: true,
    border_bottom: false,
    drop_shadow: true,
    background_color: 'rgba(255, 255, 255, 0)',
    text_color: '#ffffff',
    border_color: 'rgba(255, 255, 255, 0.1)',
    scrolled_bg_color: 'rgba(255, 255, 255, 0.9)',
    scrolled_text_color: '#111827',
    scrolled_border_color: 'rgba(229, 231, 235, 1)',
    scrolled_shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '1rem',
    showThemeSelector: true,
  };
  
  // Handle scroll events to update header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handlers for mobile menu and search
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    if (searchOpen) setSearchOpen(false);
  }, [searchOpen]);
  
  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => !prev);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }, [mobileMenuOpen]);
  
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);
  
  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    setSearchOpen,
    toggleMobileMenu,
    toggleSearch,
    closeMobileMenu,
    navLinks,
    socialLinks,
    headerStyle,
    headerConfig,
    isLoading,
  };
};

export default useHeader;
