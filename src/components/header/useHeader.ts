
import { useEffect, useState } from 'react';
import { NavLink, SocialLink } from './types';
import { getHeaderConfig } from '@/services/supabase/headerService';
import { Mail, Twitter, Instagram, Facebook, Linkedin, Github } from 'lucide-react';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [headerConfig, setHeaderConfig] = useState<any>({}); // Type 'any' will be replaced
  const { headerStyle } = useHeaderStyle();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    const fetchHeaderConfig = async () => {
      try {
        const data = await getHeaderConfig();
        setHeaderConfig(data);
        
        // Mise à jour des liens de navigation
        if (data.navLinks && data.navLinks.length > 0) {
          setNavLinks(data.navLinks);
        }
        
        // Mise à jour des liens sociaux
        if (data.socialLinks && data.socialLinks.length > 0) {
          setSocialLinks(data.socialLinks);
        }
      } catch (error) {
        console.error("Failed to fetch header configuration:", error);
      }
    };

    fetchHeaderConfig();

    // Écouter les événements de mise à jour des styles
    const handleHeaderStyleUpdated = () => {
      fetchHeaderConfig();
    };

    window.addEventListener('header-style-updated', handleHeaderStyleUpdated);
    
    return () => {
      window.removeEventListener('header-style-updated', handleHeaderStyleUpdated);
    };
  }, []);

  // Exemple de liens de navigation par défaut avec un pictogramme pour l'accueil
  const defaultNavLinks: NavLink[] = [
    { name: '', href: '/', icon: 'Home' },  // Accueil remplacé par icône Home
    { name: 'Services', href: '/services' },  // Modifié pour pointer vers la page dédiée
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'À propos', href: '/about' },  // Modifié pour utiliser le chemin anglais cohérent avec les routes
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    if (!navLinks || navLinks.length === 0) {
      setNavLinks(defaultNavLinks);
    }
  }, [navLinks]);

  // Default Social Links
  const defaultSocialLinks: SocialLink[] = [
    { icon: Mail, href: 'mailto:contact@example.com', ariaLabel: 'Envoyer un email' },
    { icon: Twitter, href: 'https://twitter.com/example', ariaLabel: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/example', ariaLabel: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/example', ariaLabel: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/example', ariaLabel: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/example', ariaLabel: 'GitHub' },
  ];

  useEffect(() => {
    if (!socialLinks || socialLinks.length === 0) {
      setSocialLinks(defaultSocialLinks);
    }
  }, [socialLinks]);

  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    navLinks,
    socialLinks,
    headerConfig: {
      ...headerConfig,
      showThemeSelector: headerStyle?.showThemeSelector ?? true
    },
    headerStyle,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch
  };
};
