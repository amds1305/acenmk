import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
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
    { icon: Facebook, href: 'https://facebook.com', ariaLabel: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', ariaLabel: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', ariaLabel: 'GitHub' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    closeMobileMenu
  };
};
