
import { useState, useEffect } from 'react';
import { Github, Twitter, Instagram, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { NavLink, SocialLink } from './types';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Liste des liens de navigation
  const navLinks: NavLink[] = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Estimation', href: '/estimation' },
    { name: 'Rendez-vous', href: '/appointments' },
    { name: 'Équipe', href: '/#team' },
    { name: 'Témoignages', href: '/#testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Contact', href: '/#contact' },
  ];

  // Liste des liens sociaux
  const socialLinks: SocialLink[] = [
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter' },
    { icon: Github, href: 'https://github.com', ariaLabel: 'Github' },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram' },
  ];

  // Gestion du défilement pour changer le style du header
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

  // Basculer l'état du menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Fermer la recherche si elle est ouverte
    if (searchOpen) setSearchOpen(false);
  };

  // Basculer l'état de la recherche
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    // Fermer le menu mobile s'il est ouvert
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Fermer le menu mobile
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    closeMobileMenu,
    navLinks,
    socialLinks
  };
};
