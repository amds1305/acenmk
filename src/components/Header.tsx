
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

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
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-soft' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold tracking-tight font-display">
          <span className="text-primary">VISION</span> 
          <span className="text-black">TECH</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        {/* Contact Button */}
        <a 
          href="#contact"
          className="hidden md:inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20"
        >
          Contactez-nous
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-lg z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {navLinks.map((link, index) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium text-gray-800 hover:text-primary animate-fade-in-up",
                  `animation-delay-${index * 100}`
                )}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-medium transition-colors hover:bg-primary/90 animate-fade-in-up animation-delay-500"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
