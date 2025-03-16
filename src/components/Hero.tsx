
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-bg">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                Entreprise de Services du Numérique
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display">
                Solutions numériques <span className="text-primary">innovantes</span> pour votre entreprise
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#services" 
                className={cn(
                  "group inline-flex items-center justify-center h-12 px-6 rounded-full",
                  "bg-primary text-white font-medium transition-all duration-300",
                  "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                )}
              >
                Découvrir nos services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-gray-300 bg-white text-gray-800 font-medium transition-colors hover:bg-gray-50"
              >
                Nous contacter
              </a>
            </div>
            
            <div className="flex items-center space-x-6 pt-6">
              <p className="text-sm font-medium text-gray-500">Ils nous font confiance :</p>
              <div className="flex space-x-6">
                {/* Client logos */}
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
                <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-panel p-5 md:p-8 animate-blur-in animated-border animate-float">
              <div className="aspect-video rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 font-display">Explorez notre univers digital</h3>
                    <p className="mt-2 text-gray-600">
                      Découvrez comment nos solutions transforment les entreprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-secondary rounded-xl animate-slide-in-right animation-delay-200"></div>
            <div className="absolute -top-6 -left-6 h-16 w-16 border border-primary/20 rounded-lg animate-slide-in-right animation-delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
