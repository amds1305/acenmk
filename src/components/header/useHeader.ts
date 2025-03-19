
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { NavLink, SocialLink } from './types';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  const navLinks: NavLink[] = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'À propos', href: '/#about' },
    { name: 'Équipe', href: '/#team' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Contact', href: '/#contact' },
  ];
  
  const socialLinks: SocialLink[] = [
    { icon: Facebook, href: '#', ariaLabel: 'Facebook' },
    { icon: Twitter, href: '#', ariaLabel: 'Twitter' },
    { icon: Instagram, href: '#', ariaLabel: 'Instagram' },
    { icon: Linkedin, href: '#', ariaLabel: 'LinkedIn' },
  ];
  
  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    navLinks,
    socialLinks,
    closeMobileMenu: () => setMobileMenuOpen(false),
    closeSearch: () => setSearchOpen(false),
  };
};
