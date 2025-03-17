
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'À propos', href: '#about' },
    { name: 'Équipe', href: '#team' },
    { name: 'Contact', href: '#contact' },
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-8 px-6 md:px-10',
        isScrolled ? 'bg-white shadow-soft' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold tracking-tight font-display">
          <span className="text-theme-navy">VISION</span> 
          <span className="text-theme-pink">TECH</span>
        </a>
        
        {/* Desktop Navigation and Social Links */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-sm font-medium text-theme-navy hover:text-[#753749] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#753749] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                aria-label={link.ariaLabel}
                className="text-theme-navy hover:text-theme-blue transition-colors border border-current rounded-full p-1.5 flex items-center justify-center"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
          
          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-sm font-medium text-theme-navy hover:text-[#753749]">
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="text-sm font-medium bg-theme-navy hover:bg-[#753749]">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} className="text-theme-navy" /> : <Menu size={24} className="text-theme-navy" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-lg z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {navLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium text-theme-navy hover:text-[#753749] animate-fade-in-up",
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
                  className="text-theme-navy hover:text-[#753749] transition-colors border border-current rounded-full p-2 flex items-center justify-center"
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
                className="px-6 py-2 border border-theme-blue rounded-full text-theme-navy hover:bg-[#753749] hover:text-white hover:border-[#753749] transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 bg-theme-navy rounded-full text-white hover:bg-[#753749] transition-colors"
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
