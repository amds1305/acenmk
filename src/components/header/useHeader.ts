
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerConfig, setHeaderConfig] = useState({
    showThemeSelector: true,
  });
  
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
  
  // Sample social links - in a real app, these would come from a CMS or API
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', ariaLabel: 'Facebook', isVisible: true, order: 0 },
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter', isVisible: true, order: 1 },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram', isVisible: true, order: 2 },
    { icon: Linkedin, href: 'https://linkedin.com', ariaLabel: 'LinkedIn', isVisible: true, order: 3 },
    { icon: Github, href: 'https://github.com', ariaLabel: 'GitHub', isVisible: true, order: 4 }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effet pour charger la configuration du header (à terme depuis une API ou localStorage)
  useEffect(() => {
    // Simuler le chargement de la configuration depuis une source externe
    const loadHeaderConfig = () => {
      // Dans un cas réel, on chargerait depuis une API ou localStorage
      const savedConfig = localStorage.getItem('headerConfig');
      
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          setHeaderConfig(parsedConfig);
        } catch (error) {
          console.error('Erreur lors du chargement de la configuration du header:', error);
        }
      }
    };
    
    loadHeaderConfig();
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
  
  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    navLinks,
    socialLinks,
    closeMobileMenu,
    headerConfig
  };
};
