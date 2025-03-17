
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Moon, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBar from './SearchBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
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
  
  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'À propos', href: '/#about' },
    { name: 'Équipe', href: '/#team' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/#contact' },
  ];
  
  const socialLinks = [
    { icon: Facebook, href: '#', ariaLabel: 'Facebook' },
    { icon: Twitter, href: '#', ariaLabel: 'Twitter' },
    { icon: Instagram, href: '#', ariaLabel: 'Instagram' },
    { icon: Linkedin, href: '#', ariaLabel: 'LinkedIn' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-soft' : 'bg-transparent',
        searchOpen && 'h-32'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold tracking-tight font-display">
          <span className="font-bold text-theme-navy dark:text-white">Ace</span>
          <span className="font-normal text-theme-navy dark:text-white">nümerik</span>
        </a>
        
        {/* Desktop Navigation and Social Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <nav className="flex space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-sm font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ca3c66] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Search button */}
          <button
            onClick={toggleSearch}
            className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                aria-label={link.ariaLabel}
                className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
          
          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-sm font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66]">
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="text-sm font-medium bg-theme-navy dark:bg-[#ca3c66] hover:bg-[#ca3c66]">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={toggleSearch}
            className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <button 
            className="flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? 
              <X size={24} className="text-theme-navy dark:text-white" /> : 
              <Menu size={24} className="text-theme-navy dark:text-white" />
            }
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      {searchOpen && (
        <div className="max-w-3xl mx-auto mt-4 animate-fade-in">
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {navLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] animate-fade-in-up",
                  `animation-delay-${index * 100}`
                )}
              >
                {link.name}
              </a>
            ))}
            
            {/* Social Links in Mobile Menu */}
            <div className="flex space-x-6 mt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="text-theme-navy dark:text-white hover:text-[#ca3c66] dark:hover:text-[#ca3c66] transition-colors border border-current rounded-full p-2 flex items-center justify-center"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            
            {/* Auth Links in Mobile Menu */}
            <div className="flex space-x-4 mt-2">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 border border-theme-blue rounded-full text-theme-navy dark:text-white hover:bg-[#ca3c66] hover:text-white hover:border-[#ca3c66] transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 bg-theme-navy dark:bg-[#ca3c66] rounded-full text-white hover:bg-[#ca3c66] transition-colors"
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
