
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { NavLink, SocialLink } from './types';
import { useHeaderContext } from '@/contexts/HeaderContext';

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { headerStyle } = useHeaderContext();
  
  // Default nav links - à améliorer avec une API Supabase
  const navLinks: NavLink[] = [
    { id: '1', name: 'Accueil', href: '/', icon: 'Home', isVisible: true, order: 1, parentId: null },
    { id: '2', name: 'À propos', href: '/a-propos', icon: '', isVisible: true, order: 2, parentId: null },
    { id: '3', name: 'Services', href: '/#services', icon: '', isVisible: true, order: 3, parentId: null },
    { id: '4', name: 'Portfolio', href: '/portfolio', icon: '', isVisible: true, order: 4, parentId: null },
    { id: '5', name: 'Contact', href: '/#contact', icon: '', isVisible: true, order: 5, parentId: null },
  ];
  
  // Default social links
  const socialLinks: SocialLink[] = [
    { href: 'https://facebook.com', icon: Facebook, ariaLabel: 'Notre page Facebook' },
    { href: 'https://twitter.com', icon: Twitter, ariaLabel: 'Notre compte Twitter' },
    { href: 'https://linkedin.com', icon: Linkedin, ariaLabel: 'Notre page LinkedIn' },
    { href: 'https://instagram.com', icon: Instagram, ariaLabel: 'Notre compte Instagram' },
    { href: 'https://github.com', icon: Github, ariaLabel: 'Notre compte GitHub' },
  ];
  
  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle search toggle
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    navLinks,
    socialLinks,
    headerStyle,
    toggleMobileMenu,
    toggleSearch,
    closeMobileMenu,
  };
};

export default useHeader;
