
import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

// Types
import { NavLink, SocialLink } from './types';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Navigation links
  const navLinks: NavLink[] = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Estimer un projet', href: '/estimate' },
    { name: 'À propos', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Carrières', href: '/careers' },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    { 
      icon: Twitter, 
      href: 'https://twitter.com', 
      ariaLabel: 'Twitter/X'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com', 
      ariaLabel: 'LinkedIn'
    },
    { 
      icon: Github, 
      href: 'https://github.com', 
      ariaLabel: 'GitHub'
    },
  ];

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  // Toggle search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Close mobile menu (for when a link is clicked)
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
  };
};
