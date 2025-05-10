
import { useState, useEffect } from 'react';
import { getHeaderConfig } from '@/services/supabase/headerService';
import { SocialLink } from './types';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerConfig, setHeaderConfig] = useState({
    showThemeSelector: true,
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  
  // Liste complète des liens de navigation
  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Estimation', href: '/estimation' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carrières', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
    { name: 'ACE JOB', href: '/ace-job' },
    { name: 'À propos', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effet pour charger la configuration du header depuis Supabase
  useEffect(() => {
    const loadHeaderConfig = async () => {
      try {
        const { config, socialLinks } = await getHeaderConfig();
        setHeaderConfig(config);
        setSocialLinks(socialLinks);
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration du header:', error);
        
        // Fallback to localStorage if Supabase fails
        const savedConfig = localStorage.getItem('headerConfig');
        if (savedConfig) {
          try {
            setHeaderConfig(JSON.parse(savedConfig));
          } catch (error) {
            console.error('Erreur lors du parsing de la config locale:', error);
          }
        }
        
        const savedLinks = localStorage.getItem('socialLinks');
        if (savedLinks) {
          try {
            setSocialLinks(JSON.parse(savedLinks));
          } catch (error) {
            console.error('Erreur lors du parsing des liens sociaux locaux:', error);
          }
        }
      }
    };
    
    loadHeaderConfig();
    
    // Listen for header config updates
    const handleConfigUpdated = () => {
      loadHeaderConfig();
    };
    
    window.addEventListener('header-config-updated', handleConfigUpdated);
    return () => {
      window.removeEventListener('header-config-updated', handleConfigUpdated);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Filter out invisible social links
  const visibleSocialLinks = socialLinks.filter(link => link.isVisible !== false);
  
  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    navLinks,
    socialLinks: visibleSocialLinks, // Only return visible links
    closeMobileMenu,
    headerConfig
  };
};
