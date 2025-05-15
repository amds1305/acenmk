
import { useState, useEffect } from 'react';
import { NavLink, SocialLink } from './types';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { HeaderStyle } from '@/components/admin/header/types';
import { useHeaderContext } from '@/contexts/HeaderContext';

export const useHeader = () => {
  const { headerStyle } = useHeaderContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [headerConfig, setHeaderConfig] = useState({
    showThemeSelector: true,
    showMobileMenu: true,
    showSearch: true,
    logoPosition: 'left',
  });

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu mobile lorsqu'on clique sur un lien
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close search when opening mobile menu
    if (!mobileMenuOpen) setSearchOpen(false);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    // Close mobile menu when opening search
    if (!searchOpen) setMobileMenuOpen(false);
  };

  // Load navigation links from localStorage or default values
  useEffect(() => {
    try {
      // Try to get header nav links from localStorage
      const storedNavLinks = localStorage.getItem('headerNavLinks');
      if (storedNavLinks) {
        setNavLinks(JSON.parse(storedNavLinks));
      } else {
        // Default nav links if none in localStorage
        const defaultLinks: NavLink[] = [
          { id: '1', name: 'Accueil', href: '/', isVisible: true, requiresAuth: false, isExternal: false, order: 0 },
          { id: '2', name: 'Services', href: '/services', isVisible: true, requiresAuth: false, isExternal: false, order: 1 },
          { id: '3', name: 'À propos', href: '/about', isVisible: true, requiresAuth: false, isExternal: false, order: 2 },
          { id: '4', name: 'Contact', href: '/contact', isVisible: true, requiresAuth: false, isExternal: false, order: 3 },
          { id: '5', name: 'AceJob', href: '/ace-job', isVisible: true, requiresAuth: false, isExternal: false, order: 4 },
        ];
        setNavLinks(defaultLinks);
        localStorage.setItem('headerNavLinks', JSON.stringify(defaultLinks));
      }

      // Try to get header social links from localStorage
      const storedSocialLinks = localStorage.getItem('headerSocialLinks');
      if (storedSocialLinks) {
        setSocialLinks(JSON.parse(storedSocialLinks));
      } else {
        // Default social links if none in localStorage
        const defaultSocial = [
          { id: '1', icon: Facebook, href: 'https://facebook.com', ariaLabel: 'Facebook', isVisible: true },
          { id: '2', icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter', isVisible: true },
          { id: '3', icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram', isVisible: true },
          { id: '4', icon: Linkedin, href: 'https://linkedin.com', ariaLabel: 'LinkedIn', isVisible: true },
        ];
        setSocialLinks(defaultSocial);
        localStorage.setItem('headerSocialLinks', JSON.stringify(defaultSocial));
      }

      // Try to get header config from localStorage
      const storedConfig = localStorage.getItem('headerConfig');
      if (storedConfig) {
        setHeaderConfig(JSON.parse(storedConfig));
      }

    } catch (error) {
      console.error('Error loading header data:', error);
      // Use default values on error
    }
    
    // Listen for updates from admin panel
    const handleHeaderUpdate = () => {
      try {
        const updatedNavLinks = localStorage.getItem('headerNavLinks');
        if (updatedNavLinks) {
          setNavLinks(JSON.parse(updatedNavLinks));
        }
        
        const updatedSocialLinks = localStorage.getItem('headerSocialLinks');
        if (updatedSocialLinks) {
          setSocialLinks(JSON.parse(updatedSocialLinks));
        }
        
        const updatedConfig = localStorage.getItem('headerConfig');
        if (updatedConfig) {
          setHeaderConfig(JSON.parse(updatedConfig));
        }
      } catch (error) {
        console.error('Error updating header data:', error);
      }
    };

    window.addEventListener('admin-changes-saved', handleHeaderUpdate);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleHeaderUpdate);
    };
  }, []);

  return {
    isScrolled,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    toggleSearch,
    navLinks: navLinks.filter(link => link.isVisible).sort((a, b) => a.order - b.order),
    socialLinks: socialLinks.filter(link => link.isVisible),
    closeMobileMenu,
    headerConfig,
    headerStyle
  };
};
