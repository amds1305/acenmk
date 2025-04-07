
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { Button } from '@/components/ui/button';
import { ClientLogo } from '@/types/sections';

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
  showTrustedClients?: boolean;
  trustedClientsTitle?: string;
  trustedClients?: ClientLogo[];
}

// Fonction pour récupérer les données du Hero
const fetchHeroData = async (): Promise<HeroData> => {
  // Utiliser le nouveau service pour récupérer les données
  const config = getHomepageConfig();
  
  if (config.sectionData && config.sectionData.hero) {
    return config.sectionData.hero as HeroData;
  }
  
  // Valeurs par défaut si aucune données n'est stockée
  return {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    showTrustedClients: true,
    trustedClientsTitle: 'Ils nous font confiance',
    trustedClients: [
      {
        id: '1',
        name: 'Client 1',
        logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '2',
        name: 'Client 2',
        logoUrl: 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '3',
        name: 'Client 3',
        logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '4',
        name: 'Client 4',
        logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      }
    ]
  };
};

const Hero = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Effet pour animer les éléments au chargement
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('appeared');
        }, 150 * index);
      });
    };
    
    animateElements();
  }, []);

  return (
    <section id="hero" className="relative py-32 md:py-44 overflow-hidden bg-black text-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-70"></div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h1v1H0zM39 0h1v1h-1z\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Contenu principal */}
          <div className="max-w-3xl animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
            <div className="mb-8">
              <span className="inline-block text-sm font-medium bg-white/10 text-white/90 px-4 py-1.5 rounded-full animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
                Innovation Numérique
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out">
              {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-100">
              {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
            </p>
            
            <div className="flex flex-wrap gap-4 animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-200">
              <Button 
                asChild 
                size="lg"
                className="bg-white hover:bg-white/90 text-black font-medium rounded-full group"
              >
                <a href="#services">
                  {heroData?.ctaText || 'Découvrir nos services'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/30 hover:bg-white/10 text-white rounded-full"
              >
                <a href="#contact">
                  {heroData?.ctaSecondaryText || 'Nous contacter'}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image stylisée */}
          <div className="w-full lg:w-2/5 relative animate-on-scroll opacity-0 translate-y-4 transition duration-1000 ease-out delay-300">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/30 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Digital Transformation" 
                className="w-full h-auto object-cover mix-blend-lighten opacity-80"
              />
            </div>
            
            {/* Éléments de design */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-lg"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
