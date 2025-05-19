
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Contact information that was moved from the contact form
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      value: 'contact@visiontech.fr',
      href: 'mailto:contact@visiontech.fr',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Adresse',
      value: '123 Avenue de l\'Innovation, 75001 Paris',
      href: 'https://maps.google.com',
    },
  ];
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <a href="#hero" className="text-xl font-bold tracking-tight">
              <span className="text-primary">ace</span> 
              <span className="text-white">nümerik</span>
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
          
          {/* Contact Info - Added from Contact component */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a 
                    href={info.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="bg-white/10 p-1.5 rounded-full">{info.icon}</span>
                    <span>{info.value}</span>
                  </a>
                </li>
              ))}
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
            © {currentYear} acenümerik. Tous droits réservés.
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
