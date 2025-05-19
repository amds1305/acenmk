
import React from 'react';
import { ArrowRight } from 'lucide-react';

const NmkKinkHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Lignes décoratives */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gray-300"></div>
        <div className="absolute left-2/4 top-0 h-full w-px bg-gray-300"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-gray-300"></div>
        <div className="absolute left-0 top-1/4 h-px w-full bg-gray-300"></div>
        <div className="absolute left-0 top-2/4 h-px w-full bg-gray-300"></div>
        <div className="absolute left-0 top-3/4 h-px w-full bg-gray-300"></div>
      </div>
      
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-sans text-5xl font-bold leading-tight tracking-tighter md:text-7xl lg:text-8xl">
          <span className="block">Créer des</span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            expériences numériques
          </span>
          <span className="block">exceptionnelles</span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          Nous concevons et développons des sites web et applications de haute qualité 
          qui transforment votre vision en réalité numérique.
        </p>
        
        <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <a href="#services" 
            className="group inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-gray-900 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900">
            Nos services
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </a>
          
          <a href="#contact" 
            className="group inline-flex items-center justify-center rounded-full border-2 border-gray-300 bg-transparent px-8 py-3 text-base font-medium text-gray-700 transition-all duration-300 hover:border-gray-900 hover:bg-transparent hover:text-gray-900">
            Nous contacter
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a href="#services" className="animate-bounce text-gray-400 transition-colors hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkHero;
