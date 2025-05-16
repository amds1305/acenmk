
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeader } from '@/contexts/HeaderContext';
import Logo from './header/Logo';
import SearchBar from './SearchBar';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, Sun, Moon, Search } from 'lucide-react';

const Header = () => {
  const { headerConfig, headerStyle, isLoading } = useHeader();
  const { theme, setTheme } = useTheme();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle functions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  
  // Default nav links if not loaded from context
  const navLinks = headerConfig?.navLinks || [
    { id: 'home', name: 'Accueil', href: '/', is_visible: true },
    { id: 'services', name: 'Services', href: '/#services', is_visible: true },
    { id: 'about', name: 'À propos', href: '/#about', is_visible: true },
    { id: 'contact', name: 'Contact', href: '/#contact', is_visible: true },
  ];
  
  // Filter visible links and remove Portfolio
  const visibleNavLinks = navLinks
    .filter(link => link.is_visible)
    .filter(link => !link.href.includes('portfolio'));

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">Logo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {visibleNavLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {/* Search button */}
          <button 
            onClick={toggleSearch}
            className={`p-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleTheme}
            className={`p-2 mr-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {visibleNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg mx-4">
            <div className="flex items-center border-b pb-3">
              <Search className="h-5 w-5 mr-3 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 outline-none bg-transparent"
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                Fermer
              </button>
            </div>
            <div className="pt-3">
              <p className="text-sm text-gray-500">Commencez à taper pour rechercher...</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
