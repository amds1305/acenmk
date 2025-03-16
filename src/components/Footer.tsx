
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <a href="#hero" className="text-xl font-bold tracking-tight">
              <span className="text-primary">VISION</span> 
              <span className="text-white">TECH</span>
            </a>
            <p className="text-gray-400 mt-4 mb-6 max-w-xs">
              Solutions numériques innovantes pour transformer votre entreprise et accélérer votre croissance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary/90 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Développement sur mesure</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Infrastructure cloud</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">UX/UI Design</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Applications mobiles</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Transformation digitale</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Entreprise</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Notre équipe</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Presse</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Légal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} VisionTech. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#hero" 
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/10 text-white text-sm font-medium transition-colors hover:bg-primary/90"
            >
              Retour en haut
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
